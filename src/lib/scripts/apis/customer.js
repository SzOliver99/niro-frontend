import { wrapFetch } from "./api";

const customerApi = ({ baseFetch = fetch, user_token = null } = {}) => {
    const fetch = wrapFetch(baseFetch, user_token)

    return {
        create: async (customer) => {
            const response = await fetch('/api/customer/create', {
                method: 'POST',
                body: JSON.stringify(customer)
            });
            return await response.json();
        },
        getAllById: async (user_id) => {
            const response = await fetch('/api/customer/get-all', {
                method: 'POST',
                headers: {
                    Authorization: user_token
                },
                body: JSON.stringify(user_id)
            });
            return await response.json();
        },
        changeCustomerUser: async (user_full_name, customer_ids) => {
            const response = await fetch('/api/customer/change/user', {
                method: 'POST',
                headers: {
                    Authorization: user_token
                },
                body: JSON.stringify({ user_full_name, customer_ids })
            });
            return await response.json();
        },
    }
}

export default customerApi