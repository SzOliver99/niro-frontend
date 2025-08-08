import { signUp } from '$lib/scripts/apis/user';
import { redirect } from '@sveltejs/kit';
import axios from 'axios';

export const actions = {
	default: async ({ request, cookies }) => {
		const form_data = await request.formData();
		const email = form_data.get('email')?.toString();
		const username = form_data.get('username')?.toString();
		const password = form_data.get('password')?.toString();

		const last_name = form_data.get('last_name')?.toString();
		const first_name = form_data.get('first_name')?.toString();
		const phone_number = form_data.get('phone_number')?.toString();
		const hufa_code = form_data.get('hufa_code')?.toString();
		const agent_code = form_data.get('agent_code')?.toString();

		const agent = {
			email,
			username,
			password,
			user_info: {
				full_name: `${last_name} ${first_name}`,
				phone_number,
				hufa_code,
				agent_code
			}
		};

		try {
			const response = await signUp(agent, cookies.get('token'));
			const data = response.data;

			if (!data) {
				return { success: false, error: 'No data received' };
			}

			throw redirect(303, '/employee-management');
		} catch (err) {
			if (err instanceof redirect || err?.status === 303) throw err;

			if (axios.isAxiosError(err)) {
				return { success: false, error: err.response?.data ?? 'Agent creation is failed' };
			}

			console.error('Unexpected error:', err);
			return { success: false, error: 'Internal server error' };
		}
	}
};
