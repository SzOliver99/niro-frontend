import userApi from '$lib/scripts/apis/user';
import { Notification } from '$lib/stores/notifications';
import { fail, redirect } from '@sveltejs/kit';

export const actions = {
	"sign-in": async ({ cookies, request, fetch }) => {
		const form_data = await request.formData();
		const username = form_data.get('username')?.toString();
		const password = form_data.get('password')?.toString();

		const data = await userApi({ baseFetch: fetch }).signIn(username, password);

		if (data.UserToken) {
			cookies.set('token', data.UserToken, { path: '/', httpOnly: true, secure: true, maxAge: 60 * 60 * 3 });
			return { success: true };
		} else {
			return fail(401, { error: 'Hibás felhasználónév vagy jelszó' });
		}
	}
};

export const prerender = false;