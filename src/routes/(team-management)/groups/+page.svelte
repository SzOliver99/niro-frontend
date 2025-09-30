<script>
	import UserCard from '$lib/components/User/UserCard.svelte';
	import userApi from '$lib/scripts/apis/user.js';
	import { convertUserGroup } from '$lib/scripts/utils.js';
	import { permissionsStore } from '$lib/stores/permissions.js';
	import { createQuery } from '@tanstack/svelte-query';
	import { Plus } from 'lucide-svelte';
	import { onMount } from 'svelte';

	let { data } = $props();

	let sub_users = createQuery({
		queryKey: ['sub_users', data.token],
		queryFn: async () => await userApi({ user_token: data.token }).getUserSubUsers('Manager')
	});

	let selected_user = $state();
	$effect.pre(() => {
		if ($sub_users.data && $sub_users.data.length > 0) {
			selected_user = $sub_users.data[0].uuid;
		}
	});

	const users = $derived(
		createQuery({
			queryKey: ['users', data.token, selected_user],
			queryFn: () => userApi({ user_token: data.token }).getUsersByUuid(selected_user),
			refetchInterval: 3000
		})
	);
	console.log($users.data);
</script>

<section>
	<div class="my-5">
		<h2 class="text-center text-2xl font-medium">Csoportok</h2>
		<div class="mx-auto mb-4 w-1/2 lg:grid-cols-2">
			<select
				id="select_user"
				name="select_user"
				bind:value={selected_user}
				disabled={$permissionsStore.userRole === 'Manager'}
				class="mt-1 block w-full rounded-md px-3 py-2 ring-1 ring-black/10 duration-200 focus:ring-blue-600 focus:outline-none"
			>
				{#each $sub_users.data as user}
					<option value={user.uuid}
						>{user.info?.full_name} - {convertUserGroup(user.user_role)}</option
					>
				{/each}
			</select>
		</div>

		<div
			class="grid grid-cols-1 justify-items-center gap-y-15 rounded-lg p-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5"
		>
			{#each $users.data as user}
				<UserCard {user} />
			{/each}
		</div>
	</div>
</section>
