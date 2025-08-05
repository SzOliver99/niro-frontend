<script>
	import { page } from '$app/stores';
	import Sidebar from '$lib/components/Sidebar.svelte';
	import background from '$lib/images/background.png';
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

	<div
		class="relative m-2 h-full flex-1 overflow-auto bg-size-[60%] bg-center bg-no-repeat"
		style="background-image: url({background})"
	>
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
			{@render children()}
		</main>
		<footer></footer>
	</div>
</div>
