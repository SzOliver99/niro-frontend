<script>
	import { goto } from '$app/navigation';
	import { profileListStore, profileStore } from '$lib/stores/profile';
	import { LogOut } from 'lucide-svelte';
	import { scale } from 'svelte/transition';
</script>

{#if $profileStore}
	<div
		in:scale={{ duration: 200 }}
		out:scale={{ duration: 200 }}
		style="transform-origin: top right;"
		class="absolute top-0 right-0 z-0 h-[24rem] w-[14rem] rounded-lg rounded-tr-3xl border-1 border-black/10 bg-white p-2 shadow-xl"
	>
		<button
			class="flex items-center p-1 text-sm text-red-800 duration-200 hover:scale-105"
			onclick={() => goto('/profile/logout')}
		>
			<LogOut class="size-4 md:me-1" stroke-width={1.5} />
			<p>Kijelentkezés</p>
		</button>
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
	</div>
{/if}
