<script>
	import { page } from '$app/stores';
	import { fetchIsAnyPermission } from '$lib/scripts/apis/user';
	import {
		ArrowLeftToLine,
		ArrowRightFromLine,
		BookUser,
		Calendar,
		User,
		Users
	} from 'lucide-svelte';
	import { onMount } from 'svelte';
	let { isMenuOpen = $bindable(), data } = $props();

	const links = [
		{
			href: '/employee-management',
			title: 'Employees',
			permissionRequired: true,
			icon: Users
		},
		{ href: '/contacts', title: 'Contacts', permissionRequired: false, icon: BookUser },
		{ href: '', title: 'Home', permissionRequired: false, icon: Calendar },
		{ href: '', title: 'Home', permissionRequired: false, icon: Calendar },
		{ href: '', title: 'Home', permissionRequired: false, icon: Calendar },
		{ href: '', title: 'Home', permissionRequired: false, icon: Calendar }
	];

	let hasPermission = $state(false);
	onMount(async () => {
		let fetchPermission = await fetchIsAnyPermission(data.token);
		hasPermission = fetchPermission.data;
	});
</script>

<div
	class="sidebar relative flex h-full flex-col bg-[#F6F6F6] p-2 shadow-2xl transition-all duration-200"
	class:items-center={!isMenuOpen}
	class:rounded-r-lg={isMenuOpen}
	class:closed={!isMenuOpen}
>
	{#if isMenuOpen}
		<!-- OPENED SIDEBAR LAYOUT -->
		<div class="absolute top-6 right-4">
			<button onclick={() => (isMenuOpen = false)}>
				<ArrowLeftToLine class="duration-200 hover:text-[#FFCB74]" />
			</button>
		</div>
		<div class="ms-2 mt-3 flex">
			<a href="/" class="text-2xl font-bold text-black duration-200 text-shadow-md hover:text-gold"
				>Niro</a
			>
		</div>
		<div class="mt-5 flex flex-col font-medium">
			<a href="/profile" class="mb-6">Profile</a>
			{#each links as link}
				<a href={link.href}>{link.title}</a>
			{/each}
		</div>
	{:else}
		<!-- CLOSED SIDEBAR LAYOUT -->
		<div class="absolute top-6">
			<button onclick={() => (isMenuOpen = true)}>
				<ArrowRightFromLine class="duration-200 hover:text-gold" />
			</button>
		</div>
		<div
			class="flex h-full flex-col items-center justify-center gap-4 *:duration-200 *:hover:scale-115 *:hover:text-gold"
		>
			<a href="/profile" class="mb-6" title="Profile">
				<User
					strokeWidth={2}
					class="size-7 {$page.url.pathname.includes('/profile') ? 'scale-115 text-gold' : ''}"
				/>
			</a>
			{#each links as link}
				{#if !link.permissionRequired || hasPermission}
					<a href={link.href} title={link.title}>
						<link.icon
							strokeWidth={2}
							class="size-6 {$page.url.pathname === link.href ? 'scale-120 text-gold' : ''}"
						/>
					</a>
				{/if}
			{/each}
		</div>
	{/if}
</div>

<style>
	.sidebar {
		width: 12rem;
		min-width: 3rem;
		max-width: 12rem;
		transition: width 0.2s;
	}
	.sidebar.closed {
		width: 3rem;
	}
</style>
