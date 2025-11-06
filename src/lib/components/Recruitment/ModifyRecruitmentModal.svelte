<script>
	import { page } from '$app/state';
	import { getUserInfoQuery } from '$lib/scripts/queries/user';
	import { formatPhoneNumber } from '$lib/scripts/utils';
	import { Notification } from '$lib/stores/notifications';
	import { createQuery } from '@tanstack/svelte-query';
	import { fade } from 'svelte/transition';
	import { CircleArrowRight } from 'lucide-svelte';
	import { modifyRecruitmentMutation } from '$lib/scripts/queries/recruitment';
	import recruitmentApi from '$lib/scripts/apis/recruitment';

	let { selected_recruitment = $bindable(), recruitmentModifyModalStore = $bindable() } = $props();

	const recruitment_data = $derived(
		createQuery({
			queryKey: ['recruitment', page.data.token, selected_recruitment],
			queryFn: async () =>
				await recruitmentApi({ user_token: page.data.token }).getByUuid(selected_recruitment),
			enabled: selected_recruitment !== undefined
		})
	);

	let recruitment = $state();
	$effect(async () => {
		if ($recruitment_data.status === 'success') {
			const full_name = $recruitment_data.data.full_name ?? '';
			const [last, ...rest] = full_name.split(' ');
			recruitment = {
				last_name: last ?? '',
				first_name: rest.join(' '),
				...$recruitment_data.data
			};
		}
	});

	let candidate = $state({
		last_name: '',
		first_name: '',
		email: '',
		description: '',
		phone_number: ''
	});

	const userInfoQuery = createQuery(getUserInfoQuery(page.data.token));
	const modifyRecruitment = modifyRecruitmentMutation(page.data.token);
	async function handleSubmit() {
		const payload = {
			full_name: `${last_name.value.trim()} ${first_name.value.trim()}`,
			email: email.value,
			phone_number: phone_number.value,
			description: description.value
		};

		const phone_number_length = payload.phone_number.length === 15;
		if (!phone_number_length) {
			Notification.error('Túl rövid telefonszám', 3);
			return;
		}

		$modifyRecruitment.mutate(
			{ recruitment_uuid: selected_recruitment, payload },
			{
				onSuccess: (data) => {
					Notification.success(data, 3);
					recruitmentModifyModalStore.close();
				}
			}
		);
	}
</script>

{#if $recruitmentModifyModalStore}
	<div
		transition:fade={{ duration: 200 }}
		class="fixed top-0 left-0 z-50 h-full w-full overflow-hidden"
	>
		<button
			class="h-full w-full cursor-default bg-black/30"
			onclick={recruitmentModifyModalStore.close}
			aria-label="Close modal"
		></button>
		<div
			class="fixed top-1/2 left-1/2 flex w-[36rem] -translate-1/2 flex-col rounded-lg bg-white p-4 text-center text-black shadow-2xl"
		>
			<h1 class="my-4 text-4xl font-semibold text-shadow-md">Jelölt módosítása</h1>

			<form onsubmit={handleSubmit} class="mt-5 flex flex-col gap-5">
				<div class="grid grid-cols-2 gap-4">
					<div class="flex flex-col text-start font-medium">
						<label for="last_name">Vezetéknév <span class="text-red-700">*</span></label>
						<input
							name="last_name"
							id="last_name"
							type="text"
							value={recruitment?.last_name}
							bind:this={candidate.last_name}
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
							value={recruitment?.first_name}
							bind:this={candidate.first_name}
							class="mt-1 block w-full rounded-md px-3 py-2 ring-1 ring-black/10 duration-200 focus:ring-blue-600 focus:outline-none"
							autocomplete="off"
							required
						/>
					</div>
				</div>
				<div class="flex flex-col text-start font-medium">
					<label for="email">Email <span class="text-red-700">*</span></label>
					<input
						name="email"
						id="email"
						type="email"
						value={recruitment?.email}
						bind:this={candidate.email}
						class="mt-1 block w-full rounded-md px-3 py-2 ring-1 ring-black/10 duration-200 focus:ring-blue-600 focus:outline-none"
						autocomplete="off"
						required
					/>
				</div>
				<div class="flex flex-col text-start font-medium">
					<label for="phone_number">Telefonszám <span class="text-red-700">*</span></label>
					<input
						name="phone_number"
						id="phone_number"
						type="text"
						value={recruitment?.phone_number}
						oninput={formatPhoneNumber}
						bind:this={candidate.phone_number}
						class="mt-1 block w-full rounded-md px-3 py-2 ring-1 ring-black/10 duration-200 focus:ring-blue-600 focus:outline-none"
						autocomplete="off"
						required
					/>
				</div>
				<div class="flex flex-col text-start font-medium">
					<label for="description">Hozzászólás</label>
					<textarea
						name="description"
						id="description"
						value={recruitment?.description}
						bind:this={candidate.description}
						class="mt-1 block w-full rounded-md px-3 py-2 ring-1 ring-black/10 duration-200 focus:ring-blue-600 focus:outline-none"
						autocomplete="off"
					></textarea>
				</div>
				<div class="flex justify-end">
					<button
						class="flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-2 text-white duration-200 hover:bg-blue-700"
					>
						<span>Jelölt módosítása</span>
						<CircleArrowRight class="size-4" />
					</button>
				</div>
			</form>
		</div>
	</div>
{/if}
