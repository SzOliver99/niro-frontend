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

export const changeCustomerHandlerMutation = (user_token) => {
    const queryClient = useQueryClient();

    return createMutation({
        mutationFn: async ({ user_full_name, selected_ids }) => await customerApi({ user_token }).changeHandler(user_full_name, selected_ids),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['customers'] });
        }
    });
};

export const deleteCustomerMutation = (user_token) => {
    const queryClient = useQueryClient();

    return createMutation({
        mutationFn: async (selected_ids) => await customerApi({ user_token }).delete(selected_ids),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['customers'] });
        }
    });
};