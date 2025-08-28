<script>
	import { page } from '$app/stores';
	import { permissionsStore } from '$lib/stores/permissions.js';
	import { checkPermission } from '$lib/scripts/utils.js';
	import {
		ArrowLeftToLine,
		ArrowRightFromLine,
		Banknote,
		BookUser,
		Calendar1,
		CalendarClock,
		ChartCandlestick,
		ChartNoAxesColumnIncreasing,
		ChartNoAxesCombined,
		ChartPie,
		Clock1,
		CreditCard,
		Crown,
		Dumbbell,
		FileWarning,
		Goal,
		GraduationCap,
		HardDrive,
		LaptopMinimalCheck,
		ReceiptText,
		Table,
		User,
		UserRoundSearch,
		Users
	} from 'lucide-svelte';
	import { sideBarStore } from '$lib/stores/sidebar';

	let { data } = $props();

	const sidebarSections = {
		sales: {
			category: 'Értékesítés',
			permissionRequired: false,
			items: [
				{ href: '/customers', label: 'Ügyfelek', icon: UserRoundSearch },
				{ href: '/leads', label: 'Címanyag', icon: Table },
				{ href: '/dates', label: 'Időpontok', icon: CalendarClock },
				{ href: '/offers', label: 'Ajánlások', icon: Crown },
				{ href: '/contracts', label: 'Szerződések', icon: ReceiptText },
				{ href: '/intervention-tasks', label: 'Intervenciós feladatok', icon: FileWarning },
				{ href: '/to-do', label: 'Teendők', icon: Calendar1 },
				{ href: '/goals', label: 'Célok', icon: Goal }
			]
		},
		teamManagement: {
			category: 'Csapat Menedzsment',
			permissionRequired: true,
			items: [
				{ href: '/employee-management', label: 'Üzletkötők', icon: BookUser, minRole: 'Leader' },
				{ href: '/recruitment', label: 'Toborzás', icon: ChartNoAxesCombined, minRole: 'Manager' },
				{ href: '/groups', label: 'Csoportok', icon: Users, minRole: 'Manager' },
				{ href: '/performance', label: 'Teljesítmény', icon: ChartPie, minRole: 'Manager' }
			]
		},
		usefulLinks: {
			category: 'Hasznos Linkek',
			permissionRequired: false,
			items: [
				{ href: 'https://e-learning.allianz.hu/', label: 'E-learning', icon: GraduationCap },
				{ href: 'https://ap.allianz.hu/', label: 'AKP', icon: LaptopMinimalCheck },
				{ href: 'https://allianz.hu/dijfizetes', label: 'Online Díjfizetés', icon: CreditCard },
				{
					href: 'https://drive.google.com/drive/u/0/folders/1klH7FsF30U7tNM8yKJgIZFqLX23qxKCO',
					label: 'Drive',
					icon: HardDrive
				},
				{
					href: 'https://www.allianz.hu/hu_HU/lakossagi/karbejelentes-es-ugyintezes/online-ugyintezes.html#TabVerticalNegative12102971254',
					label: 'Allianz bankszámlaszám',
					icon: Banknote
				},
				{
					href: 'https://invisualist.com/hu/auth/login',
					label: 'Invisualist',
					icon: ChartCandlestick
				}
			]
		}
	};

	$effect.pre(async () => {
		if (data.token) {
			await permissionsStore.checkPermissions(data.token);
		}
	});
</script>

<div
	class="sidebar relative flex h-full flex-col bg-white p-2 shadow-2xl transition-all duration-200"
	class:items-center={!$sideBarStore}
	class:rounded-r-lg={$sideBarStore}
	class:closed={!$sideBarStore}
