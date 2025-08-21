<script>
	import { page } from '$app/stores';
	import { getManagers, modifyUserInfo } from '$lib/scripts/apis/user';
	import { convertUserGroup } from '$lib/scripts/utils';
	import { permissionsStore } from '$lib/stores/permissions';
	import { Check, Save } from 'lucide-svelte';

	let { agent } = $props();

	let managers = $state();
	$effect(async () => {
		const response = await getManagers();
		const managers_data = await response.json();
		managers = managers_data;
	});

	let formData = $state({
		last_name: '',
		first_name: '',
		email: '',
		phone_number: '',
		agent_code: '',
		user_manager: null,
		is_manager: false
	});

	$effect(() => {
		if (agent) {
			const full_name = agent.info?.full_name || '';
			const name_parts = full_name.split(' ');

			formData = {
				last_name: name_parts[0] || '',
				first_name: name_parts[1] || '',
				email: agent.email || '',
				phone_number: agent.info?.phone_number || '',
				agent_code: agent.info?.agent_code || '',
				hufa_code: agent.info?.hufa_code || '',
				user_manager: agent.manager_id || 'null',
				is_manager: agent.manager_id === null
			};
		}
	});

	async function handleSubmit(event) {
		event.preventDefault();

		let user = {
			id: agent.id,
			email: email.value,
			info: {
				full_name: `${last_name.value} ${first_name.value}`,
				phone_number: phone_number.value,
				hufa_code: hufa_code.value,
				agent_code: agent_code.value
			},
			is_manager: true,
			manager_id: 1
		};

		let response = await modifyUserInfo($page.data.token, user);
		let data = await response.json();
	}

	function formatPhoneNumber() {
		let value = phone_number.value.replace(/\D/g, '');

		if (!value.startsWith('36')) {
			value = '36' + value.replace(/^36/, '');
		}
		let rest = value.slice(2);

		let formatted = '+36';
		if (rest.length > 0) formatted += ' ' + rest.substring(0, 2);
		if (rest.length > 2) formatted += ' ' + rest.substring(2, 5);
		if (rest.length > 5) formatted += ' ' + rest.substring(5, 9);
		phone_number.value = formatted;
	}
</script>

<section class="w-full">
	<h2 class="mb-4 text-xl italic">Személyes adatok</h2>

	<form onsubmit={handleSubmit} class="rounded-lg">
		<div class="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
			<div>
				<label for="last_name" class="block text-sm font-medium">Vezetéknév*</label>
				<input
					type="text"
					id="last_name"
					name="last_name"
					placeholder="Doe"
					bind:value={formData.last_name}
					required
					class="mt-1 block w-full rounded-md px-3 py-2 ring-1 ring-black/10 duration-200 focus:ring-blue-600 focus:outline-none"
				/>
			</div>
			<div>
				<label for="first_name" class="block text-sm font-medium">Keresztnév*</label>
				<input
					type="text"
					id="first_name"
					name="first_name"
					placeholder="John"
					bind:value={formData.first_name}
					required
					class="mt-1 block w-full rounded-md px-3 py-2 ring-1 ring-black/10 duration-200 focus:ring-blue-600 focus:outline-none"
				/>
			</div>
			<div>
				<label for="email" class="block text-sm font-medium">Email cím*</label>
				<input
					type="email"
					id="email"
					name="email"
					placeholder="test@test.hu"
					bind:value={formData.email}
					required
					class="mt-1 block w-full rounded-md px-3 py-2 ring-1 ring-black/10 duration-200 focus:ring-blue-600 focus:outline-none"
				/>
			</div>
			<div>
				<label for="phone_number" class="block text-sm font-medium">Telefonszám*</label>
				<input
					id="phone_number"
					name="phone_number"
					type="tel"
					maxlength="15"
					placeholder="+36 12 345 7891"
					oninput={formatPhoneNumber}
					bind:value={formData.phone_number}
					required
					class="mt-1 block w-full rounded-md px-3 py-2 ring-1 ring-black/10 duration-200 focus:ring-blue-600 focus:outline-none"
				/>
			</div>
			<div>
				<label for="hufa_code" class="block text-sm font-medium">HUFA kód</label>
				<input
					type="text"
					id="hufa_code"
					name="hufa_code"
					placeholder="AG001"
					bind:value={formData.hufa_code}
					class="mt-1 block w-full rounded-md px-3 py-2 ring-1 ring-black/10 duration-200 focus:ring-blue-600 focus:outline-none"
				/>
			</div>
			<div>
				<label for="agent_code" class="block text-sm font-medium">Ügynökségi kód</label>
				<input
					type="text"
					id="agent_code"
					name="agent_code"
					placeholder="AG001"
					bind:value={formData.agent_code}
					class="mt-1 block w-full rounded-md px-3 py-2 ring-1 ring-black/10 duration-200 focus:ring-blue-600 focus:outline-none"
				/>
			</div>

			<div class="text-start">
				<label for="is_manager" class="block text-sm font-medium">Menedzser jogosultság</label>
				<select
					id="is_manager"
					name="is_manager"
					bind:value={formData.is_manager}
					onchange={(e) => {
						formData.is_manager ? (user_manager.value = null) : '';
					}}
					required
					class="mt-1 block w-full rounded-md px-3 py-2 ring-1 ring-black/10 duration-200 focus:ring-blue-600 focus:outline-none"
				>
					<option value={false}>Nem</option>
					<option value={true}>Igen</option>
				</select>
			</div>
			<div class="w-full text-start">
				<label class="block text-sm font-medium">Menedzser választása</label>
				<select
					id="user_manager"
					name="user_manager"
					bind:value={formData.user_manager}
					disabled={formData.is_manager}
					required
					class="mt-1 block w-full rounded-md px-3 py-2 ring-1 ring-black/10 duration-200 focus:ring-blue-600 focus:outline-none"
				>
					{#if formData.is_manager}
						<option value="null">Nincs menedzser</option>
					{/if}
					<option value="">Válassz menedzsert</option>
					{#each managers as manager}
						<option value={manager.id}
							>{manager.full_name} - {convertUserGroup(manager.user_role)}</option
						>
					{/each}
				</select>
			</div>
		</div>

		<!-- Submit Button -->
		<div class="mt-5 flex justify-end">
			<button
				type="submit"
				class="flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-2 text-white duration-200 hover:bg-blue-700"
			>
				<Save class="size-4" />
				Változtatások mentése
			</button>
		</div>
	</form>
</section>
