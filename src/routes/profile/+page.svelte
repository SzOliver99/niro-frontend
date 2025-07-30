<script>
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { checkUserToken } from '$lib/scripts/utils.js';
	import { CircleArrowRight } from 'lucide-svelte';

	let userInfo = {};
</script>

<section class="w-full px-4 py-3">
	<h2 class="text-xl italic">Personal Informations</h2>

	<!-- {#await getUserInfo() then userInfo} -->
	<form id="informations" class="rounded-lg p-3">
		<div class="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
			<div>
				<label for="lastName" class="block text-sm font-medium">Vezetéknév*</label>
				<input
					type="text"
					id="lastName"
					name="lastName"
					placeholder="Doe"
					value={userInfo?.last_name || ''}
					required
					class="mt-1 block w-full rounded-md px-3 py-2 ring-1 ring-black duration-200 focus:ring-blue-600 focus:outline-none"
				/>
			</div>
			<div>
				<label for="firstName" class="block text-sm font-medium">Keresztnév*</label>
				<input
					type="text"
					id="firstName"
					name="firstName"
					placeholder="John"
					value={userInfo?.first_name || ''}
					required
					class="mt-1 block w-full rounded-md px-3 py-2 ring-1 ring-black duration-200 focus:ring-blue-600 focus:outline-none"
				/>
			</div>
			<div>
				<label for="phone" class="block text-sm font-medium">Email cím*</label>
				<input
					type="text"
					id="email"
					name="email"
					placeholder="test@test.hu"
					value={userInfo?.phone_number || ''}
					required
					class="mt-1 block w-full rounded-md px-3 py-2 ring-1 ring-black duration-200 focus:ring-blue-600 focus:outline-none"
				/>
			</div>
			<div>
				<label for="phone" class="block text-sm font-medium">Telefonszám*</label>
				<input
					type="tel"
					id="phone"
					name="phone_number"
					placeholder="+36 12 345 7891"
					value={userInfo?.phone_number || ''}
					required
					class="mt-1 block w-full rounded-md px-3 py-2 ring-1 ring-black duration-200 focus:ring-blue-600 focus:outline-none"
				/>
			</div>
		</div>

		<!-- Submit Button -->
		<div class="mt-5 flex justify-end">
			<button
				type="submit"
				class="bg-gray hover: hover:bg-blue-600-600 justify-center gap-2 rounded-lg bg-blue-600 px-6 py-2 text-white duration-200"
				>Változtatások mentése</button
			>
		</div>
	</form>

	<!-- {/await} -->
</section>
