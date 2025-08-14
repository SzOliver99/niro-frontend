<script>
	import Agent from '$lib/components/Agent/AgentCard.svelte';
	import AgentHirePopover from '$lib/components/Agent/AgentHirePopover.svelte';
	import AgentSearch from '$lib/components/Agent/AgentSearch.svelte';
	import { getAllUsers } from '$lib/scripts/apis/user';
	import { Plus } from 'lucide-svelte';

	let { data } = $props();
	let users = $state([]);

	$effect.pre(async () => {
		let fetch_users = await getAllUsers(data.token);
		users = await fetch_users.json();
	});

	let showModal = $state(false);
	function toggleModal() {
		showModal = !showModal;
	}
</script>

<section>
	<div class="my-5">
		<div
			class="mx-auto mb-4 w-1/2 flex flex-col min-w-65 items-center gap-2 rounded-lg p-2 ring ring-black/10 lg:flex-row"
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
			<AgentHirePopover bind:showModal {toggleModal} {data} />
		</div>

		<div
			class="grid grid-cols-1 justify-items-center gap-y-15 rounded-lg p-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5"
		>
			{#each users as user}
				<Agent agent={user} />
			{/each}
		</div>
	</div>
</section>
