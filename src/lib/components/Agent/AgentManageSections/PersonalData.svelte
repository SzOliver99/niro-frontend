<script>
	import { getManagers } from '$lib/scripts/apis/user';
	import { convertUserGroup } from '$lib/scripts/utils';
	import { Check, Save } from 'lucide-svelte';
	import { onMount } from 'svelte';

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
		phone: '',
		agent_code: '',
		user_manager: '',
		is_manager: false
	});

	$effect(() => {
		if (agent) {
			const fullName = agent.info?.full_name || '';
			const nameParts = fullName.split(' ');

			formData = {
				last_name: nameParts[0] || '',
				first_name: nameParts[1] || '',
				email: agent.email || '',
				phone: agent.info?.phone_number || '',
				agent_code: agent.info?.agent_code || '',
				hufa_code: agent.info?.hufa_code || '',
				user_manager: agent.manager_id || 'null',
				is_manager: agent.manager_id === null
			};
		}
	});

	function handleSubmit(event) {
		event.preventDefault();

		console.log('Form submitted:', formData);
	}
</script>

<section class="w-full">
	<h2 class="mb-4 text-xl italic">Személyes adatok</h2>

	<form onsubmit={handleSubmit} class="rounded-lg">
		<div class="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
			<div>
				<label for="lastName" class="block text-sm font-medium">Vezetéknév*</label>
				<input
					type="text"
					id="lastName"
					name="lastName"
					placeholder="Doe"
					bind:value={formData.last_name}
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
				<label for="phone" class="block text-sm font-medium">Telefonszám*</label>
				<input
					type="tel"
					id="phone"
					name="phone"
					placeholder="+36 12 345 7891"
					bind:value={formData.phone}
					required
					class="mt-1 block w-full rounded-md px-3 py-2 ring-1 ring-black/10 duration-200 focus:ring-blue-600 focus:outline-none"
				/>
			</div>
			<div>
				<label for="hufaCode" class="block text-sm font-medium">HUFA kód</label>
				<input
					type="text"
					id="hufaCode"
					name="hufaCode"
					placeholder="AG001"
					bind:value={formData.hufaCode}
					readonly
					class="mt-1 block w-full cursor-not-allowed rounded-md bg-gray-50 px-3 py-2 ring-1 ring-black/10"
				/>
			</div>
			<div>
				<label for="agentCode" class="block text-sm font-medium">Ügynökségi kód</label>
				<input
					type="text"
					id="agentCode"
					name="agentCode"
					placeholder="AG001"
					bind:value={formData.agent_code}
					readonly
					class="mt-1 block w-full cursor-not-allowed rounded-md bg-gray-50 px-3 py-2 ring-1 ring-black/10"
				/>
			</div>
			<div>
				<label for="userRole" class="block text-sm font-medium">Menedzser</label>
				<div class="flex items-center gap-3">
					<div class="flex flex-col">
						<label class="flex cursor-pointer select-none">
							<input
								type="checkbox"
								class="peer sr-only"
								bind:checked={formData.is_manager}
								onchange={() => {
									if (formData.is_manager) {
										user_manager.value = null;
									}
								}}
							/>
							<span
								class="ms-1 flex h-5 w-5 rounded border border-gray-300 bg-white duration-200 peer-checked:border-blue-600 peer-checked:bg-blue-600"
							>
								<!-- Use lucide-svelte Check icon instead of SVG -->
								{#if formData.is_manager}
									<Check class="m-auto block size-4 text-white" />
								{/if}
							</span>
						</label>
					</div>
					<div class="w-full">
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
							{#each managers as manager}
								<option value={manager.id}
									>{manager.full_name} - {convertUserGroup(manager.user_role)}</option
								>
							{/each}
						</select>
					</div>
				</div>
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
