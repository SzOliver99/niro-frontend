import { createMutation, useQueryClient } from "@tanstack/svelte-query";
import contractApi from "../apis/contract";

export const createContractMutation = (user_token) => {
    const queryClient = useQueryClient();

    return createMutation({
        mutationFn: async ({ customer, contract }) => await contractApi({ user_token }).create(customer, contract),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['contracts'] });
        }
    });
};

export const modifyContractMutation = (user_token) => {
    const queryClient = useQueryClient();

    return createMutation({
        mutationFn: async ({ contract_uuid, contract }) => await contractApi({ user_token }).modify(contract_uuid, contract),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['contracts'] });
        }
    });
};

export const changeContractHandlerMutation = (user_token) => {
    const queryClient = useQueryClient();

    return createMutation({
        mutationFn: async ({ user_full_name, selected_uuids }) => await contractApi({ user_token }).changeHandler(user_full_name, selected_uuids),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['contracts'] });
        }
    });
};

export const deleteContractMutation = (user_token) => {
    const queryClient = useQueryClient();

    return createMutation({
        mutationFn: async (selected_uuids) => await contractApi({ user_token }).delete(selected_uuids),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['contracts'] });
        }
    });
};