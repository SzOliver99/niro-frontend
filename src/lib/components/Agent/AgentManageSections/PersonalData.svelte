<script>
	import { Check, Save } from 'lucide-svelte';

	let { agent } = $props();

	// Form data for personal information
	let formData = $state({
		lastName: '',
		firstName: '',
		email: '',
		phone: '',
		agentCode: '',
		userRole: '',
		isManager: false
	});

	// Initialize form data when agent changes
	$effect(() => {
		if (agent) {
			const fullName = agent.info?.full_name || '';
			const nameParts = fullName.split(' ');

			formData = {
				lastName: nameParts[0] || '',
				firstName: nameParts[1] || '',
				email: agent.email || '',
				phone: agent.info?.phone_number || '',
				agentCode: agent.info?.agent_code || '',
				hufaCode: agent.info?.hufa_code || '',
				userRole: agent.user_role || ''
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
					bind:value={formData.lastName}
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
					bind:value={formData.firstName}
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
					bind:value={formData.agentCode}
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
								bind:checked={formData.isManager}
								onchange={() => {
									if (formData.isManager) {
										formData.userRole = '';
									}
								}}
							/>
							<span
								class="ms-1 flex h-5 w-5 rounded border border-gray-300 bg-white duration-200 peer-checked:border-blue-600 peer-checked:bg-blue-600"
							>
								<!-- Use lucide-svelte Check icon instead of SVG -->
								{#if formData.isManager}
									<Check class="m-auto block size-4 text-white" />
								{/if}
							</span>
						</label>
					</div>
					<div class="w-full">
						<select
							id="userRole"
							name="userRole"
							bind:value={formData.userRole}
							disabled={formData.isManager}
							class="mt-1 block w-full rounded-md px-3 py-2 ring-1 ring-black/10 duration-200 focus:ring-blue-600 focus:outline-none"
						>
							<option value="">Nincs menedzser</option>
							<option value="manager1">John Doe - Menedzser</option>
							<option value="manager2">Jane Smith - Menedzser</option>
							<option value="manager3">Bob Johnson - Menedzser</option>
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
