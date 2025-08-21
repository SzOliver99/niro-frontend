import { createMutation, createQuery, queryOptions, useQueryClient } from "@tanstack/svelte-query";
import userApi from "../apis/user";
import { Notification } from "$lib/stores/notifications";

export const getUsersQuery = (user_token) => queryOptions({
    queryKey: ['users', user_token],
    queryFn: () => userApi().getAllUsers(user_token)
});

export const getManagerGroupQuery = (user_token) => queryOptions({
    queryKey: ['manager-group', user_token],
    queryFn: () => userApi().getManagerGroup(user_token)
})

export const getManagersQuery = () => queryOptions({
    queryKey: ['managers'],
    queryFn: () => userApi().getManagers()
})

export const useUpdateUsers = (user_token) => {
    const queryClient = useQueryClient();

    return createMutation({
        mutationFn: async (user) => userApi().modifyUserInfo(user_token, user),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['users'] });
            queryClient.invalidateQueries({ queryKey: ['manager-group'] });
            Notification.success("Sikeresen elmentetted", 3)
        }
    });
};


