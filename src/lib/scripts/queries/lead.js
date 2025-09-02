import { createMutation, useQueryClient } from "@tanstack/svelte-query";
import leadApi from "../apis/lead";

export const createLeadMutation = (user_token) => {
    const queryClient = useQueryClient();

    return createMutation({
        mutationFn: async ({ customer, lead }) => await leadApi({ user_token }).create(customer, lead),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['customers'] });
            queryClient.invalidateQueries({ queryKey: ['leads'] });
        }
    });
};

export const changeLeadHandlerMutation = (user_token) => {
    const queryClient = useQueryClient();

    return createMutation({
        mutationFn: async ({ user_full_name, selected_ids }) => await leadApi({ user_token }).changeHandler(user_full_name, selected_ids),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['leads'] });
        }
    });
};

export const deleteLeadMutation = (user_token) => {
    const queryClient = useQueryClient();

    return createMutation({
        mutationFn: async (selected_ids) => await leadApi({ user_token }).delete(selected_ids),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['leads'] });
        }
    });
};