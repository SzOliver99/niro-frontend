import { createMutation, useQueryClient } from "@tanstack/svelte-query";
import userDateApi from "../apis/user_date";

export const createUserDateMutation = (user_token) => {
    const queryClient = useQueryClient();

    return createMutation({
        mutationFn: async (user_date) => await userDateApi({ user_token }).create(user_date),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['user-dates'] });
        }
    });
};

export const changeUserDateHandlerMutation = (user_token) => {
    const queryClient = useQueryClient();

    return createMutation({
        mutationFn: async ({ user_full_name, selected_uuids }) => await userDateApi({ user_token }).changeHandler(user_full_name, selected_uuids),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['user-dates'] });
        }
    });
};

export const changeUserDateStateMutation = (user_token) => {
    const queryClient = useQueryClient();

    return createMutation({
        mutationFn: async ({ date_uuid, value }) => await userDateApi({ user_token }).changeState(date_uuid, value),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['user-dates'] });
        }
    });
};

export const deleteUserDateMutation = (user_token) => {
    const queryClient = useQueryClient();

    return createMutation({
        mutationFn: async (selected_uuids) => await userDateApi({ user_token }).delete(selected_uuids),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['user-dates'] });
        }
    });
};