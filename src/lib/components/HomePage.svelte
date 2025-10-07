<script>
	import MonthlyProduction from './Charts/Contract/MonthlyProduction.svelte';
	import MonthlyProductionValue from './Charts/Contract/MonthlyProductionValue.svelte';
	import Portfolio from './Charts/Contract/Portfolio.svelte';
	import ProductionCount from './Charts/Contract/ProductionCount.svelte';
	import ProductionValue from './Charts/Contract/ProductionValue.svelte';
	import WeeklyProduction from './Charts/Contract/WeeklyProduction.svelte';
	import DatesMonthly from './Charts/Performance/DatesMonthly.svelte';
	import DatesWeekly from './Charts/Performance/DatesWeekly.svelte';
	import IsCompletedChart from './Charts/Performance/IsCompletedChart.svelte';
	import MeetTypeChart from './Charts/Performance/MeetTypeChart.svelte';
</script>

<div>
	<h1 class="mt-36 mb-16 text-center text-6xl italic">NIRO CRM kezelőfelület</h1>

	<div class="mx-10">
		<div class="mb-24 flex flex-col gap-6">
			<h2 class="mb-2 text-center text-2xl">Időpontok statisztikai modul</h2>
			<div class="flex flex-row justify-center gap-10">
				<div
					id="chart"
					class="w-[40%] rounded-lg bg-gray-200/70 shadow ring-1 ring-black/10 duration-200 hover:scale-102 hover:bg-gray-200"
				>
					<IsCompletedChart />
				</div>
				<div
					id="chart"
					class="w-[40%] rounded-lg bg-gray-200/70 shadow ring-1 ring-black/10 duration-200 hover:scale-102 hover:bg-gray-200"
				>
					<MeetTypeChart />
				</div>
			</div>
			<div class="flex flex-col gap-6">
				<div
					id="chart"
					class="rounded-lg bg-gray-200/70 shadow ring-1 ring-black/10 duration-200 hover:scale-102 hover:bg-gray-200"
				>
					<DatesWeekly />
				</div>
				<div
					id="chart"
					class="rounded-lg bg-gray-200/70 shadow ring-1 ring-black/10 duration-200 hover:scale-102 hover:bg-gray-200"
				>
					<DatesMonthly />
				</div>
			</div>
		</div>
		<div class="mb-12 flex flex-col gap-6">
			<h2 class="mb-2 text-center text-2xl">Szerződések statisztikai modul</h2>
			<div class="flex flex-row justify-center gap-10">
				<div
					id="chart"
					class="w-[40%] rounded-lg bg-gray-200/70 shadow ring-1 ring-black/10 duration-200 hover:scale-102 hover:bg-gray-200"
				>
					<ProductionValue />
				</div>
				<div
					id="chart"
					class="w-[40%] rounded-lg bg-gray-200/70 shadow ring-1 ring-black/10 duration-200 hover:scale-102 hover:bg-gray-200"
				>
					<ProductionCount />
				</div>
			</div>
			<div class="flex flex-row justify-center gap-10">
				<div
					id="chart"
					class="w-[70%] rounded-lg bg-gray-200/70 shadow ring-1 ring-black/10 duration-200 hover:scale-102 hover:bg-gray-200"
				>
					<Portfolio />
				</div>
			</div>
			<div class="flex flex-col gap-6">
				<div
					id="chart"
					class="rounded-lg bg-gray-200/70 shadow ring-1 ring-black/10 duration-200 hover:scale-102 hover:bg-gray-200"
				>
					<WeeklyProduction />
				</div>
				<div
					id="chart"
					class="rounded-lg bg-gray-200/70 shadow ring-1 ring-black/10 duration-200 hover:scale-102 hover:bg-gray-200"
				>
					<MonthlyProductionValue />
				</div>
				<div
					id="chart"
					class="rounded-lg bg-gray-200/70 shadow ring-1 ring-black/10 duration-200 hover:scale-102 hover:bg-gray-200"
				>
					<MonthlyProduction />
				</div>
			</div>
		</div>
	</div>
</div>
