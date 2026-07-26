import { supabase } from "../lib/supabase";

export async function testConnection() {
    const { data, error } = await supabase
        .from("inventory_items")
        .select("*")
        .limit(1);

    return { data, error };
}