<script>
	import { page } from '$app/state';
	import { profileModalStore } from '$lib/stores/profile';
	import { createQuery } from '@tanstack/svelte-query';
	import ProfileModal from './ProfileModal.svelte';
	import userApi from '$lib/scripts/apis/user';
	import { getUserInfoQuery } from '$lib/scripts/queries/user';

	const userInfoQuery = createQuery(getUserInfoQuery(page.data.token));
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
	class="flex"
	onclick={(e) => {
		if (e.target.tagName !== 'A') {
			e.stopPropagation();
		}
	}}
>
	<button class="relative z-20 cursor-pointer" href="/profile" onclick={profileModalStore.toggle}>
		{#if $userInfoQuery.isLoading}
			<div class="h-12 w-12 animate-pulse rounded-full bg-gray-200"></div>
		{:else if $userInfoQuery.isError}
			<img
				src="https://avatar.iran.liara.run/username?username=xy"
				class="w-12 origin-top-right duration-200 hover:scale-110"
				class:scale-110={$profileModalStore}
				class:drop-shadow-2xl={$profileModalStore}
				alt="Profil"
			/>
		{:else if $userInfoQuery.data}
			<img
				src="https://avatar.iran.liara.run/username?username={$userInfoQuery.data.info.full_name ||
					'xy'}"
				class="w-12 origin-top-right duration-200 hover:scale-110"
				class:scale-110={$profileModalStore}
				class:drop-shadow-2xl={$profileModalStore}
				alt="Profil"
			/>
		{/if}
	</button>
	<ProfileModal />
</div>
