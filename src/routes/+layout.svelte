<script>
	import '../app.css';
	import { page } from '$app/stores';
	import { browser } from '$app/environment';
	import { Search } from 'lucide-svelte';
	import { QueryClient } from '@tanstack/svelte-query';
	import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister';
	import { PersistQueryClientProvider } from '@tanstack/svelte-query-persist-client';
	import userApi from '$lib/scripts/apis/user';
	import Sidebar from '$lib/components/Sidebar.svelte';
	import background from '$lib/images/background.png';
	import NotificationToast from '$lib/components/feedback/NotificationToast.svelte';
	import { profileStore } from '$lib/stores/profile';
	import ProfilePopover from '$lib/components/Profile/ProfilePopover.svelte';

	let { children, data } = $props();

	let userFullName = $state('');
	$effect.pre(async () => {
		if (data.token) {
			const res_data = await userApi().getUserInfo(data.token);
			userFullName = res_data.full_name;
		}
	});

	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				enabled: browser
			}
		}
	});

	const persister = createAsyncStoragePersister({
		storage: browser ? window.localStorage : null
	});
</script>

<PersistQueryClientProvider client={queryClient} persistOptions={{ persister }}>
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<div class="flex h-screen w-screen overflow-hidden bg-white" onclick={profileStore.close}>
		{#if data.token}
			<div>
				<Sidebar {data} />
			</div>
		{/if}

		<div
			class="relative m-2 h-full flex-1 overflow-auto bg-size-[60%] bg-center bg-no-repeat"
			style="background-image: url({data.token ? background : ''})"
		>
			{#if data.token}
				<header class="flex w-full items-center justify-between">
					<div>
						<button class="flex items-center rounded-md border px-3 py-1 text-black/30">
							<Search class="me-3 size-4" />
							<p class="me-5">Keresés...</p>
						</button>
					</div>
					<div
						class="flex"
						onclick={(e) => {
							if (e.target.tagName !== 'A') {
								e.stopPropagation();
							}
						}}
					>
						<button
							class="relative z-10 shrink-0 cursor-pointer"
							href="/profile"
							onclick={profileStore.toggle}
						>
							<img
								src="https://avatar.iran.liara.run/username?username={userFullName}"
								class="w-12 duration-200"
								class:drop-shadow-2xl={$profileStore}
								alt="Profil"
							/>
						</button>
						<ProfilePopover />
					</div>
				</header>
			{/if}
			<main>
				{@render children()}
			</main>
			<footer></footer>
		</div>
	</div>

	<NotificationToast />
</PersistQueryClientProvider>
