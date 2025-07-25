import { goto } from "$app/navigation";

export async function checkUserToken(token) {
    if (!token) {
        goto('/profile/sign-in');
        return;
    }

    goto('/profile');
    return false;
}