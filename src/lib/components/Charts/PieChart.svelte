<script>
	import Chart from 'svelte-frappe-charts';

	let { data, title, colors, maxSlices = null } = $props();
	let chartRef;

	function updateData() {
		data.datasets[0].values = Array.from({ length: 8 }, () => Math.floor(Math.random() * 101) - 50);
	}
	const onExport = () => chartRef.exportChart();
</script>

<div>
	<h1 class="ms-2 mt-2 text-start text-lg italic">{title}</h1>
	<Chart {data} {colors} {maxSlices} type="pie" height={300} />
</div>
