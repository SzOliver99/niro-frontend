<script>
	import userDateApi from '$lib/scripts/apis/user_date';
	import { createQuery } from '@tanstack/svelte-query';
	import PieChart from '../PieChart.svelte';
	import { page } from '$app/state';

	let { selected_user } = $props();

	let valueTypes = {
		Igen: '',
		Nem: '' // coloring
	};

	let chartQuery = $derived(
		createQuery({
			queryKey: ['is-completed-chart', page.data.token, selected_user],
			queryFn: async () =>
				await userDateApi({ user_token: page.data.token }).getIsCompletedChart(selected_user),
			enabled: selected_user !== undefined
		})
	);
	let listValues = $derived.by(() => ($chartQuery.data ? Object.values($chartQuery.data) : []));
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

<PieChart title="Megvalósulási ráta (%)" {data} colors={Object.values(valueTypes)} />
