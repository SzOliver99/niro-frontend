<script>
	import DataTable from '$lib/components/data/DataTable.svelte';
	import customerApi from '$lib/scripts/apis/customer';
	import userApi from '$lib/scripts/apis/user';
	import { convertUserGroup } from '$lib/scripts/utils.js';
	import { permissionsStore } from '$lib/stores/permissions.js';
	import { createQuery } from '@tanstack/svelte-query';
	import { Plus } from 'lucide-svelte';

	const { data } = $props();

	let sub_users = createQuery({
		queryKey: ['sub_users', data.token],
		queryFn: async () => await userApi().getUserSubUsers(data.token)
	});

	let selected_user = $state();
	$effect.pre(() => {
		if ($sub_users.data && $sub_users.data.length > 0) {
			selected_user = $sub_users.data[0].id;
		}
	});

	let customers = $derived(
		createQuery({
			queryKey: ['customers', data.token, selected_user],
			queryFn: async () => await customerApi().getAllById(data.token, selected_user),
			enabled: selected_user !== undefined
		})
	);

	const columns = [
		{ key: 'action', label: '#' },
		{ key: 'full_name', label: 'Név' },
		{ key: 'phone_number', label: 'Telefonszám' },
		{ key: 'email', label: 'Email' },
		{ key: 'address', label: 'Lakcím' },
		{ key: 'user_id', label: 'Üzletkötő', action: (user_id) => user_id }
	];
</script>

<div class="p-4">
	<div class="mb-1 flex justify-between">
		<div class="flex items-center gap-4">
			<h1 class="text-xl font-semibold">Ügyfelek</h1>
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
			<p>Ügyfél hozzáadása</p>
		</button>
	</div>
	<DataTable
		data={$customers.data}
		{columns}
		searchable={true}
		filterable={true}
		sortable={true}
		pageSize={30}
	/>
</div>
