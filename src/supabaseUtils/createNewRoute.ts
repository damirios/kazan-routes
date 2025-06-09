import { supabaseClient } from "../supabase";

type Params = {
  biology_id: string;
  description: string;
  image: string;
  lat: number;
  lon: number;
};

export const createNewRoute = async ({
  biology_id,
  description,
  image,
  lat,
  lon,
}: Params) => {
  try {
    const { data, error } = await supabaseClient
      .from("routes")
      .insert([{ biology_id, description, image, lat, lon }]);
  } catch (error) {
    console.error(error);
  }
};
