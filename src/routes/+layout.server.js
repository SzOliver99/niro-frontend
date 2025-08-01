import { fetchProtected } from '$lib/scripts/apis/user.js';
import { redirect } from '@sveltejs/kit';

export async function load({ cookies, url, fetch }) {
	const token = cookies.get('token');
	const firstLogin = cookies.get('firstLogin');
	const fetchProtected = await fetch(`/api/user/protected`, {
		headers: {
			Authorization: token
		}
	});
	console.log(fetchProtected);

	if (fetchProtected.status === 401 && url.pathname !== '/') {
		cookies.set('token', '', { path: '/', expires: new Date(0) });

		if (!firstLogin) {
			throw redirect(308, '/');
		}   
	}

	// if ((url.pathname !== '/' && !token) || !firstLogin) {
	//   throw redirect(308, '/');
	// }

	return { token };
}
