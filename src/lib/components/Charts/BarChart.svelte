<script>
	import Chart from 'svelte-frappe-charts';

	let {
		data,
		title,
		colors,
		chartRef = $bindable(),
		// Optional props to customize chart behavior/formatting per usage context
		tooltipOptions,
		axisOptions,
		barOptions,
		formatTotal
	} = $props();
	const getTotal = (chartData) => {
		if (!chartData || !Array.isArray(chartData.datasets) || chartData.datasets.length === 0) {
			return 0;
		}
		return chartData.datasets
			.map((ds) => (Array.isArray(ds.values) ? ds.values : []))
			.flat()
			.reduce((sum, value) => sum + (Number.isFinite(value) ? value : 0), 0);
	};

	const hasData = (chartData) => {
		return getTotal(chartData) > 0;
	};
</script>

{#if hasData(data)}
	<Chart
		{data}
		{colors}
		type="bar"
		height={350}
		bind:this={chartRef}
		{tooltipOptions}
		{axisOptions}
		{barOptions}
	/>
	<p class="text-center">
		Összesen: {formatTotal ? formatTotal(getTotal(data)) : getTotal(data)}
	</p>
{:else}
	<p class="mt-5 text-center">Nincs megjeleníthető adat</p>
{/if}
