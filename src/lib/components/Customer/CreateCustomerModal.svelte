<script>
	import { page } from '$app/state';
	import { createCustomerMutation } from '$lib/scripts/queries/customer';
	import { getUserInfoQuery } from '$lib/scripts/queries/user';
	import { formatNumberOnly, formatPhoneNumber } from '$lib/scripts/utils';
	import { Notification } from '$lib/stores/notifications';
	import { createCustomerModal } from '$lib/stores/user';
	import { createQuery } from '@tanstack/svelte-query';
	import { CircleArrowRight } from 'lucide-svelte';
	import { fade } from 'svelte/transition';

	let { selected_user = $bindable() } = $props();

	const userInfoQuery = createQuery(getUserInfoQuery(page.data.token));
	const createCustomer = createCustomerMutation();
	async function handleSubmit() {
		let customer = {
			full_name: `${last_name.value} ${first_name.value}`,
			phone_number: phone_number.value,
			address: `${postal_code.value} ${settlement.value} ${street.value} ${house_number.value}`,
			email: email.value,
			user_id: selected_user,
			created_by: $userInfoQuery.data.info.full_name
		};

		const email_rgx = new RegExp(/\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/i);
		const phone_number_length = customer.phone_number.length === 15;
		if (!email_rgx.test(customer.email.trim())) {
			Notification.error('Hibás email', 3);
			return;
		}
		if (!phone_number_length) {
			Notification.error('Túl rövid telefonszám', 3);
			return;
		}

		$createCustomer.mutate(customer, {
			onSuccess: () => {
				Notification.success('Sikeresen létrehoztad az ügyfelet', 3);
				createCustomerModal.close();
			}
		});
	}
</script>

{#if $createCustomerModal}
	<div
		transition:fade={{ duration: 200 }}
		class="fixed top-0 left-0 z-50 h-full w-full overflow-hidden"
	>
		<button
			class="h-full w-full cursor-default bg-black/30"
			onclick={createCustomerModal.close}
			aria-label="Close modal"
		></button>
		<div
			class="fixed top-1/2 left-1/2 flex w-[36rem] -translate-1/2 flex-col rounded-lg bg-white p-4 text-center text-black shadow-2xl"
		>
			<h1 class="my-4 text-4xl font-semibold text-shadow-md">Ügyfél létrehozása</h1>
			<form onsubmit={handleSubmit} class="mt-5 flex flex-col gap-5">
				<div class="grid grid-cols-2 gap-4">
					<div class="flex flex-col text-start font-medium">
						<label for="last_name">Vezetéknév <span class="text-red-700">*</span></label>
						<input
							name="last_name"
							id="last_name"
							type="text"
							class="mt-1 block w-full rounded-md px-3 py-2 ring-1 ring-black/10 duration-200 focus:ring-blue-600 focus:outline-none"
							autocomplete="off"
							required
						/>
					</div>
					<div class="flex flex-col text-start font-medium">
						<label for="first_name">Keresztnév <span class="text-red-700">*</span></label>
						<input
							name="first_name"
							id="first_name"
							type="text"
							class="mt-1 block w-full rounded-md px-3 py-2 ring-1 ring-black/10 duration-200 focus:ring-blue-600 focus:outline-none"
							autocomplete="off"
							required
						/>
					</div>
				</div>
				<div class="flex flex-col text-start font-medium">
					<label for="phone_number">Telefonszám <span class="text-red-700">*</span></label>
					<input
						name="phone_number"
						id="phone_number"
						type="tel"
						maxlength="15"
						oninput={formatPhoneNumber}
						class="mt-1 block w-full rounded-md px-3 py-2 ring-1 ring-black/10 duration-200 focus:ring-blue-600 focus:outline-none"
						autocomplete="off"
						required
					/>
				</div>
				<div class="flex flex-col text-start font-medium">
					<label for="email">Email-cím <span class="text-red-700">*</span></label>
					<input
						name="email"
						id="email"
						type="email"
						class="mt-1 block w-full rounded-md px-3 py-2 ring-1 ring-black/10 duration-200 focus:ring-blue-600 focus:outline-none"
						autocomplete="off"
						required
					/>
				</div>

				<div class="grid grid-cols-2 gap-4">
					<div class="flex flex-col text-start font-medium">
						<label for="postal_code">Irányítoszám <span class="text-red-700">*</span></label>
						<input
							name="postal_code"
							id="postal_code"
							maxlength="4"
							type="text"
							oninput={() => formatNumberOnly(postal_code)}
							class="mt-1 block w-full rounded-md px-3 py-2 ring-1 ring-black/10 duration-200 focus:ring-blue-600 focus:outline-none"
							autocomplete="off"
							required
						/>
					</div>
					<div class="flex flex-col text-start font-medium">
						<label for="settlement">Település <span class="text-red-700">*</span></label>
						<input
							name="settlement"
							id="settlement"
							type="text"
							class="mt-1 block w-full rounded-md px-3 py-2 ring-1 ring-black/10 duration-200 focus:ring-blue-600 focus:outline-none"
							autocomplete="off"
							required
						/>
					</div>
				</div>
				<div class="grid grid-cols-2 gap-4">
					<div class="flex flex-col text-start font-medium">
						<label for="street">Közterület <span class="text-red-700">*</span></label>
						<input
							name="street"
							id="street"
							type="text"
							class="mt-1 block w-full rounded-md px-3 py-2 ring-1 ring-black/10 duration-200 focus:ring-blue-600 focus:outline-none"
							autocomplete="off"
							required
						/>
					</div>
					<div class="flex flex-col text-start font-medium">
						<label for="house_number">Házszám <span class="text-red-700">*</span></label>
						<input
							name="house_number"
							id="house_number"
							type="text"
							class="mt-1 block w-full rounded-md px-3 py-2 ring-1 ring-black/10 duration-200 focus:ring-blue-600 focus:outline-none"
							autocomplete="off"
							required
						/>
					</div>
				</div>
				<div class="flex justify-end">
					<button
						class="flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-2 text-white duration-200 hover:bg-blue-700"
					>
						<span>Ügyfél létrehozása</span>
						<CircleArrowRight class="size-4" />
					</button>
				</div>
			</form>
		</div>
	</div>
{/if}
