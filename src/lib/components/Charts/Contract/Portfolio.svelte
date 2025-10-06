<script>
	import { createQuery } from '@tanstack/svelte-query';
	import PieChart from '../PieChart.svelte';
	import { page } from '$app/state';
	import { ImageDown } from 'lucide-svelte';
	import contractApi from '$lib/scripts/apis/contract';

	let { selected_user } = $props();
	let title = 'Portfolió (%)';

	// Value: Color
	let valueTypes = {
		'Bónusz Életprogram': '',
		Életprogram: '',
		'Allianz Gondoskodás Most': '',
		Egészségprogram: '',
		'MyHome lakásbiztosítás': '',
		'MFO lakásbiztosítás': '',
		'Vállalati vagyon biztosítás': '',
		KGFB: '',
		CASCO: '',
		Utasbiztosítás: '',
		Társasházbiztosítás: '',
		'Mezőgazdasági biztosítás': ''
	};

	let chartQuery = $derived(
		createQuery({
			queryKey: ['portfolio-chart', page.data.token, selected_user],
			queryFn: async () =>
				await contractApi({ user_token: page.data.token }).getPortfolioChart(selected_user),
			enabled: selected_user !== undefined
		})
	);
	let listValues = $derived.by(() => ($chartQuery.data ? Object.values($chartQuery.data) : [0]));
	let data = $derived(
		(() => {
			let allLabels = Object.keys(valueTypes);
			let allValues = listValues;
			let filtered = allLabels
				.map((label, i) => ({ label, value: allValues[i] }))
				.filter((item) => item.value > 0);

			let labels = filtered.map((item) => item.label);
			let datasets = [
				{
					name: 'Portfolió (%)',
					values: filtered.map((item) => item.value)
				}
			];

			return {
				labels,
				datasets
			};
		})()
	);

	let chartRef = $state();
	const onExport = () => chartRef.exportChart();
</script>

<div class="my-3">
	<div class="mx-3 flex justify-between">
		<h1 class="text-start text-lg italic">{title}</h1>
		<button class="duration-200 hover:text-gray-400" onclick={onExport}><ImageDown /></button>
	</div>
	<PieChart
		{data}
		colors={Object.values(valueTypes)}
		bind:chartRef
		tooltipOptions={{ formatTooltipY: (val) => `${val} db` }}
		formatTotal={(val) => `${val} db`}
	/>
</div>
