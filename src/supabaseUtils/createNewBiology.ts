import { supabaseClient } from "../supabase";

type Params = {
  image: string;
  text: string;
};

export const createNewBiology = async ({ image, text }: Params) => {
  try {
    const { data } = await supabaseClient
      .from("biology")
      .insert([{ text, image }])
      .select();

    if (data === null) {
      return null;
    }

    return data[0].id;
  } catch (error) {
    console.error(error);
    return null;
  }
};
