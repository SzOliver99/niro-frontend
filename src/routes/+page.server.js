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

		const complete_first_login_response = await userApi({ baseFetch: fetch }).completeFirstLogin(password, cookies.get("firstLoginToken"))
		const token_data = await complete_first_login_response.json()

		if (complete_first_login_response.ok) {
			cookies.set('token', token_data, {
				path: '/',
				httpOnly: true,
				sameSite: 'lax',
				secure: true,
				maxAge: 60 * 60
			});
		}
		cookies.set('firstLoginToken', '', { path: '/', expires: new Date(0) });
	}
};

export const prerender = false;