>
	<!-- Toggle button -->
	{#if $sideBarStore}
		<div class="absolute top-6 right-4">
			<button onclick={sideBarStore.close}>
				<ArrowLeftToLine class="duration-200 hover:text-blue-600" />
			</button>
		</div>
	{:else}
		<div class="absolute top-6">
			<button onclick={sideBarStore.open}>
				<ArrowRightFromLine class="duration-200 hover:text-blue-600" />
			</button>
		</div>
	{/if}

	<!-- Logo -->
	<div class="ms-2 mt-3 flex text-nowrap">
		{#if $sideBarStore}
			<a
				href="/"
				class="text-2xl font-bold text-black duration-200 text-shadow-md hover:text-blue-600"
				>NIRO CRM</a
			>
		{/if}
	</div>

	<!-- Navigation sections -->
	<div class="flex h-full flex-col justify-center gap-8 text-sm text-nowrap">
		{#if !sidebarSections.sales.permissionRequired || $permissionsStore.hasPermission}
			<!-- SALES -->
			<div>
				<h3
					class="mb-2 bg-gradient-to-r from-blue-600 to-pink bg-clip-text font-medium text-transparent uppercase"
				>
					{#if $sideBarStore}
						{sidebarSections.sales.category}
					{:else}
						<p class="text-center">...</p>
					{/if}
				</h3>

				<ul class="flex flex-col text-start">
					{#each sidebarSections.sales.items as link}
						<li>
							<a
								href={link.href}
								title={link.label}
								class="group flex items-center gap-2 rounded-lg px-2 py-1 *:duration-200 {$page.url
									.pathname === link.href
									? 'bg-gray-50/60 text-blue-600'
									: ''}"
							>
								<link.icon class="shrink-0 text-blue-600 group-hover:scale-115" />
								{#if $sideBarStore}
									<p class="group-hover:text-blue-600">{link.label}</p>
								{/if}
							</a>
						</li>
					{/each}
				</ul>
			</div>
		{/if}

		<!-- TEAM MANAGEMENT -->
		{#if !sidebarSections.teamManagement.permissionRequired || $permissionsStore.hasPermission}
			<div>
				<h3
					class="mb-2 bg-gradient-to-r from-blue-600 to-pink bg-clip-text font-medium text-transparent uppercase"
				>
					{#if $sideBarStore}
						{sidebarSections.teamManagement.category}
					{:else}
						<p class="text-center">...</p>
					{/if}
				</h3>

				<ul class="flex flex-col text-start">
					{#each sidebarSections.teamManagement.items as link}
						{#if checkPermission(link.minRole, $permissionsStore.userRole)}
							<!-- TODO: NOT WORKING THE PERMISSION SYSTEM -->
							<li>
								<a
									href={link.href}
									title={link.label}
									class="group flex items-center gap-2 rounded-lg px-2 py-1 *:duration-200 {$page
										.url.pathname === link.href
										? 'bg-gray-50/60 text-blue-600'
										: ''}"
								>
									<link.icon class="shrink-0 text-blue-600 group-hover:scale-115" />
									{#if $sideBarStore}
										<p class="group-hover:text-blue-600">{link.label}</p>
									{/if}
								</a>
							</li>
						{/if}
					{/each}
				</ul>
			</div>
		{/if}

		<!-- USEFUL LINKS -->
		{#if !sidebarSections.usefulLinks.permissionRequired || $permissionsStore.hasPermission}
			<div>
				<h3
					class="mb-2 bg-gradient-to-r from-blue-600 to-pink bg-clip-text font-medium text-transparent uppercase"
				>
					{#if $sideBarStore}
						{sidebarSections.usefulLinks.category}
					{:else}
						<p class="text-center">...</p>
					{/if}
				</h3>

				<ul class="flex flex-col text-start">
					{#each sidebarSections.usefulLinks.items as link}
						<li>
							<a
								href={link.href}
								title={link.label}
								target="_blank"
								class="group flex items-center gap-2 rounded-lg px-2 py-1 *:duration-200 {$page.url
									.pathname === link.href
									? 'bg-gray-50/60 text-blue-600'
									: ''}"
							>
								<link.icon class="shrink-0 text-blue-600 group-hover:scale-115" />
								{#if $sideBarStore}
									<p class="group-hover:text-blue-600">{link.label}</p>
								{/if}
							</a>
						</li>
					{/each}
				</ul>
			</div>
		{/if}
	</div>
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
