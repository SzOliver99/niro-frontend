<script>
	import { formatNumberOnly, formatPhoneNumber } from '$lib/scripts/utils';

	let { customer = $bindable() } = $props();
</script>

<div class="grid grid-cols-2 gap-4">
	<div class="flex flex-col text-start font-medium">
		<label for="last_name">Vezetéknév <span class="text-red-700">*</span></label>
		<input
			name="last_name"
			id="last_name"
			type="text"
			bind:value={customer.last_name}
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
			bind:value={customer.first_name}
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
		bind:value={customer.phone_number}
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
		bind:value={customer.email}
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
			bind:value={customer.postal_code}
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
			bind:value={customer.settlement}
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
			bind:value={customer.street}
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
			bind:value={customer.house_number}
			class="mt-1 block w-full rounded-md px-3 py-2 ring-1 ring-black/10 duration-200 focus:ring-blue-600 focus:outline-none"
			autocomplete="off"
			required
		/>
	</div>
</div>
