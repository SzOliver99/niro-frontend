import { fetchSignIn } from "$lib/scripts/apis/user";
import { redirect } from "@sveltejs/kit";
import axios from "axios";

export const actions = {
    default: async ({ cookies, request }) => {
        const form_data = await request.formData();
        const username = form_data.get("username")?.toString();
        const password = form_data.get("password")?.toString();

        if (!username || !password) {
            return { error: "Missing credentials" };
        }

        try {
            const response = await fetchSignIn(username, password);
            const data = response.data;

            if (!data) {
                return { error: "No token received" };
            }

            cookies.set("token", data, {
                path: "/",
                httpOnly: true,
                sameSite: "lax",
                secure: true,
                maxAge: 60 * 60,
            });

            throw redirect(303, "/profile");

        } catch (err) {
            if (err instanceof redirect || err?.status === 303) throw err;

            if (axios.isAxiosError(err)) {
                return { error: err.response?.data?.message ?? "Login failed" };
            }

            console.error("Unexpected error:", err);
            return { error: "Internal server error" };
        }
    }
};