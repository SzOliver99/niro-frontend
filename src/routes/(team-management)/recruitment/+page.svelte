<script>
	import CreateRecruitmentModal from '$lib/components/Recruitment/CreateRecruitmentModal.svelte';
	import ModifyRecruitmentModal from '$lib/components/Recruitment/ModifyRecruitmentModal.svelte';
	import DeleteVerifyModal from '$lib/components/Recruitment/DeleteVerifyModal.svelte';
	import { createSimpleModalStore, deleteVerifyModal } from '$lib/stores/user.js';
	import { createQuery } from '@tanstack/svelte-query';
	import { Plus, Pencil, Trash2 } from 'lucide-svelte';
	import recruitmentApi from '$lib/scripts/apis/recruitment';
	import { deleteRecruitmentMutation } from '$lib/scripts/queries/recruitment.js';

	let { data } = $props();

	let recruitmentCreateModalStore = $state(createSimpleModalStore());
	let recruitmentModifyModalStore = $state(createSimpleModalStore());

	let selected_recruitment = $state();

	let recruitments = $derived(
		createQuery({
			queryKey: ['recruitments', data.token],
			queryFn: async () => await recruitmentApi({ user_token: data.token }).getAll()
		})
	);

	const deleteRecruitment = deleteRecruitmentMutation(data.token);

	function openModify(uuid) {
		selected_recruitment = uuid;
		recruitmentModifyModalStore.open();
	}

	function handleDelete(uuid) {
		selected_recruitment = uuid;
		deleteVerifyModal.open();
	}
</script>

<section class="p-4">
	<div class="my-5">
		<div
			class="mx-auto mb-4 flex w-1/2 min-w-65 flex-col items-center gap-2 rounded-lg p-2 ring ring-black/10 lg:flex-row"
		>
			<h2 class="w-full text-center text-2xl font-medium">Toborzás</h2>

			<div class="flex justify-center lg:justify-end">
				<button
					class="bg-gray flex rounded-lg bg-blue-600 px-3 py-2 text-nowrap text-white duration-200 hover:bg-blue-700"
					onclick={recruitmentCreateModalStore.open}
				>
					<Plus class="shrink-0" />
					<p>Jelölt hozzáadása</p>
				</button>
			</div>
			<CreateRecruitmentModal bind:recruitmentCreateModalStore />
			<ModifyRecruitmentModal bind:selected_recruitment bind:recruitmentModifyModalStore />
			<DeleteVerifyModal bind:selected_recruitment delete_mutation={deleteRecruitment} />
		</div>

		<div
			class="grid grid-cols-1 justify-items-center gap-5 rounded-lg p-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5"
		>
			{#each $recruitments.data as recruitment}
				<div class="w-full max-w-80 rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
					<div class="mb-3">
						<p class="text-lg font-semibold">{recruitment.full_name}</p>
						<p class="text-sm text-gray-600">{recruitment.email}</p>
						<p class="text-sm text-gray-600">{recruitment.phone_number}</p>
						<p class="text-xs text-gray-400">Létrehozta: {recruitment.created_by}</p>
					</div>
					<div class="mt-4 flex items-center justify-end gap-2">
						<button
							class="rounded-md border border-gray-300 px-3 py-1 text-sm hover:bg-gray-50"
							onclick={() => openModify(recruitment.uuid)}
						>
							<span><Pencil class="mr-1 inline size-4" />Szerkesztés</span>
						</button>
						<button
							class="rounded-md border border-red-300 px-3 py-1 text-sm text-red-700 hover:bg-red-50"
							onclick={() => handleDelete(recruitment.uuid)}
						>
							<span><Trash2 class="mr-1 inline size-4" />Törlés</span>
						</button>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>
