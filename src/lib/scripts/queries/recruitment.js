import { createMutation, useQueryClient } from "@tanstack/svelte-query";
import recruitmentApi from "../apis/recruitment";

export const createRecruitmentMutation = (user_token) => {
    const queryClient = useQueryClient();

    return createMutation({
        mutationFn: async (payload) => await recruitmentApi({ user_token }).create(payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['recruitments'] });
        }
    });
};

export const modifyRecruitmentMutation = (user_token) => {
    const queryClient = useQueryClient();

    return createMutation({
        mutationFn: async ({ recruitment_uuid, payload }) =>
            await recruitmentApi({ user_token }).modify(recruitment_uuid, payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['recruitments'] });
            queryClient.invalidateQueries({ queryKey: ['recruitment'] });
        }
    });
};

export const deleteRecruitmentMutation = (user_token) => {
    const queryClient = useQueryClient();

    return createMutation({
        mutationFn: async (recruitment_uuid) => await recruitmentApi({ user_token }).delete(recruitment_uuid),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['recruitments'] });
        }
    });
};
