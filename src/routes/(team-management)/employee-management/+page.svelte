<script>
	import UserCard from '$lib/components/User/UserCard.svelte';
	import HirePopover from '$lib/components/User/HireModal.svelte';
	import userApi from '$lib/scripts/apis/user';
	import { userHireModal } from '$lib/stores/user.js';
	import { createQuery } from '@tanstack/svelte-query';
	import { Plus } from 'lucide-svelte';

	let { data } = $props();

	const users = createQuery({
		queryKey: ['users', data.token],
		queryFn: () => userApi({ user_token: data.token }).getUsersById(),
		refetchInterval: 3000,
		refetchIntervalInBackground: false
	});
</script>

<section>
	<div class="my-5">
		<div
			class="mx-auto mb-4 flex w-1/2 min-w-65 flex-col items-center gap-2 rounded-lg p-2 ring ring-black/10 lg:flex-row"
		>
			<h2 class="w-full text-center text-2xl font-medium">Munkatársak</h2>

			<div class="flex justify-center lg:justify-end">
				<button
					class="bg-gray flex rounded-lg bg-blue-600 px-3 py-2 text-nowrap text-white duration-200 hover:bg-blue-700"
					onclick={userHireModal.open}
				>
					<Plus class="shrink-0" />
					<p>Üzletkötő felvétele</p>
				</button>
			</div>
			<HirePopover />
		</div>

		<div
			class="grid grid-cols-1 justify-items-center gap-y-15 rounded-lg p-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5"
		>
			{#each $users.data as user}
				<UserCard {user} />
			{/each}
		</div>
	</div>
</section>
