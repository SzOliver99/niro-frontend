<script>
	import userDateApi from '$lib/scripts/apis/user_date';
	import { createQuery } from '@tanstack/svelte-query';
	import PieChart from '../PieChart.svelte';
	import { page } from '$app/state';
	import { ImageDown } from 'lucide-svelte';

	let { selected_user } = $props();
	let title = 'Találkozó típusai (Átlag)';

	// Value: Color
	let valueTypes = {
		Igényfelmérés: '',
		Tanácsadás: '',
		Szervíz: '',
		'Évfordulós tárgyalás': ''
	};

	let chartQuery = $derived(
		createQuery({
			queryKey: ['meet-type-chart', page.data.token, selected_user],
			queryFn: async () =>
				await userDateApi({ user_token: page.data.token }).getMeetTypeChart(selected_user),
			enabled: selected_user !== undefined
		})
	);
	let listValues = $derived.by(() => ($chartQuery.data ? Object.values($chartQuery.data) : [0]));
	let data = $derived({
		labels: Object.keys(valueTypes),
		datasets: [
			{
				name: 'Találkozó típusai (Átlag)',
				values: listValues
			}
		]
	});

	let chartRef = $state();
	const onExport = () => chartRef.exportChart();
</script>

<div class="my-3">
	<div class="mx-3 flex justify-between">
		<h1 class="text-start text-lg italic">{title}</h1>
		<button class="duration-200 hover:text-gray-400" onclick={onExport}><ImageDown /></button>
	</div>
	<PieChart {data} colors={Object.values(valueTypes)} bind:chartRef />
</div>
