<script>
	import { page } from '$app/state';
	import userApi from '$lib/scripts/apis/user';
	import { updateManagersMutation, updateUsersMutation } from '$lib/scripts/queries/user';
	import {
		checkPermission,
		convertUserGroup,
		formatNumberOnly,
		formatPhoneNumber
	} from '$lib/scripts/utils';
	import { Notification } from '$lib/stores/notifications';
	import { permissionsStore } from '$lib/stores/permissions';
	import { createQuery } from '@tanstack/svelte-query';
	import { Save } from 'lucide-svelte';
	import { onMount } from 'svelte';

	let { user, userManageModal = $bindable() } = $props();

	let managers = createQuery({
		queryKey: ['managers', user.uuid],
		queryFn: () => userApi({ user_token: page.data.token }).getManagers(user.uuid)
	});

	let is_manager = $state(!user.manager_uuid ? true : false);
	let manager_uuid = $state(user.manager_uuid ?? null);

	const updateUser = updateUsersMutation(page.data.token);
	async function handleSubmit(event) {
		event.preventDefault();
		let user_data = {
			user_uuid: user.uuid,
			email: email.value.trim(),
			info: {
				full_name: `${last_name.value.trim()} ${first_name.value.trim()}`,
				phone_number: phone_number.value,
				hufa_code: hufa_code.value.trim(),
				agent_code: agent_code.value.trim()
			}
		};

		const email_rgx = new RegExp(/\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/i);
		const phone_number_length = user_data.info.phone_number.length === 15;
		const hufa_code_rgx = new RegExp(/\b[a-z]{2}\d{5}/g);
		const agent_code_rgx = new RegExp(/\d{7}/g);
		if (!email_rgx.test(user_data.email.trim())) {
			Notification.error('Hibás email', 3);
		}
		if (!phone_number_length) {
			Notification.error('Túl rövid telefonszám', 3);
		}
		if (!hufa_code_rgx.test(user_data.info.hufa_code.trim())) {
			Notification.error('Hibás HUFA kód', 3);
		}
		if (!agent_code_rgx.test(user_data.info.agent_code.trim())) {
			Notification.error('Hibás dolgozói kód', 3);
		}

		$updateUser.mutate(user_data, {
			onSuccess: () => {
				Notification.success('Sikeresen elmentetted', 3);
				userManageModal.close();
			}
		});
	}

	const updateManagers = updateManagersMutation(page.data.token);
	async function handleModifyUserManager(manager_uuid = null) {
		let user_data = {
			user_uuid: user.uuid
		};
		if (manager_uuid) {
			user_data['manager_uuid'] = manager_uuid;
		}

		$updateManagers.mutate(user_data, {
			onSuccess: () => {
				Notification.success('Sikeresen elmentetted', 3);
				userManageModal.close();
			}
		});
	}
</script>

<section class="w-full">
	<h2 class="mb-4 text-xl italic">Személyes adatok</h2>

	<form onsubmit={handleSubmit} class="rounded-lg">
		<div class="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
			<div>
				<label for="username" class="block text-sm font-medium">Felhasználónév</label>
				<input
					type="text"
					id="username"
					name="username"
					placeholder="Doe"
					value={user.username}
					disabled
					required
					class="mt-1 block w-full rounded-md px-3 py-2 ring-1 ring-black/10 duration-200 focus:ring-blue-600 focus:outline-none disabled:text-gray-500"
				/>
			</div>
		</div>
		<div class="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
			<div>
				<label for="last_name" class="block text-sm font-medium"
					>Vezetéknév <span class="text-red-700">*</span></label
				>
				<input
					type="text"
					id="last_name"
					name="last_name"
					placeholder="Doe"
					value={user.info.full_name.split(' ')[0]}
					required
					class="mt-1 block w-full rounded-md px-3 py-2 ring-1 ring-black/10 duration-200 focus:ring-blue-600 focus:outline-none"
				/>
			</div>
			<div>
				<label for="first_name" class="block text-sm font-medium"
					>Keresztnév <span class="text-red-700">*</span></label
				>
				<input
					type="text"
					id="first_name"
					name="first_name"
					placeholder="John"
					value={user.info.full_name.split(' ')[1]}
					required
					class="mt-1 block w-full rounded-md px-3 py-2 ring-1 ring-black/10 duration-200 focus:ring-blue-600 focus:outline-none"
				/>
			</div>
			<div>
				<label for="email" class="block text-sm font-medium"
					>Email-cím <span class="text-red-700">*</span></label
				>
				<input
					type="email"
					id="email"
					name="email"
					placeholder="test@test.hu"
					value={user.email}
					required
					class="mt-1 block w-full rounded-md px-3 py-2 ring-1 ring-black/10 duration-200 focus:ring-blue-600 focus:outline-none"
				/>
			</div>
			<div>
				<label for="phone_number" class="block text-sm font-medium"
					>Telefonszám <span class="text-red-700">*</span></label
				>
				<input
					id="phone_number"
					name="phone_number"
					type="tel"
					maxlength="15"
					placeholder="+36 12 345 7891"
					oninput={formatPhoneNumber}
					value={user.info.phone_number}
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
					value={user.info.hufa_code}
					class="mt-1 block w-full rounded-md px-3 py-2 ring-1 ring-black/10 duration-200 focus:ring-blue-600 focus:outline-none"
				/>
			</div>
			<div>
				<label for="agent_code" class="block text-sm font-medium">Dolgozói kód</label>
				<input
					type="text"
					id="agent_code"
					name="agent_code"
					maxlength="7"
					placeholder="1234567"
					oninput={() => formatNumberOnly(agent_code)}
					value={user.info.agent_code}
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
						bind:value={is_manager}
						disabled={user.user_role === 'Leader'}
						onchange={() => {
							manager_uuid = null;
							if (is_manager) {
								handleModifyUserManager();
							}
						}}
						required
						class="mt-1 block w-full rounded-md px-3 py-2 ring-1 ring-black/10 duration-200 focus:ring-blue-600 focus:outline-none disabled:text-gray-500"
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
						value={manager_uuid}
						disabled={is_manager}
						onchange={() => handleModifyUserManager(user_manager.value)}
						class="mt-1 block w-full rounded-md px-3 py-2 ring-1 ring-black/10 duration-200 focus:ring-blue-600 focus:outline-none disabled:text-gray-500"
					>
						{#if is_manager}
							<option value={null}>Nincs menedzser</option>
						{:else}
							<option value={null}>Válassz menedzsert</option>
						{/if}
						{#each $managers.data as manager}
							<option value={manager.uuid}
								>{manager.full_name} - {convertUserGroup(manager.user_role)}</option
							>
						{/each}
					</select>
				</div>
			{/if}
		</div>
	</form>
</section>
