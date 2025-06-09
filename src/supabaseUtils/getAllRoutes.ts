import { supabaseClient } from "../supabase";
import { INullable, IRoute } from "../types";

type ReturnType = {
  data: IRoute[];
  error: INullable<string>;
};

export const getAllRoutes = async (): Promise<ReturnType> => {
  try {
    return <ReturnType>await supabaseClient.from("routes").select("*");
  } catch (error) {
    console.error(error);
    return { data: [], error: error as string };
  }
};
