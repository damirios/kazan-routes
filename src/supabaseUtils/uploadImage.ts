import { supabaseClient } from "../supabase";

type Params = {
  fileName: string;
  image: File;
};

export const uploadImage = async ({ fileName, image }: Params) => {
  try {
    console.log("image: ", image);
    console.log("fileName: ", fileName);
    const { data, error } = await supabaseClient.storage
      .from("kazan-routes-images")
      .upload(fileName, image);

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};
