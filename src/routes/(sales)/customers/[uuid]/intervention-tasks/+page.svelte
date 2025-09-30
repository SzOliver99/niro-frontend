<script>
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import DataTable from '$lib/components/data/DataTable.svelte';
	import customerApi from '$lib/scripts/apis/customer';
	import { changeLeadHandlerMutation, deleteLeadMutation } from '$lib/scripts/queries/lead';
	import { createQuery } from '@tanstack/svelte-query';

	let intervention_tasks = $derived(
		createQuery({
			queryKey: ['contracts', page.data.token, page.params.uuid],
			queryFn: async () =>
				await customerApi({ user_token: page.data.token }).getInterventionTasksByUuid(
					page.params.uuid
				)
		})
	);

	const columns = [
		{ key: 'action', label: '#' },
		{ key: 'contract_number', label: 'Szerződés szám' },
		{ key: 'product_name', label: 'Termék neve' },
		{ key: 'outstanding_days', label: 'Kintlévőséges napok száma' },
		{
			key: 'balance',
			label: 'Egyenleg',
			action: (value) =>
				value?.toLocaleString('hu-HU', {
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

<section>
	<DataTable
		data={$intervention_tasks.data}
		{columns}
		onClick={(lead_uuid) => {
			goto(`intervention-tasks/${lead_uuid}`);
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
