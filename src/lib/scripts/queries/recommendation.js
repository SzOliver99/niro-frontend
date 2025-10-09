import { createMutation, useQueryClient } from "@tanstack/svelte-query";
import recommendationApi from "../apis/recommendation";

// Create recommendation
export const createRecommendationMutation = (user_token) => {
    const queryClient = useQueryClient();

    return createMutation({
        mutationFn: async ({ user_uuid, payload }) => await recommendationApi({ user_token }).create(user_uuid, payload),
        onSuccess: () => {
            // refresh lists that show recommendations
            queryClient.invalidateQueries({ queryKey: ['recommendations'] });
        }
    });
};

// Modify recommendation
export const modifyRecommendationMutation = (user_token) => {
    const queryClient = useQueryClient();

    return createMutation({
        mutationFn: async ({ recommendation_uuid, recommendation }) =>
            await recommendationApi({ user_token }).modify(recommendation_uuid, recommendation),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['recommendations'] });
            queryClient.invalidateQueries({ queryKey: ['recommendation'] });
        }
    });
};

// Change handler (transfer recommendations between users)
export const changeRecommendationHandlerMutation = (user_token) => {
    const queryClient = useQueryClient();

    return createMutation({
        mutationFn: async ({ user_full_name, selected_uuids }) =>
            await recommendationApi({ user_token }).changeHandler(user_full_name, selected_uuids),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['recommendations'] });
        }
    });
};

// Delete recommendations
export const deleteRecommendationMutation = (user_token) => {
    const queryClient = useQueryClient();

    return createMutation({
        mutationFn: async (selected_uuids) => await recommendationApi({ user_token }).delete(selected_uuids),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['recommendations'] });
        }
    });
};