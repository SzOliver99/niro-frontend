<script>
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import interventionTaskApi from '$lib/scripts/apis/intervention_task.js';
	import { modifyContractMutation } from '$lib/scripts/queries/contract.js';
	import { modifyInterventionTaskMutation } from '$lib/scripts/queries/intervention_task.js';
	import { modifyLeadMutation } from '$lib/scripts/queries/lead';
	import { Notification } from '$lib/stores/notifications';
	import { createQuery } from '@tanstack/svelte-query';

	let { data } = $props();

	let intervention_task = createQuery({
		queryKey: ['intervention-task'],
		queryFn: async () =>
			await interventionTaskApi({ user_token: data.token }).getByUuid(
				page.params.intervention_task_uuid
			)
	});

	const modifyInterventionTask = modifyInterventionTaskMutation(data.token);
	function handleSubmit() {
		let modified_intervention_task = {
			contract_number: contract_number.value,
			product_name: product_name.value,
			outstanding_days: +outstanding_days.value,
			balance: +balance.value,
			processing_deadline: `${processing_deadline.value}:00`,
			comment: comment.value,
			status: task_status.value
		};

		$modifyInterventionTask.mutate(
			{
				intervention_task_uuid: page.params.intervention_task_uuid,
				intervention_task: modified_intervention_task
			},
			{
				onSuccess: (data) => {
					Notification.success(data, 3);
					let url = page.url.pathname.split('/').filter(Boolean);
					url.pop();
					goto(`/${url.join('/')}`);
				}
			}
		);
	}

	function handleAnnualFeeInput(event) {
		const input = event.target;
		const isBackspace = event.inputType === 'deleteContentBackward';

		let raw = input.value.replace(/\D/g, '');
		if (isBackspace) {
			raw = raw.slice(0, raw.length - 1);
		}

		let formatted = raw ? formatCurrencyType(raw, 'HUF') : '';
		input.value = formatted;
	}

	function formatCurrencyType(value, currencyType) {
		let numericValue = value.replace(/\D/g, '');
		if (numericValue) {
			numericValue = parseInt(numericValue, 10).toLocaleString('hu-HU', {
				style: 'currency',
				currency: currencyType,
				minimumFractionDigits: 0,
				maximumFractionDigits: 0
			});
		}
		return numericValue;
	}

	const statusTypes = {
		PaymentPromise: 'Fizetési ígéret',
		Processed: 'Elintézett',
		Nonpayment: 'Fizetésmegtagadás',
		PendingDeletion: 'Törlésre vár'
	};
</script>

<section class="w-full px-4 py-3">
	{#if $intervention_task.isLoading}
		<p>Szerződés adatainak betöltése</p>
	{:else if $intervention_task.data}
		<form onsubmit={handleSubmit} class="flex flex-col gap-5 rounded-lg p-3 text-nowrap">
			<div class="grid grid-cols-2 gap-4">
				<div class="flex flex-col text-start font-medium">
					<label for="contract_number">Szerződés Szám <span class="text-red-700">*</span></label>
					<input
						name="contract_number"
						id="contract_number"
						type="text"
						value={$intervention_task.data.contract_number}
						class="mt-1 block w-full rounded-md px-3 py-2 ring-1 ring-black/10 duration-200 focus:ring-blue-600 focus:outline-none"
						autocomplete="off"
						required
					/>
				</div>
				<div class="flex flex-col text-start font-medium">
					<label for="product_name">Termék neve <span class="text-red-700">*</span></label>
					<input
						name="product_name"
						id="product_name"
						type="text"
						value={$intervention_task.data.product_name}
						class="mt-1 block w-full rounded-md px-3 py-2 ring-1 ring-black/10 duration-200 focus:ring-blue-600 focus:outline-none"
						autocomplete="off"
						required
					/>
				</div>
			</div>
			<div class="flex flex-col text-start font-medium">
				<label for="outstanding_days"
					>Kintlévőséges napok száma <span class="text-red-700">*</span></label
				>
				<input
					name="outstanding_days"
					id="outstanding_days"
					type="text"
					value={$intervention_task.data.outstanding_days}
					class="mt-1 block w-full rounded-md px-3 py-2 ring-1 ring-black/10 duration-200 focus:ring-blue-600 focus:outline-none"
					autocomplete="off"
					required
				/>
			</div>
			<div class="flex flex-col text-start font-medium">
				<label for="balance">Egyenleg <span class="text-red-700">*</span></label>
				<input
					name="balance"
					id="balance"
					type="text"
					oninput={handleAnnualFeeInput}
					value={$intervention_task.data.balance}
					class="mt-1 block w-full rounded-md px-3 py-2 ring-1 ring-black/10 duration-200 focus:ring-blue-600 focus:outline-none"
					autocomplete="off"
					required
				/>
			</div>
			<div class="flex flex-col text-start font-medium">
				<label for="processing_deadline"
					>Feldolgozási határidő <span class="text-red-700">*</span></label
				>
				<input
					name="processing_deadline"
					id="processing_deadline"
					type="datetime-local"
					value={$intervention_task.data.processing_deadline}
					class="mt-1 block w-full rounded-md px-3 py-2 ring-1 ring-black/10 duration-200 focus:ring-blue-600 focus:outline-none"
					autocomplete="off"
					required
				/>
			</div>
			<div class="flex flex-col text-start font-medium">
				<label for="comment">Megjegyzés <span class="text-red-700">*</span></label>
				<input
					name="comment"
					id="comment"
					type="text"
					value={$intervention_task.data.comment}
					class="mt-1 block w-full rounded-md px-3 py-2 ring-1 ring-black/10 duration-200 focus:ring-blue-600 focus:outline-none"
					autocomplete="off"
					required
				/>
			</div>
			<div class="flex flex-col text-start font-medium">
				<label for="task_status"
					>Intervenciós feladat státusza <span class="text-red-700">*</span></label
				>
				<select
					name="task_status"
					id="task_status"
					value={$intervention_task.data.status}
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
