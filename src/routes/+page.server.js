import userApi from '$lib/scripts/apis/user';
import { Notification } from '$lib/stores/notifications';

export const actions = {
	"sign-in": async ({ cookies, request, fetch }) => {
		const form_data = await request.formData();
		const username = form_data.get('username')?.toString();
		const password = form_data.get('password')?.toString();

		const data = await userApi({ baseFetch: fetch }).signIn(username, password);

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

		if (password !== password_confirm) {
			Notification.error("Nem eggyezik meg a két jelszó")
			return
		}

		const token = await userApi({ baseFetch: fetch }).completeFirstLogin(password, cookies.get("firstLoginToken"))

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