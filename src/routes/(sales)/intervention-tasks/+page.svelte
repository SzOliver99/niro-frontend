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
		{ key: 'contract_number', label: 'Szerződés szám' },
		{ key: 'product_name', label: 'Termék neve' },
		{ key: 'partner_name', label: 'Partner neve' },
		{ key: 'partner_address', label: 'Partner címe' },
		{ key: 'partner_phone', label: 'Partner telefonszáma' },
		{ key: 'partner_email', label: 'Partner emailcíme' },
		{ key: 'outstanding_days', label: 'Kintlévőséges napok száma' },
		{ key: 'balance', label: 'Egyenleg' },
		{ key: 'processing_deadline', label: 'Feldolgozási határidő' },
		{ key: 'note', label: 'Megjegyzés' },
		{ key: 'status', label: 'Státusz' },
		{ key: 'user_id', label: 'Üzletkötő', action: (user_id) => user_id }
	];

	const statusTypes = {
		payment_promise: 'Fizetési ígéret',
		processed: 'Elintézett',
		nonpayment: 'Fizetésmegtagadás',
		pending_deletion: 'Törlésre vár'
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
			<p>Intervenciós feladat hozzáadása</p>
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
