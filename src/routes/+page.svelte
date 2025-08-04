<script>
	import FirstLoginForm from '$lib/components/FirstLoginForm.svelte';
	import SignInForm from '$lib/components/SignInForm.svelte';

	let { data } = $props();
</script>

{#if data.token}
	Kezdőlap
{:else if data.firstLoginToken}
	<FirstLoginForm />
{:else}
	<SignInForm />
{/if}
