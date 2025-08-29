<script>
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';
	import { Notification } from '$lib/stores/notifications';
	import { CircleArrowRight } from 'lucide-svelte';
</script>

<div
	class="fixed top-1/2 left-1/2 flex w-[36rem] -translate-1/2 flex-col rounded-lg bg-white p-4 text-center text-black shadow-2xl"
>
	<h1 class="my-4 text-4xl font-semibold text-shadow-md">Első bejelentkezés</h1>
	<p>Észleltük, hogy ideiglenes jelszóval jelentkeztél be!</p>
	<p>Kérjük változtass jelszót!</p>
	<form
		method="POST"
		action="?/first-login"
		class="mt-5 flex flex-col gap-5"
		use:enhance={() => {
			if ($page.form?.error) {
				Notification.error($page.form?.error, 3);
			}
		}}
	>
		<div class="flex flex-col text-start font-medium">
			<label for="password">Jelszó</label>
			<input
				name="password"
				id="password"
				type="password"
				class="mt-1 block w-full rounded-md px-3 py-2 ring-1 ring-black/10 duration-200 focus:ring-blue-600 focus:outline-none"
				autocomplete="off"
				required
			/>
		</div>

		<div class="flex flex-col text-start font-medium">
			<p>Jelszó megerősítése</p>
			<input
				name="password_confirm"
				id="password_confirm"
				type="password"
				class="mt-1 block w-full rounded-md px-3 py-2 ring-1 ring-black/10 duration-200 focus:ring-blue-600 focus:outline-none"
				autocomplete="off"
				required
			/>
		</div>

		<div class="flex justify-end">
			<button
				class="flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-2 text-white duration-200 hover:bg-blue-700"
			>
				<span>Jelszó megváltoztatása</span>
				<CircleArrowRight class="size-4" />
			</button>
		</div>
	</form>
</div>
