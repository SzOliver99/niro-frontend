<script>
	import { page } from '$app/stores';
	import { FileUser, Lock, LogOut } from 'lucide-svelte';
	let { children, data } = $props();

	const list = $state([
		{ href: '/profile', title: 'Személyes adatok', icon: FileUser },
		{ href: '/profile/security', title: 'Biztonság', icon: Lock }
	]);
	let currentPage = $state(list[0]);

	let loggedIn = $state();
	$effect(async () => {
		loggedIn = data.token ? true : false;
	});

	$effect.pre(() => {
		currentPage = list.find((item) => item.href === $page.url.pathname);
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
						{#each list as item}
							<a
								href={item.href}
								class="flex items-center rounded-lg px-3 py-2 text-sm"
								class:text-blue-600={item === currentPage}
							>
								<item.icon class="md:me-2" stroke-width={1.5} />
								<p>{item.title}</p>
							</a>
						{/each}
					</div>
					<form method="POST" action="?/logout">
						<button
							class="flex items-center rounded-lg px-3 py-2 text-sm text-red-800 duration-200 hover:scale-105"
							type="submit"
						>
							<LogOut class="md:me-2" stroke-width={1.5} />
							<p>Kijelentkezés</p>
						</button>
					</form>
				</div>
				<div class="w-full overflow-y-auto">
					{@render children()}
				</div>
			</div>
		</div>
	{/if}
</section>
