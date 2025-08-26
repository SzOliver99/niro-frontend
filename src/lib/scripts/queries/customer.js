import { createMutation, useQueryClient } from "@tanstack/svelte-query";
import customerApi from "../apis/customer";

export const useChangeCustomerUser = (user_token) => {
    const queryClient = useQueryClient();

    return createMutation({
        mutationFn: async ({ user_full_name, customer_ids }) => await customerApi().changeCustomerUser(user_token, user_full_name, customer_ids),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['customers'] });
        }
    });
};
