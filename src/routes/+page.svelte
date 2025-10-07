<script>
	import HomePage from '$lib/components/HomePage.svelte';
	import SignInForm from '$lib/components/SignInForm.svelte';

	let { data } = $props();

	const isLoggedIn = $derived(!!data.token);
</script>

{#if isLoggedIn}
	<HomePage />
{:else}
	<SignInForm />
{/if}
