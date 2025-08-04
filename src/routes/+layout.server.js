import { fetchProtected } from '$lib/scripts/apis/user.js';
import { redirect } from '@sveltejs/kit';

export async function load({ cookies, url, fetch }) {
	const token = cookies.get('token');
	const firstLoginToken = cookies.get('firstLoginToken');
	const fetchProtected = await fetch(`/api/user/protected`, {
		headers: {
			Authorization: token
		}
	});

	if (fetchProtected.status === 401 && url.pathname !== '/') {
		cookies.set('token', '', { path: '/', expires: new Date(0) });

		throw redirect(308, '/');
	}

	return { token, firstLoginToken };
}
