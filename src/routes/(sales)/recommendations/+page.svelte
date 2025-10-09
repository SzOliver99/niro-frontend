<script>
	import DataTable from '$lib/components/data/DataTable.svelte';
	import CreateRecommendationModal from '$lib/components/Recommendations/CreateRecommendationModal.svelte';
	import ModifyRecommendationModal from '$lib/components/Recommendations/ModifyRecommendationModal.svelte';
	import userApi from '$lib/scripts/apis/user';
	import recommendationApi from '$lib/scripts/apis/recommendation.js';
	import { convertUserGroup } from '$lib/scripts/utils';
	import { permissionsStore } from '$lib/stores/permissions';
	import { createSimpleModalStore } from '$lib/stores/user.js';
	import { createQuery } from '@tanstack/svelte-query';
	import { Plus } from 'lucide-svelte';
	import {
		changeRecommendationHandlerMutation,
		deleteRecommendationMutation
	} from '$lib/scripts/queries/recommendation.js';

	let { data } = $props();

	let recommendationCreateModalStore = $state(createSimpleModalStore());
	let recommendationModifyModalStore = $state(createSimpleModalStore());

	let sub_users = createQuery({
		queryKey: ['sub_users', data.token],
		queryFn: async () => await userApi({ user_token: data.token }).getUserSubUsers()
	});

	let selected_user = $state();
	$effect.pre(() => {
		if ($sub_users.data && $sub_users.data.length > 0) {
			selected_user = $sub_users.data[0].uuid;
		}
	});

	let selected_recommendation = $state();

	let recommendations = $derived(
		createQuery({
			queryKey: ['recommendations', data.token, selected_user],
			queryFn: async () =>
				await recommendationApi({ user_token: data.token }).getAllByUserUuid(selected_user),
			enabled: selected_user !== undefined
		})
	);

	const columns = [
		{ key: 'action', label: '#' },
		{ key: 'full_name', label: 'Ajánlott neve' },
		{ key: 'phone_number', label: 'Telefonszám' },
		{ key: 'city', label: 'Település' },
		{ key: 'referral_name', label: 'Ajánló neve' },
		{ key: 'created_by', label: 'Üzletkötő' }
	];
</script>

<div class="p-4">
	<div class="flex justify-between text-center">
		<div class="flex items-center gap-4">
			<h1 class="text-xl font-semibold">Ajánlások</h1>
			<select
				id="select_user"
				name="select_user"
				bind:value={selected_user}
				disabled={$permissionsStore.userRole === 'Agent'}
				class="mt-1 block w-full rounded-md px-3 py-2 ring-1 ring-black/10 duration-200 focus:ring-blue-600 focus:outline-none"
			>
				{#each $sub_users.data as user}
					<option value={user.uuid}
						>{user.info?.full_name} - {convertUserGroup(user.user_role)}</option
					>
				{/each}
			</select>
		</div>
		<button
			class="bg-gray me-4 flex items-center rounded-lg bg-blue-600 px-3 py-2 text-center text-nowrap text-white duration-200 hover:bg-blue-700"
			onclick={recommendationCreateModalStore.open}
		>
			<Plus />
			<p>Ajánlás hozzáadása</p>
		</button>
		<CreateRecommendationModal bind:selected_user bind:recommendationCreateModalStore />
		<ModifyRecommendationModal bind:selected_recommendation bind:recommendationModifyModalStore />
	</div>
	<DataTable
		data={$recommendations.data ?? []}
		{columns}
		modify_mutation={changeRecommendationHandlerMutation(data.token)}
		delete_mutation={deleteRecommendationMutation(data.token)}
		onClick={(uuid) => {
			selected_recommendation = uuid;
			recommendationModifyModalStore.open();
		}}
		searchable={true}
		filterable={true}
		sortable={true}
		modifiable={true}
		pageSize={30}
	/>
</div>
