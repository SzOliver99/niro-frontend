<script>
	import { goto } from '$app/navigation';
	import { profileListStore, profileModalStore } from '$lib/stores/profile';
	import { LogOut } from 'lucide-svelte';
	import { scale } from 'svelte/transition';
</script>

{#if $profileModalStore}
	<div
		in:scale={{ duration: 200 }}
		out:scale={{ duration: 200 }}
		style="transform-origin: top right;"
		class="absolute top-0 right-0 z-0 h-[16rem] w-[18rem] rounded-lg rounded-tr-3xl border-1 border-black/10 bg-white p-2 shadow-xl"
	>
		<h2 class="font-semibold">Szvetnyik Olivér</h2>
		<p class="text-sm">Üzletkötő</p>
		<div class="mt-5 flex flex-col gap-2">
			{#each $profileListStore as link, i}
				<button onclick={() => goto(link.href)} class="group flex origin-left items-center text-sm">
					<link.icon
						class="size-5 text-blue-600 duration-200 group-hover:scale-110 md:me-1"
						stroke-width={1.5}
					/>
					<p>{link.title}</p>
				</button>
				{#if i !== $profileListStore.length - 1}
					<span class="h-[1px] w-full rounded-2xl bg-black/30"></span>
				{/if}
			{/each}
		</div>
		<button
			class="absolute right-3 bottom-3 flex items-center p-1 text-sm text-red-800 duration-200 hover:scale-105"
			onclick={() => goto('/profile/logout')}
		>
			<LogOut class="size-4 md:me-1" stroke-width={1.5} />
			<p>Kijelentkezés</p>
		</button>
	</div>
{/if}
