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
		{ key: 'full_name', label: 'Név' },
		{ key: 'phone_number', label: 'Telefonszám' },
		{ key: 'email', label: 'Email' },
		{ key: 'address', label: 'Lakcím' },
		{ key: 'contract_type', label: 'Szerződés típus' },
		{ key: 'annual_fee', label: 'Éves állománydíj' },
		{ key: 'payment_frequency', label: 'Fizetési gyakoriság' },
		{ key: 'payment_method', label: 'Fizetési mód' },
		{ key: 'user_id', label: 'Üzletkötő neve', action: (user_id) => user_id },
		{ key: 'contract_date', label: 'Létrehozás/Szerződéskötés dátuma' }
	];

	const contractTypes = {
		bonus_life_program: 'Bónusz Életprogram',
		life_program: 'Életprogram',
		allianz_care_now: 'Allianz Gondoskodás Most',
		health_program: 'Egészségprogram',
		myhome_home_insurance: 'MyHome lakásbiztosítás',
		mfo_home_insurance: 'MFO lakásbiztosítás',
		corporate_property_insurance: 'Vállalati vagyon biztosítás',
		kgfb: 'KGFB',
		casco: 'CASCO',
		travel_insurance: 'Utasbiztosítás',
		condominium_insurance: 'Társasházbiztosítás',
		agricultural_insurance: 'Mezőgazdasági biztosítás'
	};

	const paymentFrequencyTypes = {
		monthly: 'Havi',
		quarterly: 'Negyedéves',
		semiannual: 'Féléves',
		annual: 'Éves'
	};
	const paymentMethodTypes = {
		card: 'Bankkártya',
		transfer: 'Átutalás',
		direct_debit: 'Lehívás',
		check: 'Csekk'
	};

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
			<h1 class="text-xl font-semibold">Szerződések</h1>
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
			<p>Szerződés hozzáadása</p>
		</button>
	</div>
	<DataTable
		user_data={[]}
		{columns}
		searchable={true}
		filterable={true}
		sortable={true}
		pageSize={30}
	/>
</div>
