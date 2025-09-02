<script>
	import { page } from '$app/state';
	import { createCustomerMutation } from '$lib/scripts/queries/customer';
	import { getUserInfoQuery } from '$lib/scripts/queries/user';
	import { formatNumberOnly, formatPhoneNumber } from '$lib/scripts/utils';
	import { Notification } from '$lib/stores/notifications';
	import { createCustomerModal } from '$lib/stores/user';
	import { createQuery } from '@tanstack/svelte-query';
	import { CircleArrowRight, FileUser } from 'lucide-svelte';
	import { fade } from 'svelte/transition';
	import { createLeadMutation } from '$lib/scripts/queries/lead';

	let { selected_user = $bindable(), dateCreateModalStore = $bindable() } = $props();

	const leadTypes = {
		needs_assessment: 'Igényfelmérés',
		consultation: 'Tanácsadás',
		service: 'Szervíz',
		annual_review: 'Évfordulós tárgyalás'
	};

	const userInfoQuery = createQuery(getUserInfoQuery(page.data.token));
	const createLead = createLeadMutation();
	async function handleSubmit() {
		console.log('WIP');

		// $createLead.mutate(
		// 	{ customer: formatted_customer, lead: formatted_lead },
		// 	{
		// 		onSuccess: () => {
		// 			Notification.success('Sikeresen létrehoztad a címanyagot', 3);
		// 			dateCreateModalStore.close();
		// 		}
		// 	}
		// );
	}
</script>

{#if $dateCreateModalStore}
	<div
		transition:fade={{ duration: 200 }}
		class="fixed top-0 left-0 z-50 h-full w-full overflow-hidden"
	>
		<button
			class="h-full w-full cursor-default bg-black/30"
			onclick={dateCreateModalStore.close}
			aria-label="Close modal"
		></button>
		<div
			class="fixed top-1/2 left-1/2 flex w-[36rem] -translate-1/2 flex-col rounded-lg bg-white p-4 text-center text-black shadow-2xl"
		>
			<h1 class="my-4 text-4xl font-semibold text-shadow-md">Időpont létrehozása</h1>

			<form onsubmit={handleSubmit} class="mt-5 flex flex-col gap-5">
				<div class="grid grid-cols-2 gap-4">
					<div class="flex flex-col text-start font-medium">
						<label for="date">Dátum <span class="text-red-700">*</span></label>
						<input
							name="date"
							id="date"
							type="datetime-local"
							class="mt-1 block w-full rounded-md px-3 py-2 ring-1 ring-black/10 duration-200 focus:ring-blue-600 focus:outline-none"
							autocomplete="off"
							required
						/>
					</div>
					<div class="flex flex-col text-start font-medium">
						<label for="is_completed">Megvalósúlt <span class="text-red-700">*</span></label>
						<select
							id="is_completed"
							name="is_completed"
							required
							class="mt-1 block w-full rounded-md px-3 py-2 ring-1 ring-black/10 duration-200 focus:ring-blue-600 focus:outline-none"
						>
							<option value={false}>Nem</option>
							<option value={true}>Igen</option>
						</select>
					</div>
				</div>
				<div class="grid grid-cols-2 gap-4">
					<div class="flex flex-col text-start font-medium">
						<label for="customer_name">Ügyfél neve <span class="text-red-700">*</span></label>
						<input
							name="customer_name"
							id="customer_name"
							type="text"
							class="mt-1 block w-full rounded-md px-3 py-2 ring-1 ring-black/10 duration-200 focus:ring-blue-600 focus:outline-none"
							autocomplete="off"
							required
						/>
					</div>
					<div class="flex flex-col text-start font-medium">
						<label for="phone_number">Telefonszám <span class="text-red-700">*</span></label>
						<input
							name="phone_number"
							id="phone_number"
							type="text"
							class="mt-1 block w-full rounded-md px-3 py-2 ring-1 ring-black/10 duration-200 focus:ring-blue-600 focus:outline-none"
							autocomplete="off"
							required
						/>
					</div>
				</div>

				<div class="flex flex-col text-start font-medium">
					<label for="meet_location">Találkozó helyszíne <span class="text-red-700">*</span></label>
					<input
						name="meet_location"
						id="meet_location"
						type="text"
						class="mt-1 block w-full rounded-md px-3 py-2 ring-1 ring-black/10 duration-200 focus:ring-blue-600 focus:outline-none"
						autocomplete="off"
						required
					/>
				</div>
				<div class="flex flex-col text-start font-medium">
					<label for="meet_type">Találkozó típusa <span class="text-red-700">*</span></label>
					<select
						name="meet_type"
						id="meet_type"
						class="mt-1 block w-full rounded-md px-3 py-2 ring-1 ring-black/10 duration-200 focus:ring-blue-600 focus:outline-none"
						autocomplete="off"
						required
					>
						<option value="">Válassz találkozó típust</option>
						{#each Object.entries(leadTypes) as [key, value]}
							<option value={key}>{value}</option>
						{/each}
					</select>
				</div>
				<div class="flex justify-end">
					<button
						class="flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-2 text-white duration-200 hover:bg-blue-700"
					>
						<span>Időpont létrehozása</span>
						<CircleArrowRight class="size-4" />
					</button>
				</div>
			</form>
		</div>
	</div>
{/if}
