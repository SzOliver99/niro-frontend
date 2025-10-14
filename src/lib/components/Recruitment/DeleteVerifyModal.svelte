<script>
	import { fade } from 'svelte/transition';
	import { Notification } from '$lib/stores/notifications';
	import { deleteVerifyModal } from '$lib/stores/user';

	let { selected_recruitment = $bindable(), delete_mutation } = $props();

	async function handleDelete() {
		$delete_mutation.mutate(selected_recruitment, {
			onSuccess: (data) => {
				Notification.success(data, 3);
				deleteVerifyModal.close();
			}
		});
	}
</script>

{#if $deleteVerifyModal}
	<div
		transition:fade={{ duration: 200 }}
		class="fixed top-0 left-0 h-full w-full overflow-hidden rounded-lg"
	>
		<button
			class="h-full w-full cursor-default bg-black/10"
			onclick={deleteVerifyModal.close}
			aria-label="Close modal"
		></button>
		<div
			class="absolute top-1/2 left-1/2 w-3/4 -translate-x-1/2 -translate-y-1/2 rounded-lg border-1 border-black/10 bg-white p-6 text-center shadow-lg sm:w-auto"
		>
			<p>Biztos vagy benne hogy törlöd a jelöltet?</p>
			<p>A folyamat nem visszafordítható!</p>
			<div class="mt-2 flex justify-center text-white">
				<button
					class="me-5 w-20 rounded-lg py-2 text-red-800 shadow-lg hover:scale-105"
					onclick={handleDelete}>Igen</button
				>
				<button
					class="hover:bg-primary-600 w-20 rounded-lg bg-blue-600 shadow-lg hover:scale-105"
					onclick={deleteVerifyModal.close}>Nem!</button
				>
			</div>
		</div>
	</div>
{/if}
