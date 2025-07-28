<script>
	import { CircleArrowRight } from 'lucide-svelte';
</script>

<div
	class="m-auto mt-16 flex w-[36rem] flex-col rounded-lg bg-white p-4 text-center text-black shadow-2xl ring-1 ring-gold"
>
	<h1 class="my-4 text-4xl font-semibold text-shadow-md">Niro</h1>
	<form method="POST" class="mt-5 flex flex-col gap-5">
		<div class="flex flex-col text-start font-medium">
			<label for="username">Username</label>
			<input
				name="username"
				id="username"
				type="text"
				class="mt-1 block w-full rounded-md px-3 py-2 ring-1 ring-black duration-200 focus:ring-gold focus:outline-none"
				autocomplete="off"
				required
			/>
		</div>

		<div class="flex flex-col text-start font-medium">
			<p>Password</p>
			<input
				name="password"
				id="password"
				type="password"
				class="mt-1 block w-full rounded-md px-3 py-2 ring-1 ring-black duration-200 focus:ring-gold focus:outline-none"
				autocomplete="off"
				required
			/>
		</div>

		<button
			class="m-auto flex w-32 flex-row items-center justify-center gap-2 rounded-lg bg-gray p-2 text-white duration-200 hover:text-gold"
		>
			<span>Sign In</span>
			<CircleArrowRight class="size-4" />
		</button>
	</form>
</div>
<div class="mt-3 flex justify-center gap-5">
	<!-- <a href="/" class="text-black font-medium">Forgot your password?</a> -->
</div>
