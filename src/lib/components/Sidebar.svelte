<script>
	import { page } from '$app/stores';
	import { fetchIsAnyPermission } from '$lib/scripts/apis/user';
	import {
		ArrowLeftToLine,
		ArrowRightFromLine,
		BookUser,
		Calendar,
		Home,
		User,
		Users
	} from 'lucide-svelte';
	import { onMount } from 'svelte';
	let { isMenuOpen = $bindable(), data } = $props();

	const sidebarSections = {
		sales: {
			category: 'Értékesítés',
			permissionRequired: false,
			items: [
				{ href: '/contacts', label: 'Címanyag', icon: BookUser },
				{ href: '/contracts', label: 'Szerződések', icon: BookUser },
				{ href: '/intervention-tasks', label: 'Intervenciós feladatok', icon: BookUser },
				{ href: '/calendar', label: 'Naptár', icon: BookUser }
			]
		},
		teamManagement: {
			category: 'Csapat Menedzsment',
			permissionRequired: true,
			items: [
				{ href: '/employee-management', label: 'Üzletkötők', icon: BookUser },
				{ href: '/performance', label: 'Teljesítmények', icon: BookUser }
			]
		},
		usefulLinks: {
			category: 'Hasznos Linkek',
			permissionRequired: false,
			items: [
				{ href: '', label: 'E-learning', icon: BookUser },
				{ href: '', label: 'AKP', icon: BookUser },
				{ href: '', label: 'Kártyás Díjfizetés', icon: BookUser },
				{ href: '', label: 'Drive', icon: BookUser }
			]
		}
	};

	let hasPermission = $state(false);
	onMount(async () => {
		let fetchPermission = await fetchIsAnyPermission(data.token);
		hasPermission = fetchPermission.data;
	});
</script>

<div
	class="sidebar relative flex h-full flex-col bg-white p-2 shadow-2xl transition-all duration-200"
	class:items-center={!isMenuOpen}
	class:rounded-r-lg={isMenuOpen}
	class:closed={!isMenuOpen}
>
	{#if isMenuOpen}
		<!-- OPENED SIDEBAR LAYOUT -->
		<div class="absolute top-6 right-4">
			<button onclick={() => (isMenuOpen = false)}>
				<ArrowLeftToLine class="duration-200 hover:text-blue-600" />
			</button>
		</div>
		<div class="ms-2 mt-3 flex">
			<a
				href="/"
				class="text-2xl font-bold text-black duration-200 text-shadow-md hover:text-blue-600"
				>Niro</a
			>
		</div>
		<div class="flex h-full flex-col justify-center gap-8 text-sm text-nowrap">
			<!-- SALES -->
			<div>
				<h3
					class="mb-2 bg-gradient-to-r from-blue-600 to-pink bg-clip-text font-medium text-transparent uppercase"
				>
					{sidebarSections.sales.category}
				</h3>

				<ul class="flex flex-col text-start">
					{#each sidebarSections.sales.items as link}
						<li>
							{#if !link.permissionRequired || hasPermission}
								<a
									href={link.href}
									title={link.label}
									class="group flex items-center gap-2 rounded-lg px-2 py-1 *:duration-200 {$page
										.url.pathname === link.href
										? 'bg-gray-50/60 text-blue-600'
										: ''}"
								>
									<link.icon class="text-blue-600 group-hover:scale-115" />
									<p class="group-hover:text-blue-600">{link.label}</p>
								</a>
							{/if}
						</li>
					{/each}
				</ul>
			</div>

			<!-- TEAM MANAGEMENT -->
			<div>
				<h3
					class="mb-2 bg-gradient-to-r from-blue-600 to-pink bg-clip-text font-medium text-transparent uppercase"
				>
					{sidebarSections.teamManagement.category}
				</h3>

				<ul class="flex flex-col text-start">
					{#each sidebarSections.teamManagement.items as link}
						<li>
							{#if !link.permissionRequired || hasPermission}
								<a
									href={link.href}
									title={link.label}
									class="group flex items-center gap-2 rounded-lg px-2 py-1 *:duration-200 {$page
										.url.pathname === link.href
										? 'bg-gray-50/60 text-blue-600'
										: ''}"
								>
									<link.icon class="text-blue-600 group-hover:scale-115" />
									<p class="group-hover:text-blue-600">{link.label}</p>
								</a>
							{/if}
						</li>
					{/each}
				</ul>
			</div>
			<!-- USEFUL LINKS -->
			<div>
				<h3
					class="mb-2 bg-gradient-to-r from-blue-600 to-pink bg-clip-text font-medium text-transparent uppercase"
				>
					{sidebarSections.usefulLinks.category}
				</h3>

				<ul class="flex flex-col text-start">
					{#each sidebarSections.usefulLinks.items as link}
						<li>
							{#if !link.permissionRequired || hasPermission}
								<a
									href={link.href}
									title={link.label}
									class="group flex items-center gap-2 rounded-lg px-2 py-1 *:duration-200 {$page
										.url.pathname === link.href
										? 'bg-gray-50/60 text-blue-600'
										: ''}"
								>
									<link.icon class="text-blue-600 group-hover:scale-115" />
									<p class="group-hover:text-blue-600">{link.label}</p>
								</a>
							{/if}
						</li>
					{/each}
				</ul>
			</div>
		</div>
	{:else}
		<!-- CLOSED SIDEBAR LAYOUT -->
		<div class="absolute top-6">
			<button onclick={() => (isMenuOpen = true)}>
				<ArrowRightFromLine class="duration-200 hover:text-blue-600" />
			</button>
		</div>
		<div
			class="flex h-full flex-col items-center justify-center gap-4 *:duration-200 *:hover:scale-115 *:hover:text-blue-600"
		>
			<!-- SALES -->
			{#each sidebarSections.sales.items as link}
				{#if !link.permissionRequired || hasPermission}
					<a href={link.href} title={link.title}>
						<link.icon
							strokeWidth={2}
							class="size-6 {$page.url.pathname === link.href ? 'scale-120 text-blue-600' : ''}"
						/>
					</a>
				{/if}
			{/each}

			<!-- SALES -->
			{#each sidebarSections.teamManagement.items as link}
				{#if !link.permissionRequired || hasPermission}
					<a href={link.href} title={link.title}>
						<link.icon
							strokeWidth={2}
							class="size-6 {$page.url.pathname === link.href ? 'scale-120 text-blue-600' : ''}"
						/>
					</a>
				{/if}
			{/each}

			<!-- SALES -->
			{#each sidebarSections.usefulLinks.items as link}
				{#if !link.permissionRequired || hasPermission}
					<a href={link.href} title={link.title}>
						<link.icon
							strokeWidth={2}
							class="size-6 {$page.url.pathname === link.href ? 'scale-120 text-blue-600' : ''}"
						/>
					</a>
				{/if}
			{/each}
		</div>
	{/if}
</div>

<style>
	.sidebar {
		width: 15rem;
		min-width: 3rem;
		max-width: 15rem;
		transition: width 0.2s;
	}
	.sidebar.closed {
		width: 3rem;
	}
</style>
