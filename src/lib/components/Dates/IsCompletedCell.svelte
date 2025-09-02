<script>
	import { page } from '$app/state';
	import { changeUserDateStateMutation } from '$lib/scripts/queries/user_date';
	import { Notification } from '$lib/stores/notifications';

	let { value, item } = $props();

	const changeUserDateState = changeUserDateStateMutation(page.data.token);
	function handleChange() {
		$changeUserDateState.mutate(
			{ date_id: item.id, value },
			{
				onSuccess: (data) => {
					Notification.success(data, 3);
				}
			}
		);
	}
</script>

<select
	id="is_completed"
	name="is_completed"
	bind:value
	onchange={handleChange}
	class="mt-1 block w-full rounded-md px-3 py-2 ring-1 ring-black/10 duration-200 focus:ring-blue-600 focus:outline-none"
>
	<option value={false}>Nem</option>
	<option value={true}>Igen</option>
</select>
