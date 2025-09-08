<script>
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import DataTable from '$lib/components/data/DataTable.svelte';
	import customerApi from '$lib/scripts/apis/customer';
	import leadApi from '$lib/scripts/apis/lead';
	import userApi from '$lib/scripts/apis/user';
	import { changeLeadHandlerMutation, deleteLeadMutation } from '$lib/scripts/queries/lead';
	import { createQuery } from '@tanstack/svelte-query';

	let leads = $derived(
		createQuery({
			queryKey: ['leads', page.data.token, page.params.uuid],
			queryFn: async () =>
				await customerApi({ user_token: page.data.token }).getLeadsByUuid(page.params.uuid)
		})
	);

	const columns = [
		{ key: 'action', label: '#' },
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
		Personal: 'Személyes kapcsolatrendszer',
		Recommendation: 'Ajánlás',
		Salesforce: 'Salesforce',
		RedLead: 'Piros címanyag',
		BlueLead: 'Kék címanyag'
	});
	const statusTypes = $state({
		Opened: 'Nyitott',
		InProgress: 'Folyamatban',
		Closed: 'Lezárt'
	});
</script>

<section>
	<DataTable
		data={$leads.data}
		{columns}
		onClick={(lead_uuid) => {
			goto(`leads/${lead_uuid}`);
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
