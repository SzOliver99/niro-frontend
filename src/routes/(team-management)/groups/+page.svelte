<script>
	import Agent from '$lib/components/Agent/AgentCard.svelte';
	import AgentHirePopover from '$lib/components/Agent/AgentHirePopover.svelte';
	import AgentSearch from '$lib/components/Agent/AgentSearch.svelte';
	import { getManagerGroup } from '$lib/scripts/apis/user';
	import { Plus } from 'lucide-svelte';

	let { data } = $props();
	let users = $state([]);

	$effect.pre(async () => {
		let fetch_users = await getManagerGroup(data.token);
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
			class="mx-auto mb-4 w-1/2 min-w-65 gap-2 rounded-lg p-2 text-center ring ring-black/10 lg:grid-cols-2"
		>
			<h2 class="text-2xl font-medium">Saját csoport</h2>
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
