<script>
	import { CircleArrowRight } from 'lucide-svelte';
	import { fade } from 'svelte/transition';

	let { showModal = $bindable(), toggleModal } = $props();
</script>

{#if showModal}
	<div transition:fade={{ duration: 200 }} class="fixed top-0 left-0 h-full w-full overflow-hidden">
		<button
			class="h-full w-full cursor-default bg-black/30"
			onclick={toggleModal}
			aria-label="Close modal"
		></button>
		<div
			class="fixed top-1/2 left-1/2 flex w-[36rem] -translate-1/2 flex-col rounded-lg bg-white p-4 text-center text-black shadow-2xl"
		>
			<h1 class="my-4 text-4xl font-semibold text-shadow-md">Üzletkötő felvétele</h1>
			<form method="POST" class="mt-5 flex flex-col gap-5">
				<div class="flex flex-col text-start font-medium">
					<label for="email">Email*</label>
					<input
						name="email"
						id="email"
						type="email"
						class="mt-1 block w-full rounded-md px-3 py-2 ring-1 ring-black/10 duration-200 focus:ring-blue-600 focus:outline-none"
						autocomplete="off"
						required
					/>
				</div>
				<div class="flex flex-col text-start font-medium">
					<label for="username">Felhasználónév*</label>
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
					<label for="password">Ideiglenes jelszó*</label>
					<input
						name="password"
						id="password"
						type="password"
						class="mt-1 block w-full rounded-md px-3 py-2 ring-1 ring-black/10 duration-200 focus:ring-blue-600 focus:outline-none"
						autocomplete="off"
						required
					/>
				</div>

				<h2 class="text-xl font-semibold">Üzletkötő adatai</h2>
				<div class="grid grid-cols-2 gap-4">
					<div class="flex flex-col text-start font-medium">
						<label for="last_name">Vezetéknév*</label>
						<input
							name="last_name"
							id="last_name"
							type="text"
							class="mt-1 block w-full rounded-md px-3 py-2 ring-1 ring-black/10 duration-200 focus:ring-blue-600 focus:outline-none"
							autocomplete="off"
							required
						/>
					</div>
					<div class="flex flex-col text-start font-medium">
						<label for="first_name">Keresztnév*</label>
						<input
							name="first_name"
							id="first_name"
							type="text"
							class="mt-1 block w-full rounded-md px-3 py-2 ring-1 ring-black/10 duration-200 focus:ring-blue-600 focus:outline-none"
							autocomplete="off"
							required
						/>
					</div>
				</div>
				<div class="flex flex-col text-start font-medium">
					<label for="phone_number">Telefonszám*</label>
					<input
						name="phone_number"
						id="phone_number"
						type="tel"
						class="mt-1 block w-full rounded-md px-3 py-2 ring-1 ring-black/10 duration-200 focus:ring-blue-600 focus:outline-none"
						autocomplete="off"
						required
					/>
				</div>
				<div class="grid grid-cols-2 gap-4">
					<div class="flex flex-col text-start font-medium">
						<label for="hufa_code">Hufa kód*</label>
						<input
							name="hufa_code"
							id="hufa_code"
							type="text"
							class="mt-1 block w-full rounded-md px-3 py-2 ring-1 ring-black/10 duration-200 focus:ring-blue-600 focus:outline-none"
							autocomplete="off"
							required
						/>
					</div>
					<div class="flex flex-col text-start font-medium">
						<label for="agent_code">Üzletkötő kód*</label>
						<input
							name="agent_code"
							id="agent_code"
							type="text"
							class="mt-1 block w-full rounded-md px-3 py-2 ring-1 ring-black/10 duration-200 focus:ring-blue-600 focus:outline-none"
							autocomplete="off"
							required
						/>
					</div>
				</div>

				<div class="flex justify-end">
					<button
						class="flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-2 text-white duration-200 hover:bg-blue-700"
					>
						<span>Üzletkötő felvétele</span>
						<CircleArrowRight class="size-4" />
					</button>
				</div>
			</form>
		</div>
	</div>
{/if}
