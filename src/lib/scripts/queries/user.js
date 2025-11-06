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
		mutationFn: async ({ user, user_uuid }) => await userApi({ user_token }).modifyUserInfo(user, user_uuid),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['users'] });
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
		}
	});
};

export const deleteUserMutation = (user_token) => {
	const queryClient = useQueryClient();

	return createMutation({
		mutationFn: async (user) => await userApi({ user_token }).deleteUser(user),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['users'] });
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
			queryClient.invalidateQueries({ queryKey: ['managers'] });
		}
	});
};

export const updateSelfInfoMutation = (user_token) => {
	const queryClient = useQueryClient();

	return createMutation({
		mutationFn: async (payload) => await userApi({ user_token }).modifySelfInfo(payload),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['users'] });
			queryClient.invalidateQueries({ queryKey: ['managers'] });
		}
	});
};