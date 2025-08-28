<script>
	import FirstLoginForm from '$lib/components/FirstLoginForm.svelte';
	import SignInForm from '$lib/components/SignInForm.svelte';

	let { data } = $props();

	const isLoggedIn = $derived(!!data.token);
</script>

{#if isLoggedIn}
	Kezdőlap
{:else if data.firstLoginToken}
	<FirstLoginForm />
{:else}
	<SignInForm />
{/if}
