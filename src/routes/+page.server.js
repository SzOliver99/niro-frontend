import { completeFirstLogin, signIn } from '$lib/scripts/apis/user';
import { Notification } from '$lib/stores/notifications';
import { redirect } from '@sveltejs/kit';

export const actions = {
	"sign-in": async ({ cookies, request, fetch }) => {
		const form_data = await request.formData();
		const username = form_data.get('username')?.toString();
		const password = form_data.get('password')?.toString();

		const response = await signIn(fetch, username, password);
		const data = await response.json();

		if (data.UserToken) {
			cookies.set('token', data.UserToken, {
				path: '/',
				httpOnly: true,
				sameSite: 'lax',
				secure: true,
				maxAge: 60 * 60
			});

		} else if (data.FirstLoginToken) {
			cookies.set('firstLoginToken', data.FirstLoginToken, {
				path: '/',
				httpOnly: true,
				sameSite: 'lax',
				secure: true,
				maxAge: 60 * 2
			});
		}
	},
	"first-login": async ({ cookies, request, fetch }) => {
		const form_data = await request.formData();
		const password = form_data.get('password')?.toString();
		const password_confirm = form_data.get('password_confirm')?.toString();

		if (password !== password_confirm) return { error: "A két jelszó nem eggyezik" }

		const response = await completeFirstLogin(fetch, password, cookies.get("firstLoginToken"))
		const token = await response.json();

		cookies.set('firstLoginToken', '', { path: '/', expires: new Date(0) });
		cookies.set('token', token, {
			path: '/',
			httpOnly: true,
			sameSite: 'lax',
			secure: true,
			maxAge: 60 * 60
		});
	}
};

export const prerender = false;