<script>
	import { formatNumberOnly } from '$lib/scripts/utils';

	let { contract = $bindable() } = $props();

	const contractTypes = {
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

	function handleAnnualFeeInput(event) {
		const input = event.target;
		const isBackspace = event.inputType === 'deleteContentBackward';

		let raw = input.value.replace(/\D/g, '');
		if (isBackspace) {
			raw = raw.slice(0, raw.length - 1);
		}

		let formatted = raw ? formatCurrencyType(raw, 'HUF') : '';
		input.value = formatted;
		contract.annual_fee = formatted;
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
		<label for="contract_number">Szerződés sorozatszáma <span class="text-red-700">*</span></label>
		<input
			name="contract_number"
			id="contract_number"
			type="text"
			bind:value={contract.contract_number}
			class="mt-1 block w-full rounded-md px-3 py-2 ring-1 ring-black/10 duration-200 focus:ring-blue-600 focus:outline-none"
			autocomplete="off"
			required
		/>
	</div>
	<div class="flex flex-col text-start font-medium">
		<label for="annual_fee">Éves állománydíj <span class="text-red-700">*</span></label>
		<input
			name="annual_fee"
			id="annual_fee"
			type="text"
			bind:value={contract.annual_fee}
			oninput={handleAnnualFeeInput}
			class="mt-1 block w-full rounded-md px-3 py-2 ring-1 ring-black/10 duration-200 focus:ring-blue-600 focus:outline-none"
			autocomplete="off"
			required
		/>
	</div>
</div>
<div class="flex flex-col text-start font-medium">
	<label for="contract_type">Szerződés típus <span class="text-red-700">*</span></label>
	<select
		name="contract_type"
		id="contract_type"
		bind:value={contract.contract_type}
		class="mt-1 block w-full rounded-md px-3 py-2 ring-1 ring-black/10 duration-200 focus:ring-blue-600 focus:outline-none"
		autocomplete="off"
		required
	>
		<option value="">Válassz szerződés típust</option>
		{#each Object.entries(contractTypes) as [key, value]}
			<option value={key}>{value}</option>
		{/each}
	</select>
</div>
<div class="flex flex-col text-start font-medium">
	<label for="payment_frequency">Fizetési gyakoriság <span class="text-red-700">*</span></label>
	<select
		name="payment_frequency"
		id="payment_frequency"
		bind:value={contract.payment_frequency}
		class="mt-1 block w-full rounded-md px-3 py-2 ring-1 ring-black/10 duration-200 focus:ring-blue-600 focus:outline-none"
		autocomplete="off"
		required
	>
		<option value="">Válassz fizetési gyakoriságot</option>
		{#each Object.entries(paymentFrequencyTypes) as [key, value]}
			<option value={key}>{value}</option>
		{/each}
	</select>
</div>
<div class="flex flex-col text-start font-medium">
	<label for="payment_method">Fizetési mód <span class="text-red-700">*</span></label>
	<select
		name="payment_method"
		id="payment_method"
		bind:value={contract.payment_method}
		class="mt-1 block w-full rounded-md px-3 py-2 ring-1 ring-black/10 duration-200 focus:ring-blue-600 focus:outline-none"
		autocomplete="off"
		required
	>
		<option value="">Válassz fizetési módot</option>
		{#each Object.entries(paymentMethodTypes) as [key, value]}
			<option value={key}>{value}</option>
		{/each}
	</select>
</div>
