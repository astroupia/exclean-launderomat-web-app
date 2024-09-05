import { testUserFunctions } from "@/lib/actions/user.action";

export async function GET() {
  try {
    const result = await testUserFunctions();
    return new Response(JSON.stringify({ message: result }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error in test-user API route:", error);
    return new Response(
      JSON.stringify({
        error: "Test failed",
        details: error instanceof Error ? error.message : String(error),
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
