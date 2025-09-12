<script>
	import { page } from '$app/state';
	import { getUserInfoQuery } from '$lib/scripts/queries/user';
	import { formatNumberOnly, formatPhoneNumber } from '$lib/scripts/utils';
	import { Notification } from '$lib/stores/notifications';
	import { createCustomerModal } from '$lib/stores/user';
	import { createQuery } from '@tanstack/svelte-query';
	import { CircleArrowRight, FileUser, Table } from 'lucide-svelte';
	import { fade } from 'svelte/transition';
	import CustomerTab from './NavTab/CustomerTab.svelte';
	import LeadTab from './NavTab/LeadTab.svelte';
	import { createLeadMutation } from '$lib/scripts/queries/lead';

	let { selected_user = $bindable(), leadsModalStore = $bindable() } = $props();

	let navTabs = $state({
		opened: 'Ügyfél adatai',
		tabs: [
			{ title: 'Ügyfél adatai', icon: FileUser },
			{ title: 'Tevékenység adatai', icon: Table }
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

	let lead = $state({
		lead_type: '',
		inquiry_type: '',
		lead_status: ''
	});

	const userInfoQuery = createQuery(getUserInfoQuery(page.data.token));
	const createLead = createLeadMutation(page.data.token);
	async function handleSubmit() {
		let formatted_customer = {
			full_name: `${customer.last_name.trim()} ${customer.first_name.trim()}`,
			phone_number: customer.phone_number,
			address: `${customer.postal_code.trim()} ${customer.settlement.trim()} ${customer.street.trim()} ${customer.house_number.trim()}`,
			email: customer.email.trim()
		};
		let formatted_lead = {
			...lead,
			user_uuid: selected_user,
			created_by: $userInfoQuery.data.info.full_name
		};

		const email_rgx = new RegExp(/\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/i);
		const phone_number_length = customer.phone_number.length === 15;

		// Check required customer fields
		if (
			!customer.last_name.trim() ||
			!customer.first_name.trim() ||
			!customer.phone_number.trim() ||
			!customer.email.trim()
		) {
			Notification.error('Kérjük, töltsd ki az összes kötelező ügyfél mezőt!', 3);
			return;
		}

		// Check required lead fields
		if (!lead.lead_type.trim() || !lead.inquiry_type.trim() || !lead.lead_status.trim()) {
			Notification.error('Kérjük, töltsd ki az összes kötelező tevékenység mezőt!', 3);
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

		$createLead.mutate(
			{ customer: formatted_customer, lead: formatted_lead },
			{
				onSuccess: (data) => {
					Notification.success(data, 3);
					leadsModalStore.close();
				}
			}
		);
	}
</script>

{#if $leadsModalStore}
	<div
		transition:fade={{ duration: 200 }}
		class="fixed top-0 left-0 z-50 h-full w-full overflow-hidden"
	>
		<button
			class="h-full w-full cursor-default bg-black/30"
			onclick={leadsModalStore.close}
			aria-label="Close modal"
		></button>
		<div
			class="fixed top-1/2 left-1/2 flex w-[36rem] -translate-1/2 flex-col rounded-lg bg-white p-4 text-center text-black shadow-2xl"
		>
			<h1 class="my-4 text-4xl font-semibold text-shadow-md">Tevékenység létrehozása</h1>
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
						<span>Tevékenység létrehozása</span>
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
	{:else if navTabs.opened === 'Tevékenység adatai'}
		<LeadTab bind:lead />
	{/if}
{/snippet}
