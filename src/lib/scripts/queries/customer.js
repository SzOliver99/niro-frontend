import { createMutation, useQueryClient } from "@tanstack/svelte-query";
import customerApi from "../apis/customer";

// MUTATIONS
export const createCustomerMutation = (user_token) => {
    const queryClient = useQueryClient();

    return createMutation({
        mutationFn: async (customer) => await customerApi({ user_token }).create(customer),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['customers'] });
        }
    });
};

export const modifyCustomerMutation = (user_token) => {
    const queryClient = useQueryClient();

    return createMutation({
        mutationFn: async (customer) => await customerApi({ user_token }).modify(customer),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['customers'] });
        }
    });
};

export const saveCustomerCommentMutation = (user_token) => {
    const queryClient = useQueryClient();

    return createMutation({
        mutationFn: async ({ customer_uuid, comment }) => await customerApi({ user_token }).saveComment(customer_uuid, comment),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['customer'] });
        }
    });
};

export const changeCustomerHandlerMutation = (user_token) => {
    const queryClient = useQueryClient();

    return createMutation({
        mutationFn: async ({ user_full_name, selected_uuids }) => await customerApi({ user_token }).changeHandler(user_full_name, selected_uuids),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['customers'] });
        }
    });
};

export const deleteCustomerMutation = (user_token) => {
    const queryClient = useQueryClient();

    return createMutation({
        mutationFn: async (selected_uuids) => await customerApi({ user_token }).delete(selected_uuids),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['customers'] });
        }
    });
};