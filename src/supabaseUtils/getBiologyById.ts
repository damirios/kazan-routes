import { supabaseClient } from "../supabase";
import { IBiology, INullable } from "../types";

export const getBiologyById = async (
  id: number
): Promise<INullable<IBiology>> => {
  try {
    const { data, error } = await supabaseClient
      .from("biology")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      return null;
    }

    return data;
  } catch (error) {
    console.error((error as Error).message);
    return null;
  }
};
