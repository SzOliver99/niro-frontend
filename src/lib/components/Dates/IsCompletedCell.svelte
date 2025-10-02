<script>
	import { page } from '$app/state';
	import { changeUserDateStateMutation } from '$lib/scripts/queries/user_date';
	import { Notification } from '$lib/stores/notifications';
	import { X } from 'lucide-svelte';

	let { value, item, className = 'ms-10' } = $props();

	const changeUserDateState = changeUserDateStateMutation(page.data.token);
	function handleChange() {
		$changeUserDateState.mutate(
			{ date_uuid: item.uuid, value },
			{
				onSuccess: (data) => {
					Notification.success(data, 3);
				},

				onError: () => {
					value = !value;
				}
			}
		);
	}
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
<label
	class="group {className} flex h-5 w-5 items-center rounded border-2 border-gray-300 bg-white duration-200 has-[:checked]:border-blue-600 has-[:checked]:bg-blue-600"
	onclick={(e) => e.stopPropagation()}
>
	<input
		type="checkbox"
		id="is_completed"
		name="is_completed"
		bind:checked={value}
		onchange={handleChange}
		class="sr-only"
	/>
	<X class="hidden text-white group-has-[:checked]:block" />
</label>
