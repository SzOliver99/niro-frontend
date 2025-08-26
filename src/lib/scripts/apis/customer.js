const customerApi = (customFetch = fetch) => ({
    create: async (customer) => {
        const response = await customFetch('/api/customer/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(customer)
        });
        return await response.json();
    },
    getAllById: async (user_token, user_id) => {
        const response = await customFetch('/api/customer/get-all', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: user_token
            },
            body: JSON.stringify(user_id)
        });
        return await response.json();
    },
    changeCustomerUser: async (user_token, user_full_name, customer_ids) => {
        const response = await customFetch('/api/customer/change/user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: user_token
            },
            body: JSON.stringify({ user_full_name, customer_ids })
        });
        return await response.json();
    },
})

export default customerApi