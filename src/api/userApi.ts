import { supabaseClient } from "./supabase-client";

export async function getUsername(id?: string) {
    const { data: user, error } = await supabaseClient
    .from('user')
    .select('username')
    .eq('id', id);

    if (error) throw error;
    return user[0].username;
}
