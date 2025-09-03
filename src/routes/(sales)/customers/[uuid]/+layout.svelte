<script>
	let { children } = $props();
</script>

<div class="mx-auto my-5 flex flex-col overflow-hidden rounded-lg px-2 py-4 md:w-[80%] lg:w-[60%]">
	<h1 class="mb-4 text-2xl font-bold">Ügyfél adatai</h1>
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
