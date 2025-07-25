<script>
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { checkUserToken } from '$lib/scripts/utils.js';
	import { CircleArrowRight } from 'lucide-svelte';

	let { data } = $props();

	$effect.pre(() => {
		if (!data.token) {
			goto('/profile/sign-in');
		}
	});
</script>

<div>asd</div>
