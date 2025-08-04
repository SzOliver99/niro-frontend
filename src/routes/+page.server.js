import { fetchFinishFirstLogin, fetchSignIn } from '$lib/scripts/apis/user';
import { redirect } from '@sveltejs/kit';
import axios from 'axios';

export const actions = {
	"sign-in": async ({ cookies, request }) => {
		const form_data = await request.formData();
		const username = form_data.get('username')?.toString();
		const password = form_data.get('password')?.toString();

		try {
			const response = await fetchSignIn(username, password);
			const data = response.data;

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
		} catch (err) {
			if (err instanceof redirect || err?.status === 303) throw err;

			if (axios.isAxiosError(err)) {
				return { error: err.response?.data?.message ?? 'Login failed' };
			}

			console.error('Unexpected error:', err);
			return { error: 'Internal server error' };
		}
	},
	"first-login": async ({ cookies, request }) => {
		const form_data = await request.formData();
		const password = form_data.get('password')?.toString();
		const password_confirm = form_data.get('password_confirm')?.toString();

		if (password !== password_confirm) return { error: "A két jelszó nem eggyezik" }

		const response = await fetchFinishFirstLogin(password, cookies.get("firstLoginToken"))
		const token = response.data;

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
