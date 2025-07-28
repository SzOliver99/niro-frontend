<script>
	import Agent from '$lib/components/Agent/AgentCard.svelte';
	import AgentSearch from '$lib/components/Agent/AgentSearch.svelte';
	import { Plus } from 'lucide-svelte';
</script>

<section>
	<div class="my-5">
		<div class="mx-auto mb-4 flex w-1/2 items-center justify-between rounded-lg border p-2">
			<!-- <h2 class="text-2xl font-medium">Agents</h2> -->
			<AgentSearch />
			<button class="flex rounded-lg bg-gray px-3 py-2 text-white duration-200 hover:text-gold">
				<Plus />
				<p>Hire Agent</p>
			</button>
		</div>

		<div
			class="grid grid-cols-1 justify-items-center gap-y-15 rounded-lg p-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5"
		>
			<Agent />
			<Agent />
			<Agent />
			<Agent />
			<Agent />
			<Agent />
			<Agent />
			<Agent />
			<Agent />
			<Agent />
			<Agent />
			<Agent />
			<Agent />
		</div>
	</div>
</section>
