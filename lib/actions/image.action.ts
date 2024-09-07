import { generateReactHelpers } from "@uploadthing/react/hooks";
import type { OurFileRouter } from "@/app/api/uploadthing/core";

const { uploadFiles } = generateReactHelpers<OurFileRouter>();

export async function uploadImage(file: File): Promise<string> {
  try {
    const [res] = await uploadFiles(
      "imageUploader", // Endpoint
      { files: [file] } // Options object containing the files array
    );

    if (res && typeof res.url === "string") {
      return res.url;
    } else {
      throw new Error("Failed to upload image: Invalid response");
    }
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
}
