import { redirect } from "@sveltejs/kit"

export async function load({ cookies, url }) {
    const token = cookies.get("token")
    if (url.pathname !== "/" && !token) {
        throw redirect(308, "/")
    }


    return { token }
}