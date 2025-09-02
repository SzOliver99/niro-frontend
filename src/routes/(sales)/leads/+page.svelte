<script>
	import DataTable from '$lib/components/data/DataTable.svelte';
	import CreateLeadModal from '$lib/components/Lead/CreateLeadModal.svelte';
	import leadApi from '$lib/scripts/apis/lead.js';
	import userApi from '$lib/scripts/apis/user';
	import { changeLeadHandlerMutation, deleteLeadMutation } from '$lib/scripts/queries/lead.js';
	import { convertUserGroup } from '$lib/scripts/utils';
	import { permissionsStore } from '$lib/stores/permissions';
	import { createSimpleModalStore } from '$lib/stores/user.js';
	import { createQuery } from '@tanstack/svelte-query';
	import { Plus } from 'lucide-svelte';

	let { data } = $props();

	let leadsModalStore = $state(createSimpleModalStore());

	let sub_users = createQuery({
		queryKey: ['sub_users', data.token],
		queryFn: async () => await userApi({ user_token: data.token }).getUserSubUsers()
	});

	let selected_user = $state();
	$effect.pre(() => {
		if ($sub_users.data && $sub_users.data.length > 0) {
			selected_user = $sub_users.data[0].id;
		}
	});

	let leads = $derived(
		createQuery({
			queryKey: ['leads', data.token, selected_user],
			queryFn: async () => await leadApi({ user_token: data.token }).getAllByUserId(selected_user),
			enabled: selected_user !== undefined
		})
	);

	const columns = [
		{ key: 'action', label: '#' },
		{ key: 'name', label: 'Név' },
		{ key: 'phone', label: 'Telefonszám' },
		{ key: 'email', label: 'Email-cím' },
		{ key: 'address', label: 'Lakcím' },
		{ key: 'lead_type', label: 'Címanyag típus', action: (type) => leadTypes[type] },
		{ key: 'inquiry_type', label: 'Megkeresés jellege' },
		{ key: 'lead_status', label: 'Státusz', action: (status) => statusTypes[status] },
		{
			key: 'handle_at',
			label: 'Dátum',
			action: (date) => new Date(date).toLocaleString('hu-HU')
		},
		{ key: 'created_by', label: 'Üzletkötő' }
	];

	const leadTypes = $state({
		personal: 'Személyes kapcsolatrendszer',
		recommendation: 'Ajánlás',
		salesforce: 'Salesforce',
		red_lead: 'Piros címanyag',
		blue_lead: 'Kék címanyag'
	});

	const statusTypes = $state({
		Opened: 'Nyitott',
		InProgress: 'Folyamatban',
		Closed: 'Lezárt'
	});
</script>

<div class="p-4">
	<div class="flex justify-between text-center">
		<div class="flex items-center gap-4">
			<h1 class="text-xl font-semibold">Címanyagok</h1>
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
			onclick={leadsModalStore.open}
		>
			<Plus />
			<p>Címanyag hozzáadása</p>
		</button>
		<CreateLeadModal bind:selected_user bind:leadsModalStore />
	</div>
	<DataTable
		data={$leads.data}
		{columns}
		modify_mutation={changeLeadHandlerMutation(data.token)}
		delete_mutation={deleteLeadMutation(data.token)}
		searchable={true}
		filterable={true}
		sortable={true}
		pageSize={30}
	/>
</div>
