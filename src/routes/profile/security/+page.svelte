<script>
	import { page } from '$app/stores';
	import { fetchGetUserInformations } from '$lib/scripts/apis/user';
	import { checkUserToken } from '$lib/scripts/utils.js';
	import { CircleArrowRight } from 'lucide-svelte';

	let { data } = $props();
</script>

<section class="w-full px-4 py-3">
	<h2 class="text-xl italic">Biztonság</h2>

	<div class="p-3">
		<div class="flex items-center justify-between rounded-lg ps-3 ring ring-black/10">
			<p>Jelszó változtatása</p>
			<button class="rounded-lg bg-blue-600 px-6 py-2 text-white duration-200 hover:bg-blue-700"
				>Módosítás</button
			>
		</div>
	</div>
</section>
