<script>
	import DataTable from '$lib/components/data/DataTable.svelte';
	import CreateDateModal from '$lib/components/Dates/CreateDateModal.svelte';
	import userApi from '$lib/scripts/apis/user';
	import userDateApi from '$lib/scripts/apis/user_date.js';
	import { convertUserGroup } from '$lib/scripts/utils';
	import { permissionsStore } from '$lib/stores/permissions';
	import { createSimpleModalStore } from '$lib/stores/user.js';
	import { createQuery } from '@tanstack/svelte-query';
	import { Plus } from 'lucide-svelte';
	import IsCompletedCell from '$lib/components/Dates/IsCompletedCell.svelte';
	import {
		changeUserDateHandlerMutation,
		deleteUserDateMutation
	} from '$lib/scripts/queries/user_date.js';
	import ModifyDateModal from '$lib/components/Dates/ModifyDateModal.svelte';

	let { data } = $props();

	let dateCreateModalStore = $state(createSimpleModalStore());
	let dateModifyModalStore = $state(createSimpleModalStore());

	let sub_users = createQuery({
		queryKey: ['sub_users', data.token],
		queryFn: async () => await userApi({ user_token: data.token }).getUserSubUsers()
	});

	let selected_user = $state();
	$effect.pre(() => {
		if ($sub_users.data && $sub_users.data.length > 0) {
			selected_user = $sub_users.data[0].uuid;
		}
	});

	let selected_month = $state();
	$effect.pre(() => {
		if (selected_month === undefined) {
			selected_month = new Date().toLocaleString('en-US', { month: 'long' });
		}
	});

	let selected_date = $state();

	let user_dates = $derived(
		createQuery({
			queryKey: ['user-dates', data.token, selected_user, selected_month],
			queryFn: async () =>
				await userDateApi({ user_token: data.token }).getAllByUserUuid(
					selected_user,
					selected_month
				),
			enabled: selected_user !== undefined
		})
	);

	const columns = [
		{ key: 'action', label: '#' },
		{
			key: 'meet_date',
			label: 'Találkozó időpontja',
			action: (date) => new Date(date).toLocaleString('hu-HU')
		},
		{ key: 'full_name', label: 'Ügyfél neve' },
		{ key: 'phone_number', label: 'Telefonszám' },
		{ key: 'meet_location', label: 'Találkozó helyszíne' },
		{ key: 'meet_type', label: 'Találkozó típusa', action: (type) => meetTypes[type] },
		{
			key: 'is_completed',
			label: 'Megvalósult?',
			component: IsCompletedCell
		},
		{ key: 'created_by', label: 'Üzletkötő' },
		{
			key: 'created_at',
			label: 'Létrehozás/Rögzítés dátuma',
			action: (date) => new Date(date).toLocaleString('hu-HU')
		}
	];

	const months = {
		January: 'Január',
		February: 'Február',
		March: 'Március',
		April: 'Április',
		May: 'Május',
		June: 'Június',
		July: 'Július',
		August: 'Augusztus',
		September: 'Szeptember',
		October: 'Október',
		November: 'November',
		December: 'December'
	};

	const meetTypes = {
		NeedsAssessment: 'Igényfelmérés',
		Consultation: 'Tanácsadás',
		Service: 'Szervíz',
		AnnualReview: 'Évfordulós tárgyalás'
	};
</script>

<div class="p-4">
	<div class="mb-3 flex flex-wrap justify-between text-center">
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
					<option value={user.uuid}
						>{user.info?.full_name} - {convertUserGroup(user.user_role)}</option
					>
				{/each}
			</select>
		</div>
		<button
			class="bg-gray me-4 flex items-center rounded-lg bg-blue-600 px-3 py-2 text-center text-nowrap text-white duration-200 hover:bg-blue-700"
			onclick={dateCreateModalStore.open}
		>
			<Plus />
			<p>Időpont hozzáadása</p>
		</button>
		<CreateDateModal bind:selected_user bind:dateCreateModalStore />
		<ModifyDateModal bind:selected_date bind:dateModifyModalStore />
	</div>
	<div class="mb-2 flex flex-wrap justify-center gap-3">
		{#each Object.entries(months) as [key, value]}
			<button
				class="rounded-lg border-1 border-gray-300 px-4 py-2 text-sm shadow-2xl duration-200 hover:border-gray-500"
				class:text-blue-600={key === selected_month}
				class:font-semibold={key === selected_month}
				onclick={() => (selected_month = key ?? undefined)}
			>
				{value}
			</button>
		{/each}
	</div>
	<DataTable
		data={$user_dates.data}
		{columns}
		modify_mutation={changeUserDateHandlerMutation(data.token)}
		delete_mutation={deleteUserDateMutation(data.token)}
		onClick={(date) => {
			selected_date = date;
			dateModifyModalStore.open();
		}}
		sort_column="meet_date"
		searchable={true}
		filterable={true}
		sortable={true}
		modifiable={true}
		pageSize={30}
	/>
</div>
