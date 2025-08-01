<script>
	import { ArrowUpRight } from 'lucide-svelte';

	let { agent } = $props();

	const convertUserGroup = (group) =>
		group === 'Leader' ? 'Hálózati igazgató' : group === 'Manager' ? 'Menedzser' : 'Üzletkötő';

	$inspect(agent); // DEBUG
</script>

<div
	class="flex h-100 w-65 flex-col justify-end rounded-xl bg-[url(https://images.randomhouse.com/author/2197978)] text-center shadow-[40px_15px_15px_-3px_rgba(0,0,0,0.1)]"
>
	<div class="rounded-b-lg bg-gradient-to-t from-black p-3 text-white">
		<div class="pb-3">
			<h3 class="font-bold">{agent?.user_info.full_name}</h3>
			<p>{convertUserGroup(agent?.user_group)}</p>
			<p>{agent?.user_info.agent_code}</p>
			<p>{agent?.user_info.phone_number}</p>
		</div>
		<button
			class="flex w-full justify-between rounded-lg bg-blue-600 px-5 py-2 font-medium duration-200 hover:scale-105 hover:bg-blue-700"
		>
			<span>Megnyitás</span>
			<ArrowUpRight />
		</button>
	</div>
</div>
