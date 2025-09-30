<script>
	import { page } from '$app/state';
	import { getUserInfoQuery } from '$lib/scripts/queries/user';
	import { formatNumberOnly, formatPhoneNumber, formValidation } from '$lib/scripts/utils';
	import { Notification } from '$lib/stores/notifications';
	import { createCustomerModal } from '$lib/stores/user';
	import { createQuery } from '@tanstack/svelte-query';
	import { CircleArrowRight, FileUser, Table } from 'lucide-svelte';
	import { fade } from 'svelte/transition';
	import CustomerTab from './NavTab/CustomerTab.svelte';
	import LeadTab from './NavTab/InterventionTaskTab.svelte';
	import { createInterventionTaskMutation } from '$lib/scripts/queries/intervention_task';

	let { selected_user = $bindable(), createInterventionTaskModalStore = $bindable() } = $props();

	let navTabs = $state({
		opened: 'Ügyfél adatai',
		tabs: [
			{ title: 'Ügyfél adatai', icon: FileUser },
			{ title: 'Intervenciós feladat adatai', icon: Table }
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

	let intervention_task = $state({
		contract_number: '',
		product_name: '',
		outstanding_days: '',
		balance: '',
		processing_deadline: '',
		comment: '',
		status: ''
	});

	const userInfoQuery = createQuery(getUserInfoQuery(page.data.token));
	const createInterventionTask = createInterventionTaskMutation(page.data.token);
	async function handleSubmit() {
		let formatted_customer = {
			full_name: `${customer.last_name.trim()} ${customer.first_name.trim()}`,
			phone_number: customer.phone_number,
			address: `${customer.postal_code.trim()} ${customer.settlement.trim()} ${customer.street.trim()} ${customer.house_number.trim()}`,
			email: customer.email.trim()
		};

		let formatted_intervention_task = {
			...intervention_task,
			processing_deadline: `${intervention_task.processing_deadline}:00`,
			outstanding_days: +intervention_task.outstanding_days,
			balance: +intervention_task.balance
		};

		// Check required customer fields
		if (formValidation(formatted_customer)) {
			Notification.error('Kérjük, töltsd ki az összes kötelező ügyfél mezőt!', 3);
			return;
		}

		// Check required intervention task fields
		if (formValidation(intervention_task)) {
			Notification.error('Kérjük, töltsd ki az összes kötelező tevékenység mezőt!', 3);
			return;
		}

		const email_rgx = new RegExp(/\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/i);
		if (!email_rgx.test(customer.email.trim())) {
			Notification.error('Hibás email', 3);
			return;
		}
		if (!customer.phone_number.length === 15) {
			Notification.error('Túl rövid telefonszám', 3);
			return;
		}

		$createInterventionTask.mutate(
			{
				customer: formatted_customer,
				intervention_task: formatted_intervention_task,
				customer_uuid: selected_user,
				created_by: $userInfoQuery.data.info.full_name
			},
			{
				onSuccess: (data) => {
					Notification.success(data, 3);
					createInterventionTaskModalStore.close();
				}
			}
		);
	}
</script>

{#if $createInterventionTaskModalStore}
	<div
		transition:fade={{ duration: 200 }}
		class="fixed top-0 left-0 z-50 h-full w-full overflow-hidden"
	>
		<button
			class="h-full w-full cursor-default bg-black/30"
			onclick={createInterventionTaskModalStore.close}
			aria-label="Close modal"
		></button>
		<div
			class="fixed top-1/2 left-1/2 flex w-[36rem] -translate-1/2 flex-col rounded-lg bg-white p-4 text-center text-black shadow-2xl"
		>
			<h1 class="my-4 text-4xl font-semibold text-shadow-md">Intervenciós feladat létrehozása</h1>
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
						<span>Intervenciós feladat létrehozása</span>
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
	{:else if navTabs.opened === 'Intervenciós feladat adatai'}
		<LeadTab bind:intervention_task />
	{/if}
{/snippet}
