<script>
	import { goto } from '$app/navigation';
	import DataTable from '$lib/components/data/DataTable.svelte';
	import CreateInterventionTaskModal from '$lib/components/InterventionTask/CreateInterventionTaskModal.svelte';
	import interventionTaskApi from '$lib/scripts/apis/intervention_task.js';
	import userApi from '$lib/scripts/apis/user';
	import {
		changeInterventionTasksHandlerMutation,
		deleteInterventionTasksMutation
	} from '$lib/scripts/queries/intervention_task.js';
	import { convertUserGroup } from '$lib/scripts/utils';
	import { permissionsStore } from '$lib/stores/permissions';
	import { createSimpleModalStore } from '$lib/stores/user.js';
	import { createQuery } from '@tanstack/svelte-query';
	import { Plus } from 'lucide-svelte';

	let { data } = $props();

	let createInterventionTaskModalStore = $state(createSimpleModalStore());

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

	let intervention_tasks = $derived(
		createQuery({
			queryKey: ['intervention_tasks', data.token, selected_user],
			queryFn: async () =>
				await interventionTaskApi({ user_token: data.token }).getAllByUserUuid(selected_user),
			enabled: selected_user !== undefined
		})
	);

	const columns = [
		{ key: 'action', label: '#' },
		{ key: 'contract_number', label: 'Szerződés szám' },
		{ key: 'product_name', label: 'Termék neve' },
		{ key: 'full_name', label: 'Partner neve' },
		{ key: 'address', label: 'Partner címe' },
		{ key: 'phone_number', label: 'Partner telefonszáma' },
		{ key: 'email', label: 'Partner emailcíme' },
		{ key: 'outstanding_days', label: 'Kintlévőséges napok száma' },
		{
			key: 'balance',
			label: 'Egyenleg',
			action: (value) =>
				value.toLocaleString('hu-HU', {
					style: 'currency',
					currency: 'HUF',
					minimumFractionDigits: 0,
					maximumFractionDigits: 0
				})
		},
		{
			key: 'processing_deadline',
			label: 'Feldolgozási határidő',
			action: (date) => new Date(date).toLocaleString('hu-HU')
		},
		{ key: 'comment', label: 'Megjegyzés' },
		{ key: 'status', label: 'Státusz', action: (status) => statusTypes[status] },
		{ key: 'created_by', label: 'Üzletkötő' }
	];

	const statusTypes = {
		PaymentPromise: 'Fizetési ígéret',
		Processed: 'Elintézett',
		Nonpayment: 'Fizetésmegtagadás',
		PendingDeletion: 'Törlésre vár'
	};
</script>

<div class="p-4">
	<div class="flex justify-between text-center">
		<div class="flex items-center gap-4">
			<h1 class="text-xl font-semibold text-nowrap">Intervenciós feladatok</h1>
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
			onclick={createInterventionTaskModalStore.open}
		>
			<Plus />
			<p>Intervenciós feladat hozzáadása</p>
		</button>
		<CreateInterventionTaskModal bind:selected_user bind:createInterventionTaskModalStore />
	</div>
	<DataTable
		data={$intervention_tasks.data}
		{columns}
		modify_mutation={changeInterventionTasksHandlerMutation(data.token)}
		delete_mutation={deleteInterventionTasksMutation(data.token)}
		onClick={async (intervention_task_uuid) => {
			let customer_uuid = await interventionTaskApi({ user_token: data.token }).getCustomerUuid(
				intervention_task_uuid
			);
			goto(`/customers/${customer_uuid}/intervention-tasks/${intervention_task_uuid}`);
		}}
		searchable={true}
		filterable={true}
		sortable={true}
		pageSize={30}
	/>
</div>
