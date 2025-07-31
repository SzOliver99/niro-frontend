<script>
	import Agent from '$lib/components/Agent/AgentCard.svelte';
	import AgentSearch from '$lib/components/Agent/AgentSearch.svelte';
	import { Plus } from 'lucide-svelte';
</script>

<section>
	<div class="my-5">
		<div
			class="mx-auto mb-4 grid w-1/2 grid-cols-1 items-center justify-between gap-2 rounded-lg p-2 ring ring-black/10 lg:grid-cols-2"
		>
			<h2 class="text-2xl font-medium">Munkatársak</h2>
			<!-- <AgentSearch /> -->
			<button
				class="bg-gray flex rounded-lg bg-blue-600 px-3 py-2 text-nowrap text-white duration-200 hover:bg-blue-700"
			>
				<Plus />
				<p>Üzletkötő felvevése</p>
			</button>
		</div>

		<div
			class="grid grid-cols-1 justify-items-center gap-y-15 rounded-lg p-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5"
		>
			<Agent
				agent={{
					full_name: 'asd',
					group: 'Üzletkötő',
					email: 'test@test.hu',
					phone_number: '0630 222 2222'
				}}
			/>
			<Agent
				agent={{
					full_name: 'asd',
					group: 'Üzletkötő',
					email: 'test@test.hu',
					phone_number: '0630 222 2222'
				}}
			/>
			<Agent
				agent={{
					full_name: 'asd',
					group: 'Üzletkötő',
					email: 'test@test.hu',
					phone_number: '0630 222 2222'
				}}
			/>
			<Agent
				agent={{
					full_name: 'asd',
					group: 'Üzletkötő',
					email: 'test@test.hu',
					phone_number: '0630 222 2222'
				}}
			/>
			<Agent
				agent={{
					full_name: 'asd',
					group: 'Üzletkötő',
					email: 'test@test.hu',
					phone_number: '0630 222 2222'
				}}
			/>
			<Agent
				agent={{
					full_name: 'asd',
					group: 'Üzletkötő',
					email: 'test@test.hu',
					phone_number: '0630 222 2222'
				}}
			/>
			<Agent
				agent={{
					full_name: 'asd',
					group: 'Üzletkötő',
					email: 'test@test.hu',
					phone_number: '0630 222 2222'
				}}
			/>
			<Agent
				agent={{
					full_name: 'asd',
					group: 'Üzletkötő',
					email: 'test@test.hu',
					phone_number: '0630 222 2222'
				}}
			/>
			<Agent
				agent={{
					full_name: 'asd',
					group: 'Üzletkötő',
					email: 'test@test.hu',
					phone_number: '0630 222 2222'
				}}
			/>
		</div>
	</div>
</section>
