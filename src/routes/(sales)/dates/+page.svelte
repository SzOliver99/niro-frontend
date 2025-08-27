<script>
	import DataTable from '$lib/components/data/DataTable.svelte';
	import userApi from '$lib/scripts/apis/user';
	import { convertUserGroup } from '$lib/scripts/utils';
	import { permissionsStore } from '$lib/stores/permissions';
	import { createQuery } from '@tanstack/svelte-query';
	import { Plus } from 'lucide-svelte';

	let { data } = $props();

	let sub_users = createQuery({
		queryKey: ['sub_users', data.token],
		queryFn: async () => await userApi({ user_token: data.token }).getUserSubUsers()
	});

	let selected_user = $state();

	const columns = [
		{ key: 'action', label: '#' },
		{ key: 'date', label: 'Dátum' },
		{ key: 'date', label: 'Megvalósult' }, // Legyen választható igen/nem
		{ key: 'full_name', label: 'Ügyfél neve' },
		{ key: 'phone_number', label: 'Telefonszám' },
		{ key: 'meet_location', label: 'Találkozó helyszíne' },
		{ key: 'meet_type', label: 'Találkozó típusa' },
		{ key: 'user_id', label: 'Üzletkötő', action: (user_id) => user_id }
	];

	const leadTypes = {
		needs_assessment: 'Igényfelmérés',
		consultation: 'Tanácsadás',
		service: 'Szervíz',
		annual_review: 'Évfordulós tárgyalás'
	};
</script>

<div class="p-4">
	<div class="flex justify-between text-center">
		<div class="flex items-center gap-4">
			<h1 class="text-xl font-semibold">Időpontok</h1>
			<select
				id="select_user"
				name="select_user"
				bind:value={selected_user}
				disabled={$permissionsStore.userRole === 'Agent'}
				class="mt-1 block w-full rounded-md px-3 py-2 ring-1 ring-black/10 duration-200 focus:ring-blue-600 focus:outline-none"
			>
				{#each $sub_users.data as user}
					<option value={user.id}
						>{user.info?.full_name} - {convertUserGroup(user.user_role)}</option
					>
				{/each}
			</select>
		</div>
		<button
			class="bg-gray me-4 flex items-center rounded-lg bg-blue-600 px-3 py-2 text-center text-nowrap text-white duration-200 hover:bg-blue-700"
		>
			<Plus />
			<p>Időpont hozzáadása</p>
		</button>
	</div>
	<DataTable
		user_data={[]}
		{columns}
		searchable={true}
		filterable={true}
		sortable={true}
		modifiable={false}
		pageSize={30}
	/>
</div>
