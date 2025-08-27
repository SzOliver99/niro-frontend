<script>
	import { fade } from 'svelte/transition';
	import { Notification } from '$lib/stores/notifications';
	import { page } from '$app/stores';
	import userApi from '$lib/scripts/apis/user';
	import { deleteUserMutation } from '$lib/scripts/queries/user';

	let { user, userManageModal = $bindable() } = $props();

	let deleteUser = deleteUserMutation($page.data.token);
	async function handleDelete() {
		$deleteUser.mutate(user.id, {
			onSuccess: () => {
				Notification.success('Sikeresen megbontottad a szerződést', 3);
				userManageModal.close();
			}
		});
	}
</script>

{#if $userManageModal.modals['Delete']}
	<div
		transition:fade={{ duration: 200 }}
		class="fixed top-0 left-0 h-full w-full overflow-hidden rounded-lg"
	>
		<button
			class="h-full w-full cursor-default bg-black/10"
			onclick={() => {
				userManageModal.close('Delete');
			}}
			aria-label="Close modal"
		></button>
		<div
			class="absolute top-1/2 left-1/2 w-3/4 -translate-x-1/2 -translate-y-1/2 rounded-lg border-1 border-black/10 bg-white p-6 text-center shadow-lg sm:w-auto"
		>
			<p>Biztos vagy benne hogy megbontod a szerződést?</p>
			<p>A folyamat nem visszafordítható!</p>
			<div class="mt-2 flex justify-center text-white">
				<button
					class="me-5 w-20 rounded-lg py-2 text-red-800 shadow-lg hover:scale-105"
					onclick={handleDelete}>Igen</button
				>
				<button
					class="hover:bg-primary-600 w-20 rounded-lg bg-blue-600 shadow-lg hover:scale-105"
					onclick={() => {
						userManageModal.close('Delete');
					}}>Nem!</button
				>
			</div>
		</div>
	</div>
{/if}
