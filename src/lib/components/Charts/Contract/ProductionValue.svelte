<script>
	import { page } from '$app/state';
	import contractApi from '$lib/scripts/apis/contract';
	import { onExport } from '$lib/scripts/utils';
	import { createQuery } from '@tanstack/svelte-query';
	import { ImageDown } from 'lucide-svelte';

	let { selected_user = 'self' } = $props();

	let title = 'Termelés (Állománydíj)';

	let product_value = $derived(
		createQuery({
			queryKey: ['production-value', selected_user],
			queryFn: async () =>
				await contractApi({ user_token: page.data.token }).getProductionValue(selected_user),
			enabled: selected_user !== undefined
		})
	);
</script>

<div class="my-3">
	<div class="mx-3 flex items-center justify-between">
		<div class="flex items-center gap-2">
			<h1 class="text-start text-lg italic">{title}</h1>
		</div>
		<div class="flex items-center gap-2">
			<button class="duration-200 hover:text-gray-400" onclick={(e) => onExport(e, `${title}`)}
				><ImageDown /></button
			>
		</div>
	</div>
	<div class="mt-2 flex justify-center text-2xl">
		<p>
			{$product_value.data?.toLocaleString('hu-HU', {
				style: 'currency',
				currency: 'HUF',
				minimumFractionDigits: 0,
				maximumFractionDigits: 0
			})}
		</p>
	</div>
</div>
