import userApi from '$lib/scripts/apis/user';
import { Notification } from '$lib/stores/notifications';
import { redirect } from '@sveltejs/kit';

export async function load({ cookies, url, fetch }) {
	const token = cookies.get('token');
	const firstLoginToken = cookies.get('firstLoginToken');
	const fetchProtected = await userApi({ baseFetch: fetch, user_token: token }).validateToken();

	if (!fetchProtected.ok && url.pathname !== '/') {
		cookies.set('token', '', { path: '/', expires: new Date(0) });

		throw redirect(308, '/');
	}

	return { token, firstLoginToken };
}

export const prerender = true