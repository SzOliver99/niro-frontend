<script>
	import { page } from '$app/state';
	import { createCustomerMutation } from '$lib/scripts/queries/customer';
	import { getUserInfoQuery } from '$lib/scripts/queries/user';
	import { formatNumberOnly, formatPhoneNumber } from '$lib/scripts/utils';
	import { Notification } from '$lib/stores/notifications';
	import { createCustomerModal } from '$lib/stores/user';
	import { createQuery } from '@tanstack/svelte-query';
	import { CircleArrowRight, FileUser, ReceiptText } from 'lucide-svelte';
	import { fade } from 'svelte/transition';
	import { createLeadMutation } from '$lib/scripts/queries/lead';
	import CustomerTab from './NavTab/CustomerTab.svelte';
	import ContractTab from './NavTab/ContractTab.svelte';
	import { createContractMutation } from '$lib/scripts/queries/contract';

	let { selected_user = $bindable(), contractsModalStore = $bindable() } = $props();

	let navTabs = $state({
		opened: 'Ügyfél adatai',
		tabs: [
			{ title: 'Ügyfél adatai', icon: FileUser },
			{ title: 'Szerződés adatai', icon: ReceiptText }
		]
	});

	let customer = $state({
		last_name: '',
		first_name: '',
		phone_number: '',
		postal_code: '',
		settlement: '',
		street: '',
		house_number: '',
		email: ''
	});

	let contract = $state({
		contract_number: '',
		contract_type: '',
		annual_fee: '',
		payment_frequency: '',
		payment_method: ''
	});

	const userInfoQuery = createQuery(getUserInfoQuery(page.data.token));
	const createContract = createContractMutation(page.data.token);
	async function handleSubmit() {
		let formatted_customer = {
			full_name: `${customer.last_name.trim()} ${customer.first_name.trim()}`,
			phone_number: customer.phone_number,
			address: `${customer.postal_code.trim()} ${customer.settlement.trim()} ${customer.street.trim()} ${customer.house_number.trim()}`,
			email: customer.email.trim()
		};
		let formatted_contract = {
			...contract,
			annual_fee: +contract.annual_fee.replace(/\D/g, ''),
			user_uuid: selected_user,
			created_by: $userInfoQuery.data.info.full_name
		};

		const email_rgx = new RegExp(/\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/i);
		const phone_number_length = customer.phone_number.length === 15;

		// Check required customer fields
		if (
			!customer.last_name.trim() ||
			!customer.first_name.trim() ||
			!customer.phone_number ||
			!customer.email.trim()
		) {
			Notification.error('Kérjük, töltsd ki az összes kötelező ügyfél mezőt!', 3);
			return;
		}

		// Check required lead fields
		if (
			contract.annual_fee <= 0 ||
			!contract.contract_type ||
			!contract.payment_frequency ||
			!contract.payment_method
		) {
			Notification.error('Kérjük, töltsd ki az összes kötelező címanyag mezőt!', 3);
			return;
		}

		if (!email_rgx.test(customer.email.trim())) {
			Notification.error('Hibás email', 3);
			return;
		}
		if (!phone_number_length) {
			Notification.error('Túl rövid telefonszám', 3);
			return;
		}

		$createContract.mutate(
			{ customer: formatted_customer, contract: formatted_contract },
			{
				onSuccess: () => {
					Notification.success('Sikeresen létrehoztad a címanyagot', 3);
					contractsModalStore.close();
				}
			}
		);
	}
</script>

{#if $contractsModalStore}
	<div
		transition:fade={{ duration: 200 }}
		class="fixed top-0 left-0 z-50 h-full w-full overflow-hidden"
	>
		<button
			class="h-full w-full cursor-default bg-black/30"
			onclick={contractsModalStore.close}
			aria-label="Close modal"
		></button>
		<div
			class="fixed top-1/2 left-1/2 flex w-[36rem] -translate-1/2 flex-col rounded-lg bg-white p-4 text-center text-black shadow-2xl"
		>
			<h1 class="my-4 text-4xl font-semibold text-shadow-md">Szerződés létrehozása</h1>
			<nav>
				<ul class="flex justify-between">
					{#each navTabs.tabs as item}
						<button
							class="flex gap-1 rounded-lg border-1 border-gray-300 px-4 py-2 text-sm shadow-2xl duration-200 hover:border-gray-500"
							class:text-blue-600={navTabs.opened === item.title}
							onclick={() => (navTabs.opened = item.title)}
						>
							<item.icon class="size-5" />
							<p>{item.title}</p>
						</button>
					{/each}
				</ul>
			</nav>

			<form onsubmit={handleSubmit} class="mt-5 flex flex-col gap-5">
				{@render renderNavTab()}
				<div class="flex justify-end">
					<button
						class="flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-2 text-white duration-200 hover:bg-blue-700"
					>
						<span>Szerződés létrehozása</span>
						<CircleArrowRight class="size-4" />
					</button>
				</div>
			</form>
		</div>
	</div>
{/if}

{#snippet renderNavTab()}
	{#if navTabs.opened === 'Ügyfél adatai'}
		<CustomerTab bind:customer />
	{:else if navTabs.opened === 'Szerződés adatai'}
		<ContractTab bind:contract />
	{/if}
{/snippet}
