<script>
	import Chart from 'svelte-frappe-charts';

	let { data, title, colors, maxSlices = null } = $props();
	let chartRef;

	const onExport = () => chartRef.exportChart();
</script>

<div class="relative my-3">
	<h1 class="ms-2 text-start text-lg italic">{title}</h1>
	{#if data.datasets[0].values.reduce((acc, curr) => acc + curr) != 0}
		<Chart {data} {colors} {maxSlices} type="pie" height={300} {chartRef} />
		<p class="text-center">
			Összesen: {data.datasets[0].values.reduce((acc, curr) => acc + curr)}
		</p>
	{:else}
		<p class="mt-5 text-center">Nincs megjeleníthető adat</p>
	{/if}
</div>
