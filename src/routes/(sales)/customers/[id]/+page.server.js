import customerApi from "$lib/scripts/apis/customer";

export async function load({ cookies, params, fetch }) {
    const user_token = cookies.get('token');
    const customer_id = params.id;

    const customer_data = await customerApi({ baseFetch: fetch, user_token }).getById(+customer_id);

    return {
        customer_data
    };
}

export const prerender = false
