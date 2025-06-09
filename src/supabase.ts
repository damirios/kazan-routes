import { createClient } from "@supabase/supabase-js";

const URL = "https://hhtuayihsuptczoppxmo.supabase.co";
const API_KEY = process.env.REACT_APP_SUPABASE_API_KEY ?? "";

export const supabaseClient = createClient(URL, API_KEY);
