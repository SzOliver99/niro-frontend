<script>
	import { page } from '$app/stores';
	import userApi from '$lib/scripts/apis/user';
	import { changeCustomerUserMutation } from '$lib/scripts/queries/customer';
	import { convertUserGroup } from '$lib/scripts/utils';
	import { changeCustomerUserModal } from '$lib/stores/user';
	import { createQuery } from '@tanstack/svelte-query';
	import { fade } from 'svelte/transition';

	let { selectedRows = $bindable() } = $props();

	let users = createQuery({
		queryKey: ['sub_users', $page.data.token],
		queryFn: async () => await userApi({ user_token: $page.data.token }).getUserSubUsers()
	});

	let new_user = $state('');
	let changeCustomerUser = changeCustomerUserMutation($page.data.token);
	async function handleSubmit() {
		$changeCustomerUser.mutate(
			{ user_full_name: new_user, customer_ids: selectedRows },
			{
				onSuccess: () => {
					new_user = '';
					changeCustomerUserModal.close();
					selectedRows = [];
				}
			}
		);
	}
</script>

{#if $changeCustomerUserModal}
	<div
		transition:fade={{ duration: 200 }}
		class="fixed top-0 left-0 h-full w-full overflow-hidden rounded-lg"
	>
		<button
			class="h-full w-full cursor-default bg-black/10"
			onclick={() => {
				changeCustomerUserModal.close();
			}}
			aria-label="Close modal"
		></button>
		<form
			onsubmit={handleSubmit}
			class="absolute top-1/2 left-1/2 w-3/4 -translate-x-1/2 -translate-y-1/2 rounded-lg border-1 border-black/10 bg-white p-6 text-center shadow-lg sm:w-auto"
		>
			<label for="name">Válassz üzletkötőt!</label>
			<div class="my-5">
				<input
					list="names"
					bind:value={new_user}
					name="name"
					class="rounded-lg border border-gray-300 px-3 py-2"
					autocomplete="off"
				/>

				<datalist id="names">
					{#each $users.data as user}
						<option value={user.info?.full_name}>{convertUserGroup(user.user_role)}</option>
					{/each}
				</datalist>
			</div>
			<button
				type="submit"
				class="rounded-lg bg-blue-600 px-4 py-2 text-sm text-white shadow-2xl duration-200 hover:bg-blue-700"
				>Mentés</button
			>
		</form>
	</div>
{/if}
