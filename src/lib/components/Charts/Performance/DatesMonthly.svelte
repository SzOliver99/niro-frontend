<script>
	import userDateApi from '$lib/scripts/apis/user_date';
	import { createQuery } from '@tanstack/svelte-query';
	import BarChart from '../BarChart.svelte';
	import { page } from '$app/state';
	import { ChevronLeft, ChevronRight, ImageDown } from 'lucide-svelte';
	import { convertUtcToLocalTime } from '$lib/scripts/utils';

	let { selected_user } = $props();
	let title = 'Időpontok száma (havi)';

	//  Value: Color
	let valueTypes = [
		'Január',
		'Február',
		'Március',
		'Április',
		'Május',
		'Június',
		'Július',
		'Augusztus',
		'Oktober',
		'November',
		'December'
	];

	// Helper functions for month navigation
	function getStartOfMonth(date) {
		const d = new Date(date);
		d.setDate(1);
		d.setHours(0, 0, 0, 0);
		return d;
	}

	function getEndOfMonth(date) {
		const d = new Date(date);
		d.setMonth(d.getMonth() + 1);
		d.setDate(0);
		d.setHours(23, 59, 59, 999);
		return d;
	}

	function formatDate(date) {
		return date.toLocaleDateString('hu-HU', { year: 'numeric', month: '2-digit', day: '2-digit' });
	}

	function addMonths(date, months) {
		const d = new Date(date);
		d.setMonth(d.getMonth() + months);
		return d;
	}

	let currentMonthStart = $state(getStartOfMonth(new Date()));
	let currentMonthEnd = $derived(getEndOfMonth(currentMonthStart));

	function prevMonth() {
		currentMonthStart = getStartOfMonth(addMonths(currentMonthStart, -1));
	}

	function nextMonth() {
		const todayStart = getStartOfMonth(new Date());
		const next = getStartOfMonth(addMonths(currentMonthStart, 1));
		currentMonthStart = next;
	}

	// Query for monthly data
	let chartQuery = $derived(
		createQuery({
			queryKey: [
				'dates-monthly-chart',
				page.data.token,
				selected_user,
				currentMonthStart,
				currentMonthEnd
			],
			queryFn: async () =>
				await userDateApi({ user_token: page.data.token }).getDatesMonthlyChart(
					selected_user,
					convertUtcToLocalTime(currentMonthStart),
					convertUtcToLocalTime(currentMonthEnd)
				),
			placeholderData: (previousData) => previousData,
			enabled: selected_user !== undefined
		})
	);

	let listValues = $derived.by(() => ($chartQuery.data ? Object.values($chartQuery.data) : [0]));
	let data = $derived({
		labels: valueTypes,
		datasets: [
			{
				name: 'Időpontok száma (havi)',
				values: listValues
			}
		]
	});

	let chartRef = $state();
	const onExport = () => chartRef.exportChart();
</script>

<div class="my-3">
	<div class="mx-3 flex items-center justify-between">
		<div class="flex items-center gap-2">
			<h1 class="text-start text-lg italic">{title}</h1>
		</div>
		<div class="flex items-center gap-2">
			<button class="duration-200 hover:text-gray-400" onclick={onExport}><ImageDown /></button>
			<button class="rounded p-1 hover:bg-gray-100" onclick={prevMonth}><ChevronLeft /></button>
			<span class="text-sm font-medium">
				{formatDate(currentMonthStart)} - {formatDate(currentMonthEnd)}
			</span>
			<button
				class="rounded p-1 hover:bg-gray-100"
				onclick={nextMonth}
				disabled={getStartOfMonth(new Date()).getTime() === currentMonthStart.getTime()}
			>
				<ChevronRight />
			</button>
		</div>
	</div>
	<BarChart {data} colors={['']} bind:chartRef />
</div>
