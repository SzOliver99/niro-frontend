<script>
	import { goto } from '$app/navigation';
	import CreateContactModal from '$lib/components/Contract/CreateContactModal.svelte';
	import IsCompletedCell from '$lib/components/Contract/IsCompletedCell.svelte';
	import DataTable from '$lib/components/data/DataTable.svelte';
	import contractApi from '$lib/scripts/apis/contract.js';
	import userApi from '$lib/scripts/apis/user';
	import {
		changeContractHandlerMutation,
		deleteContractMutation
	} from '$lib/scripts/queries/contract.js';
	import { convertUserGroup } from '$lib/scripts/utils';
	import { permissionsStore } from '$lib/stores/permissions';
	import { createSimpleModalStore } from '$lib/stores/user.js';
	import { createQuery } from '@tanstack/svelte-query';
	import { Plus } from 'lucide-svelte';

	let { data } = $props();

	let contractsModalStore = $state(createSimpleModalStore());

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

	let contracts = $derived(
		createQuery({
			queryKey: ['contracts', data.token, selected_user],
			queryFn: async () =>
				await contractApi({ user_token: data.token }).getAllByUserUuid(selected_user),
			enabled: selected_user !== undefined
		})
	);

	const columns = [
		{ key: 'action', label: '#' },
		{ key: 'full_name', label: 'Név' },
		{ key: 'phone_number', label: 'Telefonszám' },
		{ key: 'email', label: 'Email-cím' },
		{ key: 'address', label: 'Lakcím' },
		{ key: 'contract_number', label: 'Szerződés sorozatszáma' },
		{ key: 'contract_type', label: 'Szerződés típus', action: (type) => contractTypes[type] },
		{
			key: 'annual_fee',
			label: 'Éves állománydíj',
			action: (value) =>
				value.toLocaleString('hu-HU', {
					style: 'currency',
					currency: 'HUF',
					minimumFractionDigits: 0,
					maximumFractionDigits: 0
				})
		},
		{ key: 'first_payment', label: 'Első díj befizetve', component: IsCompletedCell },
		{
			key: 'payment_frequency',
			label: 'Fizetési gyakoriság',
			action: (frequency) => paymentFrequencyTypes[frequency]
		},
		{
			key: 'payment_method',
			label: 'Fizetési mód',
			action: (method) => paymentMethodTypes[method]
		},
		{ key: 'created_by', label: 'Üzletkötő neve' },
		{
			key: 'handle_at',
			label: 'Létrehozás/Szerződéskötés dátuma',
			action: (date) => new Date(date).toLocaleString('hu-HU')
		}
	];

	export const contractTypes = {
		BonusLifeProgram: 'Bónusz Életprogram',
		LifeProgram: 'Életprogram',
		AllianzCareNow: 'Allianz Gondoskodás Most',
		HealthProgram: 'Egészségprogram',
		MyhomeHomeInsurance: 'MyHome lakásbiztosítás',
		MfoHomeInsurance: 'MFO lakásbiztosítás',
		CorporatePropertyInsurance: 'Vállalati vagyon biztosítás',
		Kgfb: 'KGFB',
		Casco: 'CASCO',
		TravelInsurance: 'Utasbiztosítás',
		CondominiumInsurance: 'Társasházbiztosítás',
		AgriculturalInsurance: 'Mezőgazdasági biztosítás'
	};
	const paymentFrequencyTypes = {
		Monthly: 'Havi',
		Quarterly: 'Negyedéves',
		Semiannual: 'Féléves',
		Annual: 'Éves'
	};
	const paymentMethodTypes = {
		CreditCard: 'Bankkártya',
		Transfer: 'Átutalás',
		DirectDebit: 'Lehívás',
		Check: 'Csekk'
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
					<option value={user.uuid}
						>{user.info?.full_name} - {convertUserGroup(user.user_role)}</option
					>
				{/each}
			</select>
		</div>
		<button
			class="bg-gray me-4 flex items-center rounded-lg bg-blue-600 px-3 py-2 text-center text-nowrap text-white duration-200 hover:bg-blue-700"
			onclick={contractsModalStore.open}
		>
			<Plus />
			<p>Szerződés hozzáadása</p>
		</button>
		<CreateContactModal bind:selected_user bind:contractsModalStore />
	</div>
	<DataTable
		data={$contracts.data}
		{columns}
		onClick={async (contract_uuid) => {
			let customer_uuid = await contractApi({ user_token: data.token }).getCustomerUuid(
				contract_uuid
			);
			goto(`/customers/${customer_uuid}/contracts/${contract_uuid}`);
		}}
		modify_mutation={changeContractHandlerMutation(data.token)}
		delete_mutation={deleteContractMutation(data.token)}
		searchable={true}
		filterable={true}
		sortable={true}
		pageSize={30}
	/>
</div>
