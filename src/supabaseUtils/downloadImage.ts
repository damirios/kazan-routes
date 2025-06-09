import { supabaseClient } from "../supabase";
import { INullable } from "../types";

export const downloadImage = async (
  imageId: string
): Promise<INullable<string>> => {
  try {
    const { data } = await supabaseClient.storage
      .from("kazan-routes-images")
      .getPublicUrl(imageId); // or createSignedUrl for private
    return data.publicUrl;
  } catch (error) {
    console.error(error);
    return null;
  }
};
