<script>
	import { page } from '$app/stores';
	import userApi from '$lib/scripts/apis/user';
	import { updateManagersMutation, updateUsersMutation } from '$lib/scripts/queries/user';
	import { checkPermission, convertUserGroup, formatPhoneNumber } from '$lib/scripts/utils';
	import { Notification } from '$lib/stores/notifications';
	import { permissionsStore } from '$lib/stores/permissions';
	import { userManageModalsStore } from '$lib/stores/user';
	import { createQuery } from '@tanstack/svelte-query';
	import { Check, Save } from 'lucide-svelte';

	let { agent, userManageModalStore = $bindable() } = $props();

	let managers = createQuery({
		queryKey: ['managers', agent.id],
		queryFn: () => userApi().getManagers(agent.id)
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

	const updateUser = updateUsersMutation($page.data.token);
	async function handleSubmit(event) {
		event.preventDefault();

		let user = {
			id: agent.id,
			email: formData.email,
			info: {
				full_name: `${formData.last_name} ${formData.first_name}`,
				phone_number: formData.phone_number,
				hufa_code: formData.hufa_code,
				agent_code: formData.agent_code
			}
		};
		const email_rgx = new RegExp(/\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/i);
		const phone_number_length = user.info.phone_number.length === 15;
		const hufa_code_rgx = new RegExp(/\b[a-z]{2}\d{5}/g);
		const agent_code_rgx = new RegExp(/\d{7}/g);
		if (!email_rgx.test(user.email.trim())) {
			Notification.error('Hibás email', 3);
		}
		if (!phone_number_length) {
			Notification.error('Túl rövid telefonszám', 3);
		}
		if (!hufa_code_rgx.test(user.info.hufa_code.trim())) {
			Notification.error('Hibás HUFA kód', 3);
		}
		if (!agent_code_rgx.test(user.info.agent_code.trim())) {
			Notification.error('Hibás üzletkötő kód', 3);
		}

		$updateUser.mutate(user, {
			onSuccess: () => {
				Notification.success('Sikeresen elmentetted', 3);
				userManageModalStore.close();
			}
		});
	}

	const updateManagers = updateManagersMutation($page.data.token);
	async function handleModifyUserManager(manager_id = null) {
		let user = {
			id: agent.id
		};
		if (manager_id) {
			user['manager_id'] = manager_id;
		}

		$updateManagers.mutate(user, {
			onSuccess: () => {
				Notification.success('Sikeresen elmentetted', 3);
				userManageModalStore.close();
			}
		});
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
					maxlength="7"
					placeholder="ab12345"
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
					maxlength="7"
					placeholder="1234567"
					bind:value={formData.agent_code}
					class="mt-1 block w-full rounded-md px-3 py-2 ring-1 ring-black/10 duration-200 focus:ring-blue-600 focus:outline-none"
				/>
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

		<div class="mt-3 grid grid-cols-2 gap-4">
			{#if checkPermission('Leader', $permissionsStore.userRole)}
				<div>
					<label for="is_manager" class="block text-sm font-medium">Menedzser jogosultság</label>
					<select
						id="is_manager"
						name="is_manager"
						bind:value={formData.is_manager}
						onchange={() => {
							if (formData.is_manager) {
								user_manager.value = null;
								handleModifyUserManager();
							}
						}}
						disabled={agent.user_role === 'Leader'}
						required
						class="mt-1 block w-full rounded-md px-3 py-2 ring-1 ring-black/10 duration-200 focus:ring-blue-600 focus:outline-none"
					>
						<option value={false}>Nem</option>
						<option value={true}>Igen</option>
					</select>
				</div>
				<div>
					<label for="user_manager" class="block text-sm font-medium">Menedzser választása</label>
					<select
						id="user_manager"
						name="user_manager"
						bind:value={formData.user_manager}
						disabled={formData.is_manager}
						onchange={() => handleModifyUserManager(+user_manager.value)}
						required
						class="mt-1 block w-full rounded-md px-3 py-2 ring-1 ring-black/10 duration-200 focus:ring-blue-600 focus:outline-none"
					>
						{#if formData.is_manager}
							<option value="null">Nincs menedzser</option>
						{/if}
						<option value="">Válassz menedzsert</option>
						{#each $managers.data as manager}
							<option value={manager.id}
								>{manager.full_name} - {convertUserGroup(manager.user_role)}</option
							>
						{/each}
					</select>
				</div>
			{/if}
		</div>
	</form>
</section>
