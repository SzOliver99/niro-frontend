<script>
	import { page } from '$app/state';
	import customerApi from '$lib/scripts/apis/customer';
	import { modifyCustomerMutation } from '$lib/scripts/queries/customer.js';
	import { Notification } from '$lib/stores/notifications.js';
	import { createQuery } from '@tanstack/svelte-query';

	let { data } = $props();
	const customer = createQuery({
		queryKey: ['customer', data.token, page.params.uuid],
		queryFn: async () => await customerApi({ user_token: data.token }).getByUuid(page.params.uuid)
	});

	let modifyCustomer = modifyCustomerMutation(data.token);
	async function handleSubmit() {
		let modified_customer = {
			customer_uuid: $customer.data.uuid,
			full_name: `${last_name.value} ${first_name.value}`,
			phone_number: phone_number.value,
			address: `${postal_code.value} ${settlement.value} ${street.value} ${house_number.value}`,
			email: email.value
		};

		$modifyCustomer.mutate(modified_customer, {
			onSuccess: (data) => {
				Notification.success(data, 3);
			}
		});
	}
</script>

<section class="w-full px-4 py-3">
	{#if $customer.isLoading}
		<p>Ügyfél adatainak betöltése</p>
	{:else if $customer.data}
		<form onsubmit={handleSubmit} class="flex flex-col gap-5 rounded-lg p-3 text-nowrap">
			<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
				<div>
					<label for="last_name" class="block text-sm font-medium">Vezetéknév</label>
					<input
						type="text"
						id="last_name"
						name="last_name"
						placeholder="test@test.hu"
						value={$customer.data.full_name.split(' ')[0]}
						required
						class="mt-1 block w-full rounded-md px-3 py-2 ring-1 ring-black/10 duration-200 focus:ring-blue-600 focus:outline-none"
					/>
				</div>
				<div>
					<label for="first_name" class="block text-sm font-medium">Keresztnév</label>
					<input
						type="text"
						id="first_name"
						name="emafirst_nameil"
						placeholder="test@test.hu"
						value={$customer.data.full_name.split(' ')[1]}
						required
						class="mt-1 block w-full rounded-md px-3 py-2 ring-1 ring-black/10 duration-200 focus:ring-blue-600 focus:outline-none"
					/>
				</div>
			</div>
			<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
				<div>
					<label for="phone_number" class="block text-sm font-medium">Telefonszám</label>
					<input
						type="tel"
						id="phone_number"
						name="phone_number"
						placeholder="+36 12 345 7891"
						value={$customer.data.phone_number}
						required
						class="mt-1 block w-full rounded-md px-3 py-2 ring-1 ring-black/10 duration-200 focus:ring-blue-600 focus:outline-none"
					/>
				</div>
				<div>
					<label for="email" class="block text-sm font-medium">Email cím</label>
					<input
						type="email"
						id="email"
						name="email"
						placeholder="test@test.hu"
						value={$customer.data.email}
						required
						class="mt-1 block w-full rounded-md px-3 py-2 ring-1 ring-black/10 duration-200 focus:ring-blue-600 focus:outline-none"
					/>
				</div>
			</div>
			<div class="flex gap-4">
				<div class="flex w-full flex-col text-start font-medium">
					<label for="settlement">Település <span class="text-red-700">*</span></label>
					<input
						type="text"
						name="settlement"
						id="settlement"
						value={$customer.data.address.split(' ')[1]}
						class="mt-1 block w-full rounded-md px-3 py-2 ring-1 ring-black/10 duration-200 focus:ring-blue-600 focus:outline-none"
						autocomplete="off"
						required
					/>
				</div>
				<div class="flex flex-1/3 flex-col text-start font-medium">
					<label for="postal_code">Irányítoszám <span class="text-red-700">*</span></label>
					<input
						type="text"
						name="postal_code"
						id="postal_code"
						maxlength="4"
						value={$customer.data.address.split(' ')[0]}
						oninput={() => formatNumberOnly(postal_code)}
						class="mt-1 block w-full rounded-md px-3 py-2 ring-1 ring-black/10 duration-200 focus:ring-blue-600 focus:outline-none"
						autocomplete="off"
						required
					/>
				</div>
			</div>
			<div class="flex gap-4">
				<div class="flex flex-1/2 flex-col text-start font-medium">
					<label for="street">Közterület <span class="text-red-700">*</span></label>
					<input
						type="text"
						name="street"
						id="street"
						value={$customer.data.address.split(' ')[2]}
						class="mt-1 block w-full rounded-md px-3 py-2 ring-1 ring-black/10 duration-200 focus:ring-blue-600 focus:outline-none"
						autocomplete="off"
						required
					/>
				</div>
				<div class="flex flex-1/3 flex-col text-start font-medium">
					<label for="house_number">Házszám <span class="text-red-700">*</span></label>
					<input
						type="text"
						name="house_number"
						id="house_number"
						value={$customer.data.address.split(' ')[3]}
						class="mt-1 block w-full rounded-md px-3 py-2 ring-1 ring-black/10 duration-200 focus:ring-blue-600 focus:outline-none"
						autocomplete="off"
						required
					/>
				</div>
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
