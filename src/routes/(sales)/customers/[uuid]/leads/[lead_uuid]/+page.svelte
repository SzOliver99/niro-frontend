<script>
	import { page } from '$app/state';
	import leadApi from '$lib/scripts/apis/lead';
	import { createQuery } from '@tanstack/svelte-query';

	let { data } = $props();

	let lead = createQuery({
		queryKey: ['lead'],
		queryFn: async () => await leadApi({ user_token: data.token }).getByUuid(page.params.lead_uuid)
	});

	function handleSubmit() {
		console.log('WIP');
	}

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

<section class="w-full px-4 py-3">
	{#if $lead.isLoading}
		<p>Ügyfél adatainak betöltése</p>
	{:else if $lead.data}
		<form onsubmit={handleSubmit} class="flex flex-col gap-5 rounded-lg p-3 text-nowrap">
			<div class="grid grid-cols-2 gap-4">
				<div class="flex flex-col text-start font-medium">
					<label for="lead_type">Tevékenység típus <span class="text-red-700">*</span></label>
					<select
						name="lead_type"
						id="lead_type"
						value={$lead.data.lead_type}
						class="mt-1 block w-full rounded-md px-3 py-2 ring-1 ring-black/10 duration-200 focus:ring-blue-600 focus:outline-none"
						autocomplete="off"
						required
					>
						<option value="">Válassz tevékenység típust</option>
						{#each Object.entries(leadTypes) as [key, value]}
							<option value={key}>{value}</option>
						{/each}
					</select>
				</div>
				<div class="flex flex-col text-start font-medium">
					<label for="lead_status">Státusz <span class="text-red-700">*</span></label>
					<select
						name="lead_status"
						id="lead_status"
						value={$lead.data.lead_status}
						class="mt-1 block w-full rounded-md px-3 py-2 ring-1 ring-black/10 duration-200 focus:ring-blue-600 focus:outline-none"
						autocomplete="off"
						required
					>
						<option value="">Válassz státuszt</option>
						{#each Object.entries(statusTypes) as [key, value]}
							<option value={key}>{value}</option>
						{/each}
					</select>
				</div>
			</div>
			<div class="flex flex-col text-start font-medium">
				<label for="inquiry_type">Megkeresés jellege <span class="text-red-700">*</span></label>
				<input
					name="inquiry_type"
					id="inquiry_type"
					type="text"
					value={$lead.data.inquiry_type}
					class="mt-1 block w-full rounded-md px-3 py-2 ring-1 ring-black/10 duration-200 focus:ring-blue-600 focus:outline-none"
					autocomplete="off"
					required
				/>
			</div>

			<!-- Submit Button -->
			<div class="mt-5 flex justify-end">
				<button
					type="submit"
					class="bg-gray justify-center gap-2 rounded-lg bg-blue-600 px-6 py-2 text-white duration-200 hover:bg-blue-700"
					>Változtatások mentése</button
				>
			</div>
		</form>
	{/if}
</section>
