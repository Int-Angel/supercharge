import { supabaseClient } from "./supabase-client";

const HOST = process.env.REACT_APP_HOST;
const REDIRECT_TO = HOST + '/';

console.log("HOST: " + HOST);

export async function signInWithGoogle() {
    let redirectTo = REDIRECT_TO;
    redirectTo = redirectTo.replace(/(\r\n|\n|\r)/gm, "");
    const { data, error } = await supabaseClient.auth.signInWithOAuth({
        provider: 'google',
        options: {
            redirectTo: redirectTo,
        }
    });
    if (error) throw error;
}

export async function signInWithEmailAndPassword(email: string, password: string) {
    const { data, error } = await supabaseClient.auth.signInWithPassword({
      email: email,
      password: password,
    })
    if (error) throw error;
}

export async function signUpWithEmailAndPassword(email: string, password: string, username: string) {
    let redirectTo = REDIRECT_TO;
    redirectTo = redirectTo.replace(/(\r\n|\n|\r)/gm, "");
    const { data, error } = await supabaseClient.auth.signUp({
        email: email,
        password: password,
        options: {
            emailRedirectTo: redirectTo,
            data: {
                full_name: username
            }
        }
    });
    if (error) throw error;
}

export async function signOut() {
    const { error } = await supabaseClient.auth.signOut()
    if (error) throw error;
}
