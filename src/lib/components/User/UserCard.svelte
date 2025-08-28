<script>
	import { ArrowUpRight } from 'lucide-svelte';
	import { convertUserGroup } from '$lib/scripts/utils.js';
	import ManageModal from './ManageModal.svelte';
	import { createModalStore } from '$lib/stores/user';

	let { user } = $props();
	let userManageModal = $state(createModalStore(user.id));

	let isManageModalOpen = $state();
</script>

<div
	class="flex h-90 w-60 flex-col justify-end rounded-xl bg-[url(https://images.randomhouse.com/author/2197978)] bg-cover bg-center text-center shadow-[40px_15px_15px_-3px_rgba(0,0,0,0.1)]"
>
	<div class="rounded-b-lg bg-gradient-to-t from-black p-3 text-white">
		<div class="pb-3">
			<h3 class="font-bold">{user.info?.full_name || 'Ismeretlen'}</h3>
			<p>{convertUserGroup(user.user_role)}</p>
			<p>{user?.info?.agent_code || 'N/A'}</p>
			<p>{user?.info?.phone_number || 'N/A'}</p>
		</div>
		<button
			class="flex w-full justify-between rounded-lg bg-blue-600 px-5 py-2 font-medium duration-200 hover:scale-105 hover:bg-blue-700"
			onclick={() => {
				userManageModal.open('Manage');
			}}
		>
			<span>Kezelés</span>
			<ArrowUpRight />
		</button>
	</div>
</div>
{#if user}
	<ManageModal {user} bind:userManageModal />
{/if}
