<script>
	import userDateApi from '$lib/scripts/apis/user_date';
	import { createQuery } from '@tanstack/svelte-query';
	import PieChart from '../PieChart.svelte';
	import { page } from '$app/state';

	let { selected_user } = $props();

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
</script>

<PieChart title="Találkozó típusai (Átlag)" {data} colors={Object.values(valueTypes)} />
