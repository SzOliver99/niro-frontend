<script>
	import { page } from '$app/state';
	import { getUserInfoQuery } from '$lib/scripts/queries/user';
	import { formatPhoneNumber } from '$lib/scripts/utils';
	import { Notification } from '$lib/stores/notifications';
	import { createQuery } from '@tanstack/svelte-query';
	import { fade } from 'svelte/transition';
	import { CircleArrowRight } from 'lucide-svelte';
	import { modifyRecommendationMutation } from '$lib/scripts/queries/recommendation';
	import recommendationApi from '$lib/scripts/apis/recommendation';

	let { selected_recommendation = $bindable(), recommendationModifyModalStore = $bindable() } = $props();

	const recommendation_data = $derived(
		createQuery({
			queryKey: ['recommendation', page.data.token, selected_recommendation],
			queryFn: async () =>
				await recommendationApi({ user_token: page.data.token }).getByUuid(selected_recommendation),
			enabled: selected_recommendation !== undefined
		})
	);

	let rec = $state();
	$effect(async () => {
		if ($recommendation_data.status === 'success') {
			const full_name = $recommendation_data.data.full_name ?? '';
			const [last, ...rest] = full_name.split(' ');
			rec = {
				last_name: last ?? '',
				first_name: rest.join(' '),
				...$recommendation_data.data
			};
		}
	});

	const userInfoQuery = createQuery(getUserInfoQuery(page.data.token));
	const modifyRecommendation = modifyRecommendationMutation(page.data.token);

	async function handleSubmit() {
		const recommendation = {
			full_name: `${last_name.value.trim()} ${first_name.value.trim()}`,
			phone_number: phone_number.value,
			city: city.value,
			referral_name: recommender_name.value || $userInfoQuery.data.info.full_name
		};

		$modifyRecommendation.mutate(
			{ recommendation_uuid: selected_recommendation, recommendation },
			{
				onSuccess: (data) => {
					Notification.success(data, 3);
					recommendationModifyModalStore.close();
				}
			}
		);
	}
</script>

{#if $recommendationModifyModalStore}
	<div transition:fade={{ duration: 200 }} class="fixed top-0 left-0 z-50 h-full w-full overflow-hidden">
		<button
			class="h-full w-full cursor-default bg-black/30"
			onclick={recommendationModifyModalStore.close}
			aria-label="Close modal"
		></button>
		<div class="fixed top-1/2 left-1/2 flex w-[36rem] -translate-1/2 flex-col rounded-lg bg-white p-4 text-center text-black shadow-2xl">
			<h1 class="my-4 text-4xl font-semibold text-shadow-md">Ajánlás módosítása</h1>

			<form onsubmit={handleSubmit} class="mt-5 flex flex-col gap-5">
				<div class="grid grid-cols-2 gap-4">
					<div class="flex flex-col text-start font-medium">
						<label for="last_name">Vezetéknév <span class="text-red-700">*</span></label>
						<input
							name="last_name"
							id="last_name"
							type="text"
							value={rec?.last_name}
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
							value={rec?.first_name}
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
						type="text"
						value={rec?.phone_number}
						oninput={formatPhoneNumber}
						class="mt-1 block w-full rounded-md px-3 py-2 ring-1 ring-black/10 duration-200 focus:ring-blue-600 focus:outline-none"
						autocomplete="off"
						required
					/>
				</div>
				<div class="flex flex-col text-start font-medium">
					<label for="city">Település <span class="text-red-700">*</span></label>
					<input
						name="city"
						id="city"
						type="text"
						value={rec?.city}
						class="mt-1 block w-full rounded-md px-3 py-2 ring-1 ring-black/10 duration-200 focus:ring-blue-600 focus:outline-none"
						autocomplete="off"
						required
					/>
				</div>
				<div class="flex flex-col text-start font-medium">
					<label for="recommender_name">Ajánló neve <span class="text-red-700">*</span></label>
					<input
						name="recommender_name"
						id="recommender_name"
						type="text"
						value={rec?.referral_name ?? $userInfoQuery.data?.info?.full_name ?? ''}
						class="mt-1 block w-full rounded-md px-3 py-2 ring-1 ring-black/10 duration-200 focus:ring-blue-600 focus:outline-none"
						autocomplete="off"
						required
					/>
				</div>
				<div class="flex justify-end">
					<button class="flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-2 text-white duration-200 hover:bg-blue-700">
						<span>Ajánlás módosítása</span>
						<CircleArrowRight class="size-4" />
					</button>
				</div>
			</form>
		</div>
	</div>
{/if}
