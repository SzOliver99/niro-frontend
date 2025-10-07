<script>
	import { page } from '$app/state';
	import contractApi from '$lib/scripts/apis/contract';
	import { createQuery } from '@tanstack/svelte-query';

	let { selected_user } = $props();

	let title = 'Termelés (Darabszám)';

	let product_count = $derived(
		createQuery({
			queryKey: ['production-count', selected_user],
			queryFn: async () =>
				await contractApi({ user_token: page.data.token }).getProductionCount(selected_user),
			enabled: selected_user !== undefined
		})
	);
</script>

<div class="my-3">
	<div class="mx-3 flex items-center justify-between">
		<div class="flex items-center gap-2">
			<h1 class="text-start text-lg italic">{title}</h1>
		</div>
		<div class="flex items-center gap-2"></div>
	</div>
	<div class="mt-2 flex justify-center text-2xl">
		<p>{$product_count.data} db</p>
	</div>
</div>
