<script>
	let { children } = $props();
</script>

<div class="my-5 ms-5 flex flex-row justify-between gap-3 overflow-hidden rounded-lg px-2 py-4">
	<div class="md:w-[80%] lg:w-[70%]">
		<h1 class="mb-4 text-2xl font-bold">Ügyfél karton</h1>
		<div class="rounded-lg bg-white shadow-lg ring ring-black/10">
			<div class="w-full overflow-y-auto">
				{@render children()}
			</div>
			<div class="flex h-full justify-between border-t border-black/10 py-2 *:font-medium">
				<div class="flex flex-row gap-2 *:duration-200 *:hover:scale-105">
					<p class="flex items-center rounded-lg px-3 py-2 text-sm">Tevékenységek</p>
					<p class="flex items-center rounded-lg px-3 py-2 text-sm">Szerződések</p>
					<p class="flex items-center rounded-lg px-3 py-2 text-sm">Intervenciós feladatok</p>
				</div>
			</div>
		</div>
	</div>

	<div class="lg:w-[30%]">
		<h2 class="my-3">Megjegyzések</h2>
		<div class="relative min-h-[16.65rem] w-full">
			<textarea
				name=""
				id=""
				class="h-full max-h-[33.3rem] min-h-[16.65rem] w-full rounded-lg bg-white p-5 shadow-lg ring ring-black/10"
			>
			</textarea>
			<button
				class="bg-gray absolute right-5 bottom-5 justify-center gap-2 rounded-lg bg-blue-600 px-4 py-1 text-white duration-200 hover:bg-blue-700"
				>Mentés</button
			>
		</div>
	</div>
</div>
