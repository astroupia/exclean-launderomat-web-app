import { Webhook } from "svix";
import { NextRequest, NextResponse } from "next/server";
import { WebhookEvent, clerkClient } from "@clerk/nextjs/server";
import { createUser, updateUser } from "@/app/api/user/route";

export async function POST(req: NextRequest) {
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    return new NextResponse("WEBHOOK_SECRET is missing", { status: 500 });
  }

  // Extract headers
  const headers = req.headers;
  const svixId = headers.get("svix-id");
  const svixTimestamp = headers.get("svix-timestamp");
  const svixSignature = headers.get("svix-signature");

  if (!svixId || !svixTimestamp || !svixSignature) {
    return new NextResponse("Missing svix headers", { status: 400 });
  }

  let payload;
  try {
    payload = await req.json();
  } catch (err) {
    console.error("Error parsing JSON body:", err);
    return new NextResponse("Error parsing request body", { status: 400 });
  }

  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent;
  try {
    evt = wh.verify(JSON.stringify(payload), {
      "svix-id": svixId,
      "svix-timestamp": svixTimestamp,
      "svix-signature": svixSignature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new NextResponse("Invalid webhook signature", { status: 400 });
  }

  const { type } = evt;
  switch (type) {
    case "user.created": {
      const data = evt.data as {
        id: string;
        email_addresses: { email_address: string }[];
        first_name?: string;
        last_name?: string;
      };

      const user = {
        clerkId: data.id,
        email: data.email_addresses[0].email_address,
        firstName: data.first_name || "",
        role: "customer",
        lastName: data.last_name || "",
      };

      try {
        const newUser = await createUser(user);

        if (newUser) {
          await clerkClient.users.updateUserMetadata(data.id, {
            publicMetadata: {
              userId: newUser._id,
            },
          });
        }
        return NextResponse.json({ message: "User created", user: newUser });
      } catch (err) {
        console.error("Error creating user:", err);
        return new NextResponse(`Error creating user: ${err.message}`, {
          status: 500,
        });
      }
    }

    case "user.updated": {
      const data = evt.data as {
        id: string;
        first_name?: string;
        last_name?: string;
      };

      const user = {
        firstName: data.first_name || "",
        lastName: data.last_name || "",
      };

      try {
        const updatedUser = await updateUser(data.id, user);
        return NextResponse.json({
          message: "User updated",
          user: updatedUser,
        });
      } catch (err) {
        console.error("Error updating user:", err);
        return new NextResponse(`Error updating user: ${err.message}`, {
          status: 500,
        });
      }
    }

    default:
      return new NextResponse("Unhandled event type", { status: 400 });
  }
}
