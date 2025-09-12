import customerApi from "$lib/scripts/apis/customer";

export const prerender = false

export const load = async ({ cookies, params, fetch }) => {
    const token = cookies.get('token');
    let customer = await customerApi({ user_token: token, baseFetch: fetch }).getByUuid(params.uuid)

    return {
        customer
    };
};