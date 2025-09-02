<script>
	let { lead = $bindable() } = $props();

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

<div class="grid grid-cols-2 gap-4">
	<div class="flex flex-col text-start font-medium">
		<label for="lead_type">Címanyag típus <span class="text-red-700">*</span></label>
		<select
			name="lead_type"
			id="lead_type"
			bind:value={lead.lead_type}
			class="mt-1 block w-full rounded-md px-3 py-2 ring-1 ring-black/10 duration-200 focus:ring-blue-600 focus:outline-none"
			autocomplete="off"
			required
		>
			<option value="">Válassz címanyag típust</option>
			{#each Object.entries(leadTypes) as [key, value]}
				<option value={key}>{value}</option>
			{/each}
		</select>
	</div>
	<div class="flex flex-col text-start font-medium">
		<label for="inquiry_type">Megkeresés jellege <span class="text-red-700">*</span></label>
		<input
			name="inquiry_type"
			id="inquiry_type"
			type="text"
			bind:value={lead.inquiry_type}
			class="mt-1 block w-full rounded-md px-3 py-2 ring-1 ring-black/10 duration-200 focus:ring-blue-600 focus:outline-none"
			autocomplete="off"
			required
		/>
	</div>
</div>
<div class="flex flex-col text-start font-medium">
	<label for="lead_status">Státusz <span class="text-red-700">*</span></label>
	<select
		name="lead_status"
		id="lead_status"
		bind:value={lead.lead_status}
		class="mt-1 block w-full rounded-md px-3 py-2 ring-1 ring-black/10 duration-200 focus:ring-blue-600 focus:outline-none"
		autocomplete="off"
		required
	>
		<option value="">Válassz státust</option>
		{#each Object.entries(statusTypes) as [key, value]}
			<option value={key}>{value}</option>
		{/each}
	</select>
</div>
