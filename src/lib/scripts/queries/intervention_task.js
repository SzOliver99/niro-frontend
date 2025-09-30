import { createMutation, useQueryClient } from "@tanstack/svelte-query";
import interventionTaskApi from "../apis/intervention_task";

export const createInterventionTaskMutation = (user_token) => {
    const queryClient = useQueryClient();

    return createMutation({
        mutationFn: async ({ customer, intervention_task, customer_uuid, created_by }) => await interventionTaskApi({ user_token }).create(customer, intervention_task, customer_uuid, created_by),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['intervention_tasks'] });
        }
    });
};

export const modifyInterventionTaskMutation = (user_token) => {
    const queryClient = useQueryClient();

    return createMutation({
        mutationFn: async ({ intervention_task_uuid, intervention_task }) => await interventionTaskApi({ user_token }).modify(intervention_task_uuid, intervention_task),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['intervention_tasks'] });
        }
    });
};

export const changeInterventionTasksHandlerMutation = (user_token) => {
    const queryClient = useQueryClient();

    return createMutation({
        mutationFn: async ({ user_full_name, selected_uuids }) => await interventionTaskApi({ user_token }).changeHandler(user_full_name, selected_uuids),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['intervention_tasks'] });
        }
    });
};

export const deleteInterventionTasksMutation = (user_token) => {
    const queryClient = useQueryClient();

    return createMutation({
        mutationFn: async (selected_uuids) => await interventionTaskApi({ user_token }).delete(selected_uuids),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['intervention_tasks'] });
        }
    });
};