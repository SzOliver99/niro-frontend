<script>
	import { page } from '$app/stores';
	import Sidebar from '$lib/components/Sidebar.svelte';
	import '../app.css';

	let { children, data } = $props();

	let isMenuOpen = $state(false);
</script>

<div class="flex h-screen w-screen overflow-hidden bg-white">
	{#if data.token}
		<div>
			<Sidebar bind:isMenuOpen {data} />
		</div>
	{/if}
	<div class="m-2 flex-1 overflow-auto">
		<header></header>
		<main>
			{@render children()}
		</main>
		<footer></footer>
	</div>
</div>
