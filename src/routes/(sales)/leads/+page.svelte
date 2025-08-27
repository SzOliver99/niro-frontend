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
		queryFn: async () => await userApi().getUserSubUsers(data.token)
	});

	let selected_user = $state();

	const columns = [
		{ key: 'action', label: '#' },
		{ key: 'name', label: 'Név' },
		{ key: 'phone', label: 'Telefonszám' },
		{ key: 'email', label: 'Email-cím' },
		{ key: 'address', label: 'Lakcím' },
		{ key: 'leadType', label: 'Címanyag típus' },
		{ key: 'inquiryType', label: 'Megkeresés jellege' },
		{ key: 'leadStatus', label: 'Státusz' },
		{ key: 'handleAt', label: 'Dátum' },
		{ key: 'userModify', label: 'Üzletkötő' }
	];

	const leadTypes = {
		personal: 'Személyes kapcsolatrendszer',
		recommendation: 'Ajánlás',
		salesforce: 'Salesforce',
		red_lead: 'Piros címanyag',
		blue_lead: 'Kék címanyag'
	};

	const statusTypes = {
		opened: 'Nyitott',
		onprogress: 'Folyamatban',
		closed: 'Lezárt'
	};

	const user_data = [
		{
			id: 1,
			name: 'Alice Johnson',
			phone: '+36 30 123 4567',
			email: 'alice@example.com',
			address: 'Budapest, Fő utca 1.',
			leadType:
				Object.entries(leadTypes)[Math.floor(Math.random() * Object.entries(leadTypes).length)][1],
			inquiryType: 'Árajánlat',
			status:
				Object.entries(statusTypes)[
					Math.floor(Math.random() * Object.entries(statusTypes).length)
				][1],
			handleAt: '2025-08-01'
		},
		{
			id: 2,
			name: 'Bob Smith',
			phone: '+36 20 234 5678',
			email: 'bob@example.com',
			address: 'Debrecen, Kossuth tér 2.',
			leadType:
				Object.entries(leadTypes)[Math.floor(Math.random() * Object.entries(leadTypes).length)][1],
			inquiryType: 'Kapcsolatfelvétel',
			status:
				Object.entries(statusTypes)[
					Math.floor(Math.random() * Object.entries(statusTypes).length)
				][1],
			handleAt: '2025-08-02'
		},
		{
			id: 3,
			name: 'Carol Davis',
			phone: '+36 70 345 6789',
			email: 'carol@example.com',
			address: 'Szeged, Dóm tér 3.',
			leadType:
				Object.entries(leadTypes)[Math.floor(Math.random() * Object.entries(leadTypes).length)][1],
			inquiryType: 'Árajánlat',
			status:
				Object.entries(statusTypes)[
					Math.floor(Math.random() * Object.entries(statusTypes).length)
				][1],
			handleAt: '2025-08-03'
		},
		{
			id: 4,
			name: 'Daniel Lee',
			phone: '+36 30 456 7890',
			email: 'daniel@example.com',
			address: 'Győr, Baross út 4.',
			leadType:
				Object.entries(leadTypes)[Math.floor(Math.random() * Object.entries(leadTypes).length)][1],
			inquiryType: 'Kapcsolatfelvétel',
			status:
				Object.entries(statusTypes)[
					Math.floor(Math.random() * Object.entries(statusTypes).length)
				][1],
			handleAt: '2025-08-04'
		},
		{
			id: 5,
			name: 'Eva Brown',
			phone: '+36 20 567 8901',
			email: 'eva@example.com',
			address: 'Pécs, Király utca 5.',
			leadType:
				Object.entries(leadTypes)[Math.floor(Math.random() * Object.entries(leadTypes).length)][1],
			inquiryType: 'Árajánlat',
			status:
				Object.entries(statusTypes)[
					Math.floor(Math.random() * Object.entries(statusTypes).length)
				][1],
			handleAt: '2025-08-05'
		},
		{
			id: 6,
			name: 'Frank Wilson',
			phone: '+36 70 678 9012',
			email: 'frank@example.com',
			address: 'Miskolc, Szent István tér 6.',
			leadType:
				Object.entries(leadTypes)[Math.floor(Math.random() * Object.entries(leadTypes).length)][1],
			inquiryType: 'Kapcsolatfelvétel',
			status:
				Object.entries(statusTypes)[
					Math.floor(Math.random() * Object.entries(statusTypes).length)
				][1],
			handleAt: '2025-08-06'
		},
		{
			id: 7,
			name: 'Grace Miller',
			phone: '+36 30 789 0123',
			email: 'grace@example.com',
			address: 'Székesfehérvár, Piac tér 7.',
			leadType:
				Object.entries(leadTypes)[Math.floor(Math.random() * Object.entries(leadTypes).length)][1],
			inquiryType: 'Árajánlat',
			status: 'Contacted',
			handleAt: '2025-08-07'
		},
		{
			id: 8,
			name: 'Henry Taylor',
			phone: '+36 20 890 1234',
			email: 'henry@example.com',
			address: 'Eger, Dobó tér 8.',
			leadType:
				Object.entries(leadTypes)[Math.floor(Math.random() * Object.entries(leadTypes).length)][1],
			inquiryType: 'Kapcsolatfelvétel',
			status:
				Object.entries(statusTypes)[
					Math.floor(Math.random() * Object.entries(statusTypes).length)
				][1],
			handleAt: '2025-08-08'
		},
		{
			id: 9,
			name: 'Isla Anderson',
			phone: '+36 70 901 2345',
			email: 'isla@example.com',
			address: 'Veszprém, Óváros tér 9.',
			leadType:
				Object.entries(leadTypes)[Math.floor(Math.random() * Object.entries(leadTypes).length)][1],
			inquiryType: 'Árajánlat',
			status: 'New',
			handleAt: '2025-08-09'
		},
		{
			id: 10,
			name: 'Jack Thomas',
			phone: '+36 30 012 3456',
			email: 'jack@example.com',
			address: 'Kecskemét, Kossuth tér 10.',
			leadType:
				Object.entries(leadTypes)[Math.floor(Math.random() * Object.entries(leadTypes).length)][1],
			inquiryType: 'Kapcsolatfelvétel',
			status:
				Object.entries(statusTypes)[
					Math.floor(Math.random() * Object.entries(statusTypes).length)
				][1],
			handleAt: '2025-08-10'
		},
		{
			id: 11,
			name: 'Karen Moore',
			phone: '+36 20 123 4567',
			email: 'karen@example.com',
			address: 'Zalaegerszeg, Dísz tér 11.',
			leadType:
				Object.entries(leadTypes)[Math.floor(Math.random() * Object.entries(leadTypes).length)][1],
			inquiryType: 'Árajánlat',
			status:
				Object.entries(statusTypes)[
					Math.floor(Math.random() * Object.entries(statusTypes).length)
				][1],
			handleAt: '2025-08-11'
		},
		{
			id: 12,
			name: 'Liam Martin',
			phone: '+36 70 234 5678',
			email: 'liam@example.com',
			address: 'Sopron, Várkerület 12.',
			leadType:
				Object.entries(leadTypes)[Math.floor(Math.random() * Object.entries(leadTypes).length)][1],
			inquiryType: 'Kapcsolatfelvétel',
			status:
				Object.entries(statusTypes)[
					Math.floor(Math.random() * Object.entries(statusTypes).length)
				][1],
			handleAt: '2025-08-12'
		},
		{
			id: 12,
			name: 'Liam Martin',
			phone: '+36 70 234 5678',
			email: 'liam@example.com',
			address: 'Sopron, Várkerület 12.',
			leadType:
				Object.entries(leadTypes)[Math.floor(Math.random() * Object.entries(leadTypes).length)][1],
			inquiryType: 'Kapcsolatfelvétel',
			status:
				Object.entries(statusTypes)[
					Math.floor(Math.random() * Object.entries(statusTypes).length)
				][1],
			handleAt: '2025-08-12'
		},
		{
			id: 12,
			name: 'Liam Martin',
			phone: '+36 70 234 5678',
			email: 'liam@example.com',
			address: 'Sopron, Várkerület 12.',
			leadType:
				Object.entries(leadTypes)[Math.floor(Math.random() * Object.entries(leadTypes).length)][1],
			inquiryType: 'Kapcsolatfelvétel',
			status:
				Object.entries(statusTypes)[
					Math.floor(Math.random() * Object.entries(statusTypes).length)
				][1],
			handleAt: '2025-08-12'
		},
		{
			id: 12,
			name: 'Liam Martin',
			phone: '+36 70 234 5678',
			email: 'liam@example.com',
			address: 'Sopron, Várkerület 12.',
			leadType:
				Object.entries(leadTypes)[Math.floor(Math.random() * Object.entries(leadTypes).length)][1],
			inquiryType: 'Kapcsolatfelvétel',
			status:
				Object.entries(statusTypes)[
					Math.floor(Math.random() * Object.entries(statusTypes).length)
				][1],
			handleAt: '2025-08-12'
		},
		{
			id: 12,
			name: 'Liam Martin',
			phone: '+36 70 234 5678',
			email: 'liam@example.com',
			address: 'Sopron, Várkerület 12.',
			leadType:
				Object.entries(leadTypes)[Math.floor(Math.random() * Object.entries(leadTypes).length)][1],
			inquiryType: 'Kapcsolatfelvétel',
			status:
				Object.entries(statusTypes)[
					Math.floor(Math.random() * Object.entries(statusTypes).length)
				][1],
			handleAt: '2025-08-12'
		},
		{
			id: 12,
			name: 'Liam Martin',
			phone: '+36 70 234 5678',
			email: 'liam@example.com',
			address: 'Sopron, Várkerület 12.',
			leadType:
				Object.entries(leadTypes)[Math.floor(Math.random() * Object.entries(leadTypes).length)][1],
			inquiryType: 'Kapcsolatfelvétel',
			status:
				Object.entries(statusTypes)[
					Math.floor(Math.random() * Object.entries(statusTypes).length)
				][1],
			handleAt: '2025-08-12'
		},
		{
			id: 12,
			name: 'Liam Martin',
			phone: '+36 70 234 5678',
			email: 'liam@example.com',
			address: 'Sopron, Várkerület 12.',
			leadType:
				Object.entries(leadTypes)[Math.floor(Math.random() * Object.entries(leadTypes).length)][1],
			inquiryType: 'Kapcsolatfelvétel',
			status:
				Object.entries(statusTypes)[
					Math.floor(Math.random() * Object.entries(statusTypes).length)
				][1],
			handleAt: '2025-08-12'
		},
		{
			id: 12,
			name: 'Liam Martin',
			phone: '+36 70 234 5678',
			email: 'liam@example.com',
			address: 'Sopron, Várkerület 12.',
			leadType:
				Object.entries(leadTypes)[Math.floor(Math.random() * Object.entries(leadTypes).length)][1],
			inquiryType: 'Kapcsolatfelvétel',
			status:
				Object.entries(statusTypes)[
					Math.floor(Math.random() * Object.entries(statusTypes).length)
				][1],
			handleAt: '2025-08-12'
		},
		{
			id: 12,
			name: 'Liam Martin',
			phone: '+36 70 234 5678',
			email: 'liam@example.com',
			address: 'Sopron, Várkerület 12.',
			leadType:
				Object.entries(leadTypes)[Math.floor(Math.random() * Object.entries(leadTypes).length)][1],
			inquiryType: 'Kapcsolatfelvétel',
			status:
				Object.entries(statusTypes)[
					Math.floor(Math.random() * Object.entries(statusTypes).length)
				][1],
			handleAt: '2025-08-12'
		},
		{
			id: 12,
			name: 'Liam Martin',
			phone: '+36 70 234 5678',
			email: 'liam@example.com',
			address: 'Sopron, Várkerület 12.',
			leadType:
				Object.entries(leadTypes)[Math.floor(Math.random() * Object.entries(leadTypes).length)][1],
			inquiryType: 'Kapcsolatfelvétel',
			status:
				Object.entries(statusTypes)[
					Math.floor(Math.random() * Object.entries(statusTypes).length)
				][1],
			handleAt: '2025-08-12'
		},
		{
			id: 12,
			name: 'Liam Martin',
			phone: '+36 70 234 5678',
			email: 'liam@example.com',
			address: 'Sopron, Várkerület 12.',
			leadType:
				Object.entries(leadTypes)[Math.floor(Math.random() * Object.entries(leadTypes).length)][1],
			inquiryType: 'Kapcsolatfelvétel',
			status:
				Object.entries(statusTypes)[
					Math.floor(Math.random() * Object.entries(statusTypes).length)
				][1],
			handleAt: '2025-08-12'
		},
		{
			id: 12,
			name: 'Liam Martin',
			phone: '+36 70 234 5678',
			email: 'liam@example.com',
			address: 'Sopron, Várkerület 12.',
			leadType:
				Object.entries(leadTypes)[Math.floor(Math.random() * Object.entries(leadTypes).length)][1],
			inquiryType: 'Kapcsolatfelvétel',
			status:
				Object.entries(statusTypes)[
					Math.floor(Math.random() * Object.entries(statusTypes).length)
				][1],
			handleAt: '2025-08-12'
		},
		{
			id: 12,
			name: 'Liam Martin',
			phone: '+36 70 234 5678',
			email: 'liam@example.com',
			address: 'Sopron, Várkerület 12.',
			leadType:
				Object.entries(leadTypes)[Math.floor(Math.random() * Object.entries(leadTypes).length)][1],
			inquiryType: 'Kapcsolatfelvétel',
			status:
				Object.entries(statusTypes)[
					Math.floor(Math.random() * Object.entries(statusTypes).length)
				][1],
			handleAt: '2025-08-12'
		},
		{
			id: 12,
			name: 'Liam Martin',
			phone: '+36 70 234 5678',
			email: 'liam@example.com',
			address: 'Sopron, Várkerület 12.',
			leadType:
				Object.entries(leadTypes)[Math.floor(Math.random() * Object.entries(leadTypes).length)][1],
			inquiryType: 'Kapcsolatfelvétel',
			status:
				Object.entries(statusTypes)[
					Math.floor(Math.random() * Object.entries(statusTypes).length)
				][1],
			handleAt: '2025-08-12'
		},
		{
			id: 12,
			name: 'Liam Martin',
			phone: '+36 70 234 5678',
			email: 'liam@example.com',
			address: 'Sopron, Várkerület 12.',
			leadType:
				Object.entries(leadTypes)[Math.floor(Math.random() * Object.entries(leadTypes).length)][1],
			inquiryType: 'Kapcsolatfelvétel',
			status:
				Object.entries(statusTypes)[
					Math.floor(Math.random() * Object.entries(statusTypes).length)
				][1],
			handleAt: '2025-08-12'
		},
		{
			id: 12,
			name: 'Liam Martin',
			phone: '+36 70 234 5678',
			email: 'liam@example.com',
			address: 'Sopron, Várkerület 12.',
			leadType:
				Object.entries(leadTypes)[Math.floor(Math.random() * Object.entries(leadTypes).length)][1],
			inquiryType: 'Kapcsolatfelvétel',
			status:
				Object.entries(statusTypes)[
					Math.floor(Math.random() * Object.entries(statusTypes).length)
				][1],
			handleAt: '2025-08-12'
		},
		{
			id: 12,
			name: 'Liam Martin',
			phone: '+36 70 234 5678',
			email: 'liam@example.com',
			address: 'Sopron, Várkerület 12.',
			leadType:
				Object.entries(leadTypes)[Math.floor(Math.random() * Object.entries(leadTypes).length)][1],
			inquiryType: 'Kapcsolatfelvétel',
			status:
				Object.entries(statusTypes)[
					Math.floor(Math.random() * Object.entries(statusTypes).length)
				][1],
			handleAt: '2025-08-12'
		},
		{
			id: 12,
			name: 'Liam Martin',
			phone: '+36 70 234 5678',
			email: 'liam@example.com',
			address: 'Sopron, Várkerület 12.',
			leadType:
				Object.entries(leadTypes)[Math.floor(Math.random() * Object.entries(leadTypes).length)][1],
			inquiryType: 'Kapcsolatfelvétel',
			status:
				Object.entries(statusTypes)[
					Math.floor(Math.random() * Object.entries(statusTypes).length)
				][1],
			handleAt: '2025-08-12'
		},
		{
			id: 12,
			name: 'Liam Martin',
			phone: '+36 70 234 5678',
			email: 'liam@example.com',
			address: 'Sopron, Várkerület 12.',
			leadType:
				Object.entries(leadTypes)[Math.floor(Math.random() * Object.entries(leadTypes).length)][1],
			inquiryType: 'Kapcsolatfelvétel',
			status:
				Object.entries(statusTypes)[
					Math.floor(Math.random() * Object.entries(statusTypes).length)
				][1],
			handleAt: '2025-08-12'
		},
		{
			id: 12,
			name: 'Liam Martin',
			phone: '+36 70 234 5678',
			email: 'liam@example.com',
			address: 'Sopron, Várkerület 12.',
			leadType:
				Object.entries(leadTypes)[Math.floor(Math.random() * Object.entries(leadTypes).length)][1],
			inquiryType: 'Kapcsolatfelvétel',
			status:
				Object.entries(statusTypes)[
					Math.floor(Math.random() * Object.entries(statusTypes).length)
				][1],
			handleAt: '2025-08-12'
		},
		{
			id: 12,
			name: 'Liam Martin',
			phone: '+36 70 234 5678',
			email: 'liam@example.com',
			address: 'Sopron, Várkerület 12.',
			leadType:
				Object.entries(leadTypes)[Math.floor(Math.random() * Object.entries(leadTypes).length)][1],
			inquiryType: 'Kapcsolatfelvétel',
			status:
				Object.entries(statusTypes)[
					Math.floor(Math.random() * Object.entries(statusTypes).length)
				][1],
			handleAt: '2025-08-12'
		},
		{
			id: 12,
			name: 'Liam Martin',
			phone: '+36 70 234 5678',
			email: 'liam@example.com',
			address: 'Sopron, Várkerület 12.',
			leadType:
				Object.entries(leadTypes)[Math.floor(Math.random() * Object.entries(leadTypes).length)][1],
			inquiryType: 'Kapcsolatfelvétel',
			status:
				Object.entries(statusTypes)[
					Math.floor(Math.random() * Object.entries(statusTypes).length)
				][1],
			handleAt: '2025-08-12'
		},
		{
			id: 12,
			name: 'Liam Martin',
			phone: '+36 70 234 5678',
			email: 'liam@example.com',
			address: 'Sopron, Várkerület 12.',
			leadType:
				Object.entries(leadTypes)[Math.floor(Math.random() * Object.entries(leadTypes).length)][1],
			inquiryType: 'Kapcsolatfelvétel',
			status:
				Object.entries(statusTypes)[
					Math.floor(Math.random() * Object.entries(statusTypes).length)
				][1],
			handleAt: '2025-08-12'
		},
		{
			id: 12,
			name: 'Liam Martin',
			phone: '+36 70 234 5678',
			email: 'liam@example.com',
			address: 'Sopron, Várkerület 12.',
			leadType:
				Object.entries(leadTypes)[Math.floor(Math.random() * Object.entries(leadTypes).length)][1],
			inquiryType: 'Kapcsolatfelvétel',
			status:
				Object.entries(statusTypes)[
					Math.floor(Math.random() * Object.entries(statusTypes).length)
				][1],
			handleAt: '2025-08-12'
		},
		{
			id: 12,
			name: 'Liam Martin',
			phone: '+36 70 234 5678',
			email: 'liam@example.com',
			address: 'Sopron, Várkerület 12.',
			leadType:
				Object.entries(leadTypes)[Math.floor(Math.random() * Object.entries(leadTypes).length)][1],
			inquiryType: 'Kapcsolatfelvétel',
			status:
				Object.entries(statusTypes)[
					Math.floor(Math.random() * Object.entries(statusTypes).length)
				][1],
			handleAt: '2025-08-12'
		},
		{
			id: 12,
			name: 'Liam Martin',
			phone: '+36 70 234 5678',
			email: 'liam@example.com',
			address: 'Sopron, Várkerület 12.',
			leadType:
				Object.entries(leadTypes)[Math.floor(Math.random() * Object.entries(leadTypes).length)][1],
			inquiryType: 'Kapcsolatfelvétel',
			status:
				Object.entries(statusTypes)[
					Math.floor(Math.random() * Object.entries(statusTypes).length)
				][1],
			handleAt: '2025-08-12'
		},
		{
			id: 12,
			name: 'Liam Martin',
			phone: '+36 70 234 5678',
			email: 'liam@example.com',
			address: 'Sopron, Várkerület 12.',
			leadType:
				Object.entries(leadTypes)[Math.floor(Math.random() * Object.entries(leadTypes).length)][1],
			inquiryType: 'Kapcsolatfelvétel',
			status:
				Object.entries(statusTypes)[
					Math.floor(Math.random() * Object.entries(statusTypes).length)
				][1],
			handleAt: '2025-08-12'
		},
		{
			id: 12,
			name: 'Liam Martin',
			phone: '+36 70 234 5678',
			email: 'liam@example.com',
			address: 'Sopron, Várkerület 12.',
			leadType:
				Object.entries(leadTypes)[Math.floor(Math.random() * Object.entries(leadTypes).length)][1],
			inquiryType: 'Kapcsolatfelvétel',
			status:
				Object.entries(statusTypes)[
					Math.floor(Math.random() * Object.entries(statusTypes).length)
				][1],
			handleAt: '2025-08-12'
		},
		{
			id: 12,
			name: 'Liam Martin',
			phone: '+36 70 234 5678',
			email: 'liam@example.com',
			address: 'Sopron, Várkerület 12.',
			leadType:
				Object.entries(leadTypes)[Math.floor(Math.random() * Object.entries(leadTypes).length)][1],
			inquiryType: 'Kapcsolatfelvétel',
			status:
				Object.entries(statusTypes)[
					Math.floor(Math.random() * Object.entries(statusTypes).length)
				][1],
			handleAt: '2025-08-12'
		}
	];
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
		>
			<Plus />
			<p>Címanyag hozzáadása</p>
		</button>
	</div>
	<DataTable
		{user_data}
		{columns}
		searchable={true}
		filterable={true}
		sortable={true}
		pageSize={30}
	/>
</div>
