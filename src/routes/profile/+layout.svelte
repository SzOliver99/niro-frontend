<script>
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { profileListStore } from '$lib/stores/profile';
	let { children, data } = $props();

	let currentPage = $state();

	let loggedIn = $state();
	$effect(async () => {
		loggedIn = data.token ? true : false;
	});

	$effect.pre(() => {
		currentPage = $profileListStore.find((item) => item.href === $page.url.pathname).href;
	});
</script>

<section>
	{#if loggedIn}
		<div
			class="mx-auto my-5 flex flex-col overflow-hidden rounded-lg px-2 py-4 md:w-[80%] lg:w-[60%]"
		>
			<h1 class="mb-4 text-2xl font-bold">Fiókinformációk</h1>
			<div class="rounded-lg bg-white shadow-lg ring ring-black/10">
				<div class="flex h-full justify-between border-b border-black/10 py-2 *:font-medium">
					<div class="flex flex-row *:duration-200 *:hover:scale-105">
						{#each $profileListStore as item}
							<a
								href={item.href}
								class="flex items-center rounded-lg px-3 py-2 text-sm"
								class:text-blue-600={item.href === currentPage}
							>
								<item.icon class="md:me-2" stroke-width={1.5} />
								<p>{item.title}</p>
							</a>
						{/each}
					</div>
				</div>
				<div class="w-full overflow-y-auto">
					{@render children()}
				</div>
			</div>
		</div>
	{/if}
</section>
