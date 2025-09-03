import { createMutation, createQuery, queryOptions, useQueryClient } from '@tanstack/svelte-query';
import userApi from '../apis/user';
import { Notification } from '$lib/stores/notifications';

export const getUserInfoQuery = (user_token) => queryOptions({
	queryKey: ['user_info', user_token],
	queryFn: async () => await userApi({ user_token }).getUserInfo(),
	staleTime: 60 * 60
});

// MUTATIONS
export const updateUsersMutation = (user_token) => {
	const queryClient = useQueryClient();

	return createMutation({
		mutationFn: async (user) => await userApi({ user_token }).modifyUserInfo(user),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['users'] });
			queryClient.invalidateQueries({ queryKey: ['manager-group'] });
			queryClient.invalidateQueries({ queryKey: ['managers'] });
		}
	});
};

export const createUsersMutation = (user_token) => {
	const queryClient = useQueryClient();

	return createMutation({
		mutationFn: async (user) => await userApi({ user_token }).signUp(user),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['users'] });
			queryClient.invalidateQueries({ queryKey: ['manager-group'] });
		}
	});
};

export const deleteUserMutation = (user_token) => {
	const queryClient = useQueryClient();

	return createMutation({
		mutationFn: async (user) => await userApi({ user_token }).deleteUserContact(user),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['users'] });
			queryClient.invalidateQueries({ queryKey: ['manager-group'] });
		}
	});
};

export const updateManagersMutation = (user_token) => {
	const queryClient = useQueryClient();

	return createMutation({
		mutationFn: async (user) => await userApi({ user_token }).modifyUserManager(user),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['users'] });
			queryClient.invalidateQueries({ queryKey: ['manager-group'] });
			queryClient.invalidateQueries({ queryKey: ['managers'] });
		}
	});
};
