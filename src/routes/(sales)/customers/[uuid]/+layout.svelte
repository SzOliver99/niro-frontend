<script>
	import { page } from '$app/state';
	import { saveCustomerCommentMutation } from '$lib/scripts/queries/customer.js';
	import { Notification } from '$lib/stores/notifications.js';

	let { children, data } = $props();

	let saveComment = saveCustomerCommentMutation(data.token);
	function handleSaveComment() {
		$saveComment.mutate(
			{ customer_uuid: page.params.uuid, comment: customer_comment.value },
			{
				onSuccess: (data) => {
					Notification.success(data, 3);
				}
			}
		);
	}

	const navTabs = [
		{ href: `${page.params.uuid}`, title: 'Személyes adatok' },
		{ href: `${page.params.uuid}/leads`, title: 'Tevékenységek' },
		{ href: `${page.params.uuid}/contracts`, title: 'Szerződések' },
		{ href: `${page.params.uuid}/intervention-tasks`, title: 'Intervenciós feladatok' }
	];
</script>

<div class="my-5 ms-5 flex flex-row justify-between gap-3 overflow-hidden rounded-lg px-2 py-4">
	<div class="md:w-[80%] lg:w-[70%]">
		<h1 class="mb-4 text-2xl font-bold">Ügyfél karton</h1>
		<div class="min-h-[33.3rem] rounded-lg bg-white shadow-lg ring ring-black/10">
			<div class="flex h-full justify-between border-b border-black/10 py-2 *:font-medium">
				<div class="ms-2 flex flex-row gap-2 *:duration-200 *:hover:scale-105">
					{#each navTabs as link}
						<a
							href="/customers/{link.href}"
							class="flex items-center rounded-lg px-3 py-2 text-sm"
							class:scale-105={page.url.pathname.endsWith(link.href)}
							class:text-blue-600={page.url.pathname.endsWith(link.href)}
						>
							{link.title}
						</a>
					{/each}
				</div>
			</div>
			<div class="h-full w-full overflow-y-auto">
				{@render children()}
			</div>
		</div>
	</div>

	<div class="lg:w-[30%]">
		<h2 class="my-3">Megjegyzések</h2>
		<div class="relative min-h-[16.65rem] w-full">
			<textarea
				name="customer_comment"
				id="customer_comment"
				value={data.customer.comment}
				class="h-full max-h-[33.3rem] min-h-[16.65rem] w-full rounded-lg bg-white p-5 shadow-lg ring ring-black/10"
			></textarea>
			<button
				class="bg-gray absolute right-5 bottom-5 justify-center gap-2 rounded-lg bg-blue-600 px-4 py-1 text-white duration-200 hover:bg-blue-700"
				onclick={handleSaveComment}>Mentés</button
			>
		</div>
	</div>
</div>
