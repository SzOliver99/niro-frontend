<script>
	import DatesMonthly from '$lib/components/Charts/Performance/DatesMonthly.svelte';
	import DatesWeekly from '$lib/components/Charts/Performance/DatesWeekly.svelte';
	import IsCompletedChart from '$lib/components/Charts/Performance/IsCompletedChart.svelte';
	import MeetTypeChart from '$lib/components/Charts/Performance/MeetTypeChart.svelte';
	import PieChart from '$lib/components/Charts/PieChart.svelte';
	import TestChart from '$lib/components/Charts/TestChart.svelte';
	import userApi from '$lib/scripts/apis/user';
	import userDateApi from '$lib/scripts/apis/user_date';
	import { convertUserGroup } from '$lib/scripts/utils.js';
	import { permissionsStore } from '$lib/stores/permissions.js';
	import { createQuery } from '@tanstack/svelte-query';

	let { data } = $props();

	let sub_users = createQuery({
		queryKey: ['sub_users', data.token],
		queryFn: async () => await userApi({ user_token: data.token }).getUserSubUsers()
	});
	let selected_user = $state(0);
</script>

<div class="p-4">
	<div class="flex justify-between text-center">
		<div class="flex items-center gap-4">
			<h1 class="text-xl font-semibold">Teljesítmény</h1>
			<select
				id="select_user"
				name="select_user"
				bind:value={selected_user}
				disabled={$permissionsStore.userRole === 'Agent'}
				class="mt-1 block w-full rounded-md px-3 py-2 ring-1 ring-black/10 duration-200 focus:ring-blue-600 focus:outline-none"
			>
				<option value={0}>Összes</option>
				{#each $sub_users.data as user}
					<option value={user.uuid}
						>{user.info?.full_name} - {convertUserGroup(user.user_role)}</option
					>
				{/each}
			</select>
		</div>
	</div>
</div>

<div class="mb-10">
	<h2 class="mb-2 text-center text-2xl">Időpontok statisztikai modul</h2>
	<div class="flex flex-row justify-center gap-10">
		<div
			class="w-[40%] rounded-lg bg-gray-200/70 shadow ring-1 ring-black/10 duration-200 hover:scale-102 hover:bg-gray-200"
		>
			<IsCompletedChart {selected_user} />
		</div>
		<div
			class="w-[40%] rounded-lg bg-gray-200/70 shadow ring-1 ring-black/10 duration-200 hover:scale-102 hover:bg-gray-200"
		>
			<MeetTypeChart {selected_user} />
		</div>
	</div>
	<div class="flex flex-col">
		<div
			class="mx-10 mt-6 rounded-lg bg-gray-200/70 shadow ring-1 ring-black/10 duration-200 hover:scale-102 hover:bg-gray-200"
		>
			<DatesWeekly {selected_user} />
		</div>
		<div
			class="mx-10 mt-6 rounded-lg bg-gray-200/70 shadow ring-1 ring-black/10 duration-200 hover:scale-102 hover:bg-gray-200"
		>
			<DatesMonthly {selected_user} />
		</div>
	</div>
</div>
