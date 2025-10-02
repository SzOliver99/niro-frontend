<script>
	import Chart from 'svelte-frappe-charts';

	let { data, title, colors, maxSlices = null, chartRef = $bindable() } = $props();
</script>

{#if data.datasets[0].values.reduce((acc, curr) => acc + curr) != 0}
	<Chart {data} {colors} {maxSlices} type="pie" height={300} bind:this={chartRef} />
	<p class="text-center">
		Összesen: {data.datasets[0].values.reduce((acc, curr) => acc + curr)}
	</p>
{:else}
	<p class="mt-5 text-center">Nincs megjeleníthető adat</p>
{/if}
