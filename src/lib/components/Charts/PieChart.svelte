<script>
	import { ImageDown } from 'lucide-svelte';
	import Chart from 'svelte-frappe-charts';

	let { data, title, colors, maxSlices = null } = $props();
	let chartRef = $state();

	const onExport = () => chartRef.exportChart();
</script>

<div class="relative my-3">
	<div class="mx-3 flex justify-between">
		<h1 class="text-start text-lg italic">{title}</h1>
		<button class="duration-200 hover:text-gray-400" onclick={onExport}><ImageDown /></button>
	</div>
	{#if data.datasets[0].values.reduce((acc, curr) => acc + curr) != 0}
		<Chart {data} {colors} {maxSlices} type="pie" height={300} bind:this={chartRef} />
		<p class="text-center">
			Összesen: {data.datasets[0].values.reduce((acc, curr) => acc + curr)}
		</p>
	{:else}
		<p class="mt-5 text-center">Nincs megjeleníthető adat</p>
	{/if}
</div>
