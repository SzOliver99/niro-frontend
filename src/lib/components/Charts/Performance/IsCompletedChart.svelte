<script>
	import userDateApi from '$lib/scripts/apis/user_date';
	import { createQuery } from '@tanstack/svelte-query';
	import PieChart from '../PieChart.svelte';
	import { page } from '$app/state';
	import { ImageDown } from 'lucide-svelte';
	import { onExport } from '$lib/scripts/utils';

	let { selected_user = 'self' } = $props();
	let title = 'Megvalósulási ráta (%)';

	// Value: Color
	let valueTypes = {
		Igen: 'light-green',
		Nem: 'red'
	};

	let chartQuery = $derived(
		createQuery({
			queryKey: ['is-completed-chart', page.data.token, selected_user],
			queryFn: async () =>
				await userDateApi({ user_token: page.data.token }).getIsCompletedChart(selected_user),
			enabled: selected_user !== undefined
		})
	);
	let listValues = $derived.by(() => ($chartQuery.data ? Object.values($chartQuery.data) : [0]));
	let data = $derived({
		labels: Object.keys(valueTypes),
		datasets: [
			{
				name: 'Megvalósulási ráta (%)',
				values: listValues
			}
		]
	});
</script>

<div class="my-3">
	<div class="mx-3 flex justify-between">
		<h1 class="text-start text-lg italic">{title}</h1>
		<button class="duration-200 hover:text-gray-400" onclick={(e) => onExport(e, `${title}`)}
			><ImageDown /></button
		>
	</div>
	<PieChart
		{data}
		colors={Object.values(valueTypes)}
		tooltipOptions={{ formatTooltipY: (val) => `${val} db` }}
		formatTotal={(val) => `${val} db`}
	/>
</div>
