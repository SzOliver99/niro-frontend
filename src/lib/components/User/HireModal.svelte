<script>
	import { page } from '$app/stores';
	import userApi from '$lib/scripts/apis/user';
	import { createUsersMutation } from '$lib/scripts/queries/user';
	import { convertUserGroup, formatNumberOnly, formatPhoneNumber } from '$lib/scripts/utils';
	import { Notification } from '$lib/stores/notifications';
	import { userHireModal } from '$lib/stores/user';
	import { createQuery } from '@tanstack/svelte-query';
	import { CircleArrowRight } from 'lucide-svelte';
	import { fade } from 'svelte/transition';

	let is_manager = $state();

	let managers = createQuery({
		queryKey: ['managers'],
		queryFn: () => userApi().getManagers()
	});

	const createUser = createUsersMutation($page.data.token);
	async function handleSubmit() {
		let agent = {
			email: email.value,
			username: username.value,
			password: password.value,
			info: {
				full_name: `${first_name.value} ${last_name.value}`,
				phone_number: phone_number.value,
				hufa_code: hufa_code.value,
				agent_code: agent_code.value
			}
		};
		if (+user_manager.value > 0) {
			agent['manager_id'] = +user_manager.value;
		}

		// Regex for validation
		const email_rgx = new RegExp(/\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/i);
		const phone_number_length = agent.info.phone_number.length === 15;
		const hufa_code_rgx = new RegExp(/\b[a-z]{2}\d{5}/g);
		const agent_code_rgx = new RegExp(/\d{7}/g);
		if (!email_rgx.test(agent.email.trim())) {
			Notification.error('Hibás email', 3);
			return;
		}
		if (!phone_number_length) {
			Notification.error('Túl rövid telefonszám', 3);
			return;
		}
		if (!hufa_code_rgx.test(agent.info.hufa_code.trim())) {
			Notification.error('Hibás HUFA kód', 3);
			return;
		}
		if (!agent_code_rgx.test(agent.info.agent_code.trim())) {
			Notification.error('Hibás üzletkötő kód', 3);
			return;
		}

		$createUser.mutate(agent, {
			onSuccess: () => {
				Notification.success('Sikeresen létrehoztad!', 3);
				userHireModal.close();
			}
		});
	}
</script>

{#if $userHireModal}
	<div
		transition:fade={{ duration: 200 }}
		class="fixed top-0 left-0 z-50 h-full w-full overflow-hidden"
	>
		<button
			class="h-full w-full cursor-default bg-black/30"
			onclick={userHireModal.close}
			aria-label="Close modal"
		></button>
		<div
			class="fixed top-1/2 left-1/2 flex w-[36rem] -translate-1/2 flex-col rounded-lg bg-white p-4 text-center text-black shadow-2xl"
		>
			<h1 class="my-4 text-4xl font-semibold text-shadow-md">Üzletkötő felvétele</h1>
			<form onsubmit={handleSubmit} class="mt-5 flex flex-col gap-5">
				<div class="flex flex-col text-start font-medium">
					<label for="email">Email-cím <span class="text-red-700">*</span></label>
					<input
						name="email"
						id="email"
						type="email"
						class="mt-1 block w-full rounded-md px-3 py-2 ring-1 ring-black/10 duration-200 focus:ring-blue-600 focus:outline-none"
						autocomplete="off"
						required
					/>
				</div>
				<div class="flex flex-col text-start font-medium">
					<label for="username">Felhasználónév <span class="text-red-700">*</span></label>
					<input
						name="username"
						id="username"
						type="text"
						class="mt-1 block w-full rounded-md px-3 py-2 ring-1 ring-black/10 duration-200 focus:ring-blue-600 focus:outline-none"
						autocomplete="off"
						required
					/>
				</div>
				<div class="flex flex-col text-start font-medium">
					<label for="password">Ideiglenes jelszó <span class="text-red-700">*</span></label>
					<input
						name="password"
						id="password"
						type="password"
						class="mt-1 block w-full rounded-md px-3 py-2 ring-1 ring-black/10 duration-200 focus:ring-blue-600 focus:outline-none"
						autocomplete="off"
						required
					/>
				</div>

				<h2 class="text-xl font-semibold">Üzletkötő adatai</h2>
				<div class="grid grid-cols-2 gap-4">
					<div class="flex flex-col text-start font-medium">
						<label for="last_name">Vezetéknév <span class="text-red-700">*</span></label>
						<input
							name="last_name"
							id="last_name"
							type="text"
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
						maxlength="15"
						type="tel"
						oninput={formatPhoneNumber}
						class="mt-1 block w-full rounded-md px-3 py-2 ring-1 ring-black/10 duration-200 focus:ring-blue-600 focus:outline-none"
						autocomplete="off"
						required
					/>
				</div>
				<div class="grid grid-cols-2 gap-4">
					<div class="flex flex-col text-start font-medium">
						<label for="hufa_code">Hufa kód <span class="text-red-700">*</span></label>
						<input
							name="hufa_code"
							id="hufa_code"
							maxlength="7"
							type="text"
							placeholder="ab12345"
							class="mt-1 block w-full rounded-md px-3 py-2 ring-1 ring-black/10 duration-200 focus:ring-blue-600 focus:outline-none"
							autocomplete="off"
							required
						/>
					</div>
					<div class="flex flex-col text-start font-medium">
						<label for="agent_code">Üzletkötő kód <span class="text-red-700">*</span></label>
						<input
							name="agent_code"
							id="agent_code"
							maxlength="7"
							type="text"
							placeholder="1234567"
							oninput={() => formatNumberOnly(agent_code)}
							class="mt-1 block w-full rounded-md px-3 py-2 ring-1 ring-black/10 duration-200 focus:ring-blue-600 focus:outline-none"
							autocomplete="off"
							required
						/>
					</div>
				</div>

				<div class="grid grid-cols-2 gap-4">
					<div class="text-start">
						<label for="is_manager" class="block text-sm font-medium">Menedzser jogosultság</label>
						<select
							id="is_manager"
							name="is_manager"
							bind:value={is_manager}
							onchange={is_manager ? () => (user_manager.value = null) : undefined}
							required
							class="mt-1 block w-full rounded-md px-3 py-2 ring-1 ring-black/10 duration-200 focus:ring-blue-600 focus:outline-none"
						>
							<option value={false}>Nem</option>
							<option value={true}>Igen</option>
						</select>
					</div>
					<div class="w-full text-start">
						<label for="user_manager" class="block text-sm font-medium"
							>Menedzser választása <span class="text-red-700">*</span></label
						>
						<select
							id="user_manager"
							name="user_manager"
							disabled={is_manager}
							required
							class="mt-1 block w-full rounded-md px-3 py-2 ring-1 ring-black/10 duration-200 focus:ring-blue-600 focus:outline-none"
						>
							{#if is_manager}
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
				</div>

				<div class="flex justify-end">
					<button
						class="flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-2 text-white duration-200 hover:bg-blue-700"
					>
						<span>Üzletkötő felvétele</span>
						<CircleArrowRight class="size-4" />
					</button>
				</div>
			</form>
		</div>
	</div>
{/if}
