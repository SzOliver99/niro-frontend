<script>
	import { CircleArrowRight } from 'lucide-svelte';
</script>

<div
	class="fixed top-1/2 left-1/2 flex w-[36rem] -translate-1/2 flex-col rounded-lg bg-white p-4 text-center text-black shadow-2xl"
>
	<h1 class="my-4 text-4xl font-semibold text-shadow-md">NIRO Kezelőfelület</h1>
	<form method="POST" class="mt-5 flex flex-col gap-5">
		<div class="flex flex-col text-start font-medium">
			<label for="username">Felhasználónév</label>
			<input
				name="username"
				id="username"
				type="text"
				class="mt-1 block w-full rounded-md px-3 py-2 ring-1 ring-black/10 duration-200 focus:ring-blue-600 focus:outline-none"
				autocomplete="off"
				required
			/>
		</div>

		<div class="flex flex-col text-start font-medium">
			<p>Jelszó</p>
			<input
				name="password"
				id="password"
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
				<span>Sign In</span>
				<CircleArrowRight class="size-4" />
			</button>
		</div>
	</form>
</div>
<div class="mt-3 flex justify-center gap-5">
	<!-- <a href="/" class="text-black font-medium">Forgot your password?</a> -->
</div>
