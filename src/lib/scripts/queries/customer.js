import { createMutation, useQueryClient } from "@tanstack/svelte-query";
import customerApi from "../apis/customer";

// MUTATIONS
export const createCustomerMutation = () => {
    const queryClient = useQueryClient();

    return createMutation({
        mutationFn: async (customer) => await customerApi().create(customer),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['customers'] });
        }
    });
};


export const changeCustomerUserMutation = (user_token) => {
    const queryClient = useQueryClient();

    return createMutation({
        mutationFn: async ({ user_full_name, customer_ids }) => await customerApi({ user_token }).changeCustomerUser(user_full_name, customer_ids),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['customers'] });
        }
    });
};
