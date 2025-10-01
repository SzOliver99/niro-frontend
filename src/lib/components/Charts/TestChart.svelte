<script>
	import Chart from 'svelte-frappe-charts';

	let chartRef;
	let colors = [
		'#ff0000',
		'#c0ddf9',
		'#73b3f3',
		'#3886e1',
		'#17459e',
		'#17459e',
		'#17459e',
		'#17459e'
	];
	let axisMixedData = {
		labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
		datasets: [
			{
				name: 'Dataset 1',
				values: [30, 50, -10, 15, 18, 32, 27, 14],
				chartType: 'bar'
			},
			{
				name: 'Dataset 2',
				values: [30, 50, -10, 15, 18, 32, 27, 14],
				chartType: 'line'
			}
		]
	};
	let data = {
		labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
		datasets: [
			{
				name: 'Dataset 1',
				values: [30, 50, -10, 15, 18, 32, 27, 14]
			}
		],
		yMarkers: [{ label: 'Marker', value: 30 }],
		yRegions: [
			{
				label: 'Optimum Value',
				start: 0,
				end: 60,
				options: { labelPos: 'right' }
			}
		]
	};

	function updateData() {
		data.datasets[0].values = Array.from({ length: 8 }, () => Math.floor(Math.random() * 101) - 50);
	}

	let startDate = new Date('2025-01-01');
	let dataPoints = {};
	console.log(dataPoints);

	for (let i = 0; i < 30; i++) {
		let timestamp = Math.floor(startDate.getTime() / 1000); // convert ms → seconds
		dataPoints[timestamp] = Math.floor(Math.random() * 100); // random value
		startDate.setDate(startDate.getDate() + 1); // next day
	}
	let heatmapData = {
		dataPoints,
		start: startDate,
		end: new Date('2025-12-31')
	};

	const onExport = () => chartRef.exportChart();
</script>

<div>
	<button class="rounded-lg bg-gray-300 px-3 py-1 shadow" onclick={updateData}>Update Data</button>
	<button class="rounded-lg bg-gray-300 px-3 py-1 shadow" onclick={onExport}> Export </button>
	<Chart title="Line chart" {data} colors={['#991111']} type="line" bind:this={chartRef} />
	<Chart title="Bar chart" {data} type="bar" />
	<Chart title="Axis Mixed chart" data={axisMixedData} type="axis-mixed" />
	<Chart title="Pie chart" {data} type="pie" maxSlices={5} />
	<Chart title="Donut chart" {data} type="donut" maxSlices={null} />
	<Chart title="Percentage chart" {data} type="percentage" maxSlices={null} height={200} />
	<!-- <Chart title="Heatmap chart" data={heatmapData} colors={['#991111']} type="heatmap" radius={2} /> -->
</div>
