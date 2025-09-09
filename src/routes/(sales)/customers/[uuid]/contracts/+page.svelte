<script>
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import DataTable from '$lib/components/data/DataTable.svelte';
	import customerApi from '$lib/scripts/apis/customer';
	import leadApi from '$lib/scripts/apis/lead';
	import userApi from '$lib/scripts/apis/user';
	import { changeLeadHandlerMutation, deleteLeadMutation } from '$lib/scripts/queries/lead';
	import { createQuery } from '@tanstack/svelte-query';

	let contracts = $derived(
		createQuery({
			queryKey: ['contracts', page.data.token, page.params.uuid],
			queryFn: async () =>
				await customerApi({ user_token: page.data.token }).getContractByUuid(page.params.uuid)
		})
	);

	const columns = [
		{ key: 'action', label: '#' },
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

<section>
	<DataTable
		data={$contracts.data}
		{columns}
		onClick={(lead_uuid) => {
			goto(`contracts/${lead_uuid}`);
		}}
		modify_mutation={changeLeadHandlerMutation(page.data.token)}
		delete_mutation={deleteLeadMutation(page.data.token)}
		modifiable={false}
		searchable={true}
		filterable={true}
		sortable={true}
		pageSize={30}
	/>
</section>
