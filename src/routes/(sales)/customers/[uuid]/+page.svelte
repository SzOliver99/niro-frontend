<script>
	import { page } from '$app/state';
	import customerApi from '$lib/scripts/apis/customer';
	import { modifyCustomerMutation } from '$lib/scripts/queries/customer.js';
	import { Notification } from '$lib/stores/notifications.js';
	import { createQuery } from '@tanstack/svelte-query';

	let { data } = $props();

	let modifyCustomer = modifyCustomerMutation(data.token);
	async function handleSubmit() {
		let modified_customer = {
			customer_uuid: data.customer.uuid,
			full_name: `${last_name.value.trim()} ${first_name.value.trim()}`,
			phone_number: phone_number.value,
			address: address.value,
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
	<form onsubmit={handleSubmit} class="flex flex-col gap-5 rounded-lg p-3 text-nowrap">
		<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
			<div>
				<label for="last_name" class="block text-sm font-medium">Vezetéknév</label>
				<input
					type="text"
					id="last_name"
					name="last_name"
					placeholder=""
					value={data.customer.full_name.split(' ')[0]}
					required
					class="mt-1 block w-full rounded-md px-3 py-2 ring-1 ring-black/10 duration-200 focus:ring-blue-600 focus:outline-none"
				/>
			</div>
			<div>
				<label for="first_name" class="block text-sm font-medium">Keresztnév</label>
				<input
					type="text"
					id="first_name"
					name="first_name"
					placeholder=""
					value={data.customer.full_name.split(' ').slice(1).join(' ')}
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
					value={data.customer.phone_number}
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
					value={data.customer.email}
					required
					class="mt-1 block w-full rounded-md px-3 py-2 ring-1 ring-black/10 duration-200 focus:ring-blue-600 focus:outline-none"
				/>
			</div>
		</div>
		<div class="flex flex-1/2 flex-col text-start font-medium">
			<label for="address">Cím <span class="text-red-700">*</span></label>
			<input
				type="text"
				name="address"
				id="address"
				value={data.customer.address}
				class="mt-1 block w-full rounded-md px-3 py-2 ring-1 ring-black/10 duration-200 focus:ring-blue-600 focus:outline-none"
				autocomplete="off"
				required
			/>
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
</section>
