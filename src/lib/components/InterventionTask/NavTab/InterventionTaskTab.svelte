<script>
	let { intervention_task = $bindable() } = $props();

	const statusTypes = {
		PaymentPromise: 'Fizetési ígéret',
		Processed: 'Elintézett',
		Nonpayment: 'Fizetésmegtagadás',
		PendingDeletion: 'Törlésre vár'
	};

	function handleAnnualFeeInput(event) {
		const input = event.target;
		const isBackspace = event.inputType === 'deleteContentBackward';

		let raw = input.value.replace(/\D/g, '');
		if (isBackspace) {
			raw = raw.slice(0, raw.length - 1);
		}

		let formatted = raw ? formatCurrencyType(raw, 'HUF') : '';
		input.value = formatted;
		intervention_task.balance = formatted;
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
</script>

<div class="grid grid-cols-2 gap-4">
	<div class="flex flex-col text-start font-medium">
		<label for="contract_number">Szerződésszám <span class="text-red-700">*</span></label>
		<input
			name="contract_number"
			id="contract_number"
			type="text"
			bind:value={intervention_task.contract_number}
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
			bind:value={intervention_task.product_name}
			class="mt-1 block w-full rounded-md px-3 py-2 ring-1 ring-black/10 duration-200 focus:ring-blue-600 focus:outline-none"
			autocomplete="off"
			required
		/>
	</div>
</div>
<div class="flex flex-col text-start font-medium">
	<label for="outstanding_days">Kintlévőséges napok száma <span class="text-red-700">*</span></label
	>
	<input
		name="outstanding_days"
		id="outstanding_days"
		type="text"
		bind:value={intervention_task.outstanding_days}
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
		bind:value={intervention_task.balance}
		class="mt-1 block w-full rounded-md px-3 py-2 ring-1 ring-black/10 duration-200 focus:ring-blue-600 focus:outline-none"
		autocomplete="off"
		required
	/>
</div>
<div class="flex flex-col text-start font-medium">
	<label for="processing_deadline">Feldolgozási határidő <span class="text-red-700">*</span></label>
	<input
		name="processing_deadline"
		id="processing_deadline"
		type="datetime-local"
		bind:value={intervention_task.processing_deadline}
		class="mt-1 block w-full rounded-md px-3 py-2 ring-1 ring-black/10 duration-200 focus:ring-blue-600 focus:outline-none"
		autocomplete="off"
		required
	/>
</div>
<div class="flex flex-col text-start font-medium">
	<label for="comment">Megjegyzés</label>
	<input
		name="comment"
		id="comment"
		type="text"
		bind:value={intervention_task.comment}
		class="mt-1 block w-full rounded-md px-3 py-2 ring-1 ring-black/10 duration-200 focus:ring-blue-600 focus:outline-none"
		autocomplete="off"
	/>
</div>
<div class="flex flex-col text-start font-medium">
	<label for="status">Intervenciós feladat státusza <span class="text-red-700">*</span></label>
	<select
		name="status"
		id="status"
		bind:value={intervention_task.status}
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
