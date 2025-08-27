<script>
	import userApi from '$lib/scripts/apis/user';
	import { CircleArrowRight } from 'lucide-svelte';

	let { data } = $props();

	let user = $state({});
	$effect.pre(async () => {
		user = await userApi({ user_token: data.token }).getUserInfo();
	});

	const getUserLastName = () => user.info?.full_name.split(' ')[0];
	const getUserFirstName = () => user.info?.full_name.split(' ')[1];

	async function handleSubmit() {
		console.log(user);
	}
</script>

<section class="w-full px-4 py-3">
	<h2 class="text-xl italic">Személyes adatok</h2>

	<form onsubmit={handleSubmit} class="rounded-lg p-3">
		<div class="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
			<div>
				<label for="lastName" class="block text-sm font-medium">Vezetéknév*</label>
				<input
					type="text"
					id="lastName"
					name="lastName"
					placeholder="Doe"
					value={getUserLastName()}
					required
					class="mt-1 block w-full rounded-md px-3 py-2 ring-1 ring-black/10 duration-200 focus:ring-blue-600 focus:outline-none"
				/>
			</div>
			<div>
				<label for="firstName" class="block text-sm font-medium">Keresztnév*</label>
				<input
					type="text"
					id="firstName"
					name="firstName"
					placeholder="John"
					value={getUserFirstName()}
					required
					class="mt-1 block w-full rounded-md px-3 py-2 ring-1 ring-black/10 duration-200 focus:ring-blue-600 focus:outline-none"
				/>
			</div>
			<div>
				<label for="phone" class="block text-sm font-medium">Email cím*</label>
				<input
					type="text"
					id="email"
					name="email"
					placeholder="test@test.hu"
					bind:value={user.email}
					required
					class="mt-1 block w-full rounded-md px-3 py-2 ring-1 ring-black/10 duration-200 focus:ring-blue-600 focus:outline-none"
				/>
			</div>
			<div>
				<label for="phone" class="block text-sm font-medium">Telefonszám*</label>
				<input
					type="tel"
					id="phone"
					name="phone_number"
					placeholder="+36 12 345 7891"
					value={user.info?.phone_number}
					required
					class="mt-1 block w-full rounded-md px-3 py-2 ring-1 ring-black/10 duration-200 focus:ring-blue-600 focus:outline-none"
				/>
			</div>
			<div>
				<label for="hufa_code" class="block text-sm font-medium">Hufa kód</label>
				<input
					type="text"
					id="hufa_code"
					name="hufa_code"
					placeholder="ab12345"
					value={user.info?.hufa_code}
					disabled
					class="mt-1 block w-full rounded-md px-3 py-2 text-black/60 ring-1 ring-black/10 duration-200 focus:ring-blue-600 focus:outline-none"
				/>
			</div>
			<div>
				<label for="agent_code" class="block text-sm font-medium">Ügynökségi kód</label>
				<input
					type="text"
					id="agent_code"
					name="agent_code"
					placeholder="1234567"
					value={user.info?.agent_code}
					disabled
					class="mt-1 block w-full rounded-md px-3 py-2 text-black/60 ring-1 ring-black/10 duration-200 focus:ring-blue-600 focus:outline-none"
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
</section>
