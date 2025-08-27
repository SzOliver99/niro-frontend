import { createMutation, createQuery, queryOptions, useQueryClient } from '@tanstack/svelte-query';
import userApi from '../apis/user';
import { Notification } from '$lib/stores/notifications';

export const getUsersQuery = (user_token) =>
	queryOptions({
		queryKey: ['users', user_token],
		queryFn: () => userApi({ user_token }).getAllUsers()
	});

export const getManagerGroupQuery = (user_token) =>
	queryOptions({
		queryKey: ['manager-group', user_token],
		queryFn: () => userApi({ user_token }).getManagerGroup(),
		refetchInterval: 3000,
		refetchIntervalInBackground: false
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
		mutationFn: async (user) => await userApi({ user_token }).terminateUserContact(user),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['users'] });
			queryClient.invalidateQueries({ queryKey: ['manager-group'] });
			queryClient.invalidateQueries({ queryKey: ['managers'] });
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
