<script>
	import { createQuery } from '@tanstack/svelte-query';
	import BarChart from '../BarChart.svelte';
	import { page } from '$app/state';
	import { ChevronLeft, ChevronRight, ImageDown } from 'lucide-svelte';
	import { convertUtcToLocalTime, onExport } from '$lib/scripts/utils';
	import contractApi from '$lib/scripts/apis/contract';

	let { selected_user = 'self' } = $props();
	let title = 'Heti termelés';

	//  Value: Color
	let valueTypes = ['Hétfő', 'Kedd', 'Szerda', 'Csütörtök', 'Péntek', 'Szombat', 'Vasárnap'];

	let currentWeekStart = $state(getStartOfWeek(new Date()));
	let currentWeekEnd = $derived(addDays(currentWeekStart, 6));
	function getStartOfWeek(date) {
		const d = new Date(date);
		const day = d.getDay();
		const diff = d.getDate() - day + (day === 0 ? -6 : 1);
		d.setDate(diff);
		d.setHours(0, 0, 0, 0);
		return d;
	}

	function formatDate(date) {
		return date.toLocaleDateString('hu-HU', { year: 'numeric', month: '2-digit', day: '2-digit' });
	}

	function addDays(date, days) {
		const d = new Date(date);
		d.setDate(d.getDate() + days);
		return d;
	}

	function prevWeek() {
		currentWeekStart = getStartOfWeek(addDays(currentWeekStart, -7));
	}

	function nextWeek() {
		const today = getStartOfWeek(new Date());
		const next = getStartOfWeek(addDays(currentWeekStart, 7));

		currentWeekStart = next;
	}

	let chartQuery = $derived(
		createQuery({
			queryKey: [
				'weekly-production-chart',
				page.data.token,
				selected_user,
				currentWeekStart,
				currentWeekEnd
			],
			queryFn: async () =>
				await contractApi({ user_token: page.data.token }).getWeeklyProductionChart(
					selected_user,
					convertUtcToLocalTime(currentWeekStart),
					convertUtcToLocalTime(currentWeekEnd)
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
				name: 'Heti termelés',
				values: listValues
			}
		]
	});
</script>

<div class="my-3">
	<div class="mx-3 flex items-center justify-between">
		<div class="flex items-center gap-2">
			<h1 class="text-start text-lg italic">{title}</h1>
		</div>
		<div class="flex items-center gap-2">
			<button
				class="duration-200 hover:text-gray-400"
				onclick={(e) =>
					onExport(e, `${title} (${formatDate(currentWeekStart)}-${formatDate(currentWeekEnd)})`)}
				><ImageDown /></button
			>
			<button class="rounded p-1 hover:bg-gray-100" onclick={prevWeek}><ChevronLeft /></button>
			<span class="text-sm font-medium">
				{formatDate(currentWeekStart)} - {formatDate(currentWeekEnd)}
			</span>
			<button
				class="rounded p-1 hover:bg-gray-100"
				onclick={nextWeek}
				disabled={getStartOfWeek(new Date()).getTime() === currentWeekStart.getTime()}
			>
				<ChevronRight />
			</button>
		</div>
	</div>
	<BarChart
		{data}
		colors={['']}
		tooltipOptions={{ formatTooltipY: (val) => `${val} db` }}
		formatTotal={(val) => `${val} db`}
	/>
</div>
