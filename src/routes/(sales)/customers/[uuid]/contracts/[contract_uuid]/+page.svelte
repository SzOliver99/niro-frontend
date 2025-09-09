<script>
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import contractApi from '$lib/scripts/apis/contract.js';
	import { modifyContractMutation } from '$lib/scripts/queries/contract.js';
	import { modifyLeadMutation } from '$lib/scripts/queries/lead';
	import { Notification } from '$lib/stores/notifications';
	import { createQuery } from '@tanstack/svelte-query';

	let { data } = $props();

	let contract = createQuery({
		queryKey: ['contract'],
		queryFn: async () =>
			await contractApi({ user_token: data.token }).getByUuid(page.params.contract_uuid)
	});

	const modifyContract = modifyContractMutation(data.token);
	function handleSubmit() {
		let modified_contract = {
			contract_number: contract_number.value,
			contract_type: contract_type.value,
			annual_fee: +annual_fee.value.replace(/\D/g, ''),
			payment_frequency: payment_frequency.value,
			payment_method: payment_method.value
		};

		$modifyContract.mutate(
			{ contract_uuid: page.params.contract_uuid, contract: modified_contract },
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

<section class="w-full px-4 py-3">
	{#if $contract.isLoading}
		<p>Szerződés adatainak betöltése</p>
	{:else if $contract.data}
		<form onsubmit={handleSubmit} class="flex flex-col gap-5 rounded-lg p-3 text-nowrap">
			<div class="grid grid-cols-2 gap-4">
				<div class="flex flex-col text-start font-medium">
					<label for="contract_number"
						>Szerződés sorozatszáma <span class="text-red-700">*</span></label
					>
					<input
						name="contract_number"
						id="contract_number"
						type="text"
						value={$contract.data.contract_number}
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
						value={$contract.data.annual_fee.toLocaleString('hu-HU', {
							style: 'currency',
							currency: 'HUF',
							minimumFractionDigits: 0,
							maximumFractionDigits: 0
						})}
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
					value={$contract.data.contract_type}
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
				<label for="payment_frequency"
					>Fizetési gyakoriság <span class="text-red-700">*</span></label
				>
				<select
					name="payment_frequency"
					id="payment_frequency"
					value={$contract.data.payment_frequency}
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
					value={$contract.data.payment_method}
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
