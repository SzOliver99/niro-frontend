<script>
	import AgentCard from '$lib/components/Agent/AgentCard.svelte';
	import AgentHirePopover from '$lib/components/Agent/AgentHirePopover.svelte';
	import AgentSearch from '$lib/components/Agent/AgentSearch.svelte';
	import userApi from '$lib/scripts/apis/user';
	import { getUsersQuery } from '$lib/scripts/queries/user.js';
	import { createQuery } from '@tanstack/svelte-query';
	import { Plus } from 'lucide-svelte';

	let { data } = $props();

	let users = createQuery({
		queryKey: ['users', data.token],
		queryFn: () => userApi().getAllUsers(data.token),
		refetchInterval: 1000
	});

	let showModal = $state(false);
	function toggleModal() {
		showModal = !showModal;
	}
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
					onclick={toggleModal}
				>
					<Plus class="shrink-0" />
					<p>Üzletkötő felvétele</p>
				</button>
			</div>
			<AgentHirePopover bind:showModal {toggleModal} />
		</div>

		<div
			class="grid grid-cols-1 justify-items-center gap-y-15 rounded-lg p-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5"
		>
			{#each $users.data as user}
				<AgentCard agent={user} />
			{/each}
		</div>
	</div>
</section>
