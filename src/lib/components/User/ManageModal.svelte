<script>
	import { BookUser, CalendarClock, FileUser, X } from 'lucide-svelte';
	import { fade } from 'svelte/transition';
	import { PersonalData, Contacts, Appointments, Contracts } from './UserManageSections';
	import { permissionsStore } from '$lib/stores/permissions';
	import { checkPermission } from '$lib/scripts/utils';
	import { page } from '$app/stores';
	import DeleteVerifyModal from './DeleteVerifyModal.svelte';

	let { user, userManageModal = $bindable() } = $props();

	let navTabs = $state({
		opened: 'Személyes adatok',
		tabs: [
			{ title: 'Személyes adatok', icon: FileUser },
			{ title: 'Címanyagok', icon: BookUser },
			{ title: 'Időpontok', icon: CalendarClock },
			{ title: 'Szerződések', icon: BookUser }
		]
	});
</script>

{#if $userManageModal.modals['Manage']}
	<div
		transition:fade={{ duration: 200 }}
		class="fixed top-0 left-0 z-50 h-full w-full overflow-hidden"
	>
		<button
			class="h-full w-full cursor-default bg-black/30"
			onclick={() => {
				userManageModal.close();
			}}
			aria-label="Close modal"
		></button>
		<div
			class="fixed top-1/2 left-1/2 h-[45rem] w-4/5 -translate-1/2 rounded-lg bg-white p-4 text-black shadow-2xl md:w-[80%] lg:w-[60%]"
		>
			<div class="h-16">
				<h1 class="text-xl font-bold">{user.info?.full_name || 'Üzletkötő'}</h1>
			</div>
			<div class="flex h-[calc(100%-4rem)] w-full flex-col rounded-lg ring ring-black/10">
				<div
					class="flex flex-col gap-2 border-b border-black/10 p-2 sm:flex-row sm:items-center sm:justify-between"
				>
					<div id="nav" class="grid grid-cols-2 gap-2 md:flex md:flex-wrap md:gap-2">
						{#each navTabs.tabs as tab}
							<button
								class="flex items-center rounded-lg px-3 py-2 text-sm font-medium duration-200 hover:scale-105"
								class:text-blue-600={navTabs.opened === tab.title}
								onclick={() => (navTabs.opened = tab.title)}
							>
								<tab.icon class="shrink-0 md:me-2" stroke-width={1.5} />
								<p>{tab.title}</p>
							</button>
						{/each}
					</div>

					{#if checkPermission('Leader', $permissionsStore.userRole)}
						<div class="flex justify-end text-nowrap">
							<button
								class="flex items-center rounded-lg px-3 py-2 text-sm font-medium text-red-500 duration-200 hover:scale-105 disabled:scale-100"
								onclick={() => {
									userManageModal.open('Delete');
								}}
								disabled={user.role === 'Leader'}
							>
								<X class="shrink-0" stroke-width={1.5} />
								<p>Szerződés bontása</p>
							</button>
							<DeleteVerifyModal {user} bind:userManageModal />
						</div>
					{/if}
				</div>

				<div class="overflow-y-auto p-3">
					{@render renderNavTab()}
				</div>
			</div>
		</div>
	</div>
{/if}

{#snippet renderNavTab()}
	{#if navTabs.opened === 'Személyes adatok'}
		<PersonalData {user} bind:userManageModal />
	{:else if navTabs.opened === 'Címanyagok'}
		<Contacts {user} />
	{:else if navTabs.opened === 'Időpontok'}
		<Appointments {user} />
	{:else if navTabs.opened === 'Szerződések'}
		<Contracts {user} />
	{/if}
{/snippet}
