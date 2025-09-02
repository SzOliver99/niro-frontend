<script>
	import SignInForm from '$lib/components/SignInForm.svelte';

	let { data } = $props();

	const isLoggedIn = $derived(!!data.token);
</script>

{#if isLoggedIn}
	Kezdőlap
{:else}
	<SignInForm />
{/if}
