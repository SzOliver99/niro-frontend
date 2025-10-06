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
		'Szeptember',
		'Oktober',
		'November',
		'December'
	];

	// Helper functions for year navigation
	function getStartOfYear(date) {
		const d = new Date(date);
		d.setMonth(0, 1);
		d.setHours(0, 0, 0, 0);
		return d;
	}

	function getEndOfYear(date) {
		const d = new Date(date);
		d.setMonth(11, 31);
		d.setHours(23, 59, 59, 999);
		return d;
	}

	function formatDate(date) {
		return date.toLocaleDateString('hu-HU', { year: 'numeric', month: '2-digit', day: '2-digit' });
	}

	function addYears(date, years) {
		const d = new Date(date);
		d.setFullYear(d.getFullYear() + years);
		return d;
	}

	let currentYearStart = $state(getStartOfYear(new Date()));
	let currentYearEnd = $derived(getEndOfYear(currentYearStart));

	function prevYear() {
		currentYearStart = getStartOfYear(addYears(currentYearStart, -1));
	}

	function nextYear() {
		const next = getStartOfYear(addYears(currentYearStart, 1));
		currentYearStart = next;
	}

	// Query for monthly data
	let chartQuery = $derived(
		createQuery({
			queryKey: [
				'dates-monthly-chart',
				page.data.token,
				selected_user,
				currentYearStart,
				currentYearEnd
			],
			queryFn: async () =>
				await userDateApi({ user_token: page.data.token }).getDatesMonthlyChart(
					selected_user,
					convertUtcToLocalTime(currentYearStart),
					convertUtcToLocalTime(currentYearEnd)
				),
			placeholderData: (previousData) => previousData,
			enabled: selected_user !== undefined
		})
	);
	// $chartQuery.data example: [{month: 9, week1: 5, week2: 7, week3: 3, week4: 2, week5: 0}, {month: 10, week1: 10, week2: 8, week3: 6, week4: 4, week5: 2}]

	let data = $derived(
		(() => {
			const months = $chartQuery.data ?? [0];
			const labels = months.map((m) => valueTypes[m.month - 1]);

			const weekKeys = ['week1', 'week2', 'week3', 'week4', 'week5'];
			const datasets = weekKeys.map((key, i) => ({
				name: `${i + 1}. hét`,
				values: months.map((m) => m[key] ?? 0)
			}));
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
	<div class="mx-3 flex items-center justify-between">
		<div class="flex items-center gap-2">
			<h1 class="text-start text-lg italic">{title}</h1>
		</div>
		<div class="flex items-center gap-2">
			<button class="duration-200 hover:text-gray-400" onclick={onExport}><ImageDown /></button>
			<button class="rounded p-1 hover:bg-gray-100" onclick={prevYear}><ChevronLeft /></button>
			<span class="text-sm font-medium">
				{formatDate(currentYearStart)} - {formatDate(currentYearEnd)}
			</span>
			<button
				class="rounded p-1 hover:bg-gray-100"
				onclick={nextYear}
				disabled={getStartOfYear(new Date()).getTime() === currentYearStart.getTime()}
			>
				<ChevronRight />
			</button>
		</div>
	</div>
	<BarChart {data} colors={['']} bind:chartRef />
</div>
