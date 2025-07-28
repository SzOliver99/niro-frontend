<script>
	import SignInForm from '$lib/components/SignInForm.svelte';

	let { data } = $props();
</script>

{#if data.token}
	..
{:else}
	<SignInForm />
{/if}
