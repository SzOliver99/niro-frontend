<script>
	import { page } from '$app/stores';
	import Sidebar from '$lib/components/Sidebar.svelte';
	import { Search } from 'lucide-svelte';
	import '../app.css';

	let { children, data } = $props();

	let isMenuOpen = $state(true);
</script>

<div class="flex h-screen w-screen overflow-hidden bg-white">
	{#if data.token}
		<div>
			<Sidebar bind:isMenuOpen {data} />
		</div>
	{/if}

	<div class="m-2 flex-1 overflow-auto">
		{#if data.token}
			<header class="flex w-full items-center justify-between">
				<div>
					<button class="flex items-center rounded-md border px-3 py-1 text-black/30">
						<Search class="me-3 size-4" />
						<p class="me-5">Keresés...</p>
					</button>
				</div>
				<div>
					<a href="/profile">
						<img src="https://avatar.iran.liara.run/public/boy" class="w-12" alt="" />
					</a>
				</div>
			</header>
		{/if}
		<main>
			<!-- <img src={teszt} class="bg-black" alt="" /> -->
			{@render children()}
		</main>
		<footer></footer>
	</div>
</div>
