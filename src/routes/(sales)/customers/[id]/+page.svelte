<script>
	import { page } from '$app/state';
	import customerApi from '$lib/scripts/apis/customer';
	import { createQuery } from '@tanstack/svelte-query';

	let { data } = $props();
	const customer = createQuery({
		queryKey: ['customer', data.token, page.params.id],
		queryFn: async () => await customerApi({ user_token: data.token }).getById(+page.params.id)
	});
	console.log($customer.data);
</script>
