<script>
	import { fade, fly } from 'svelte/transition';
	import { Notification } from '$lib/stores/notifications';
	import { CheckCircle, XCircle, Info, AlertTriangle, X } from 'lucide-svelte';

	const icons = {
		success: CheckCircle,
		error: XCircle,
		warning: AlertTriangle,
		info: Info
	};

	const colors = {
		success: {
			bg: 'bg-green-50',
			border: 'border-green-200',
			icon: 'text-green-400',
			title: 'text-green-800',
			message: 'text-green-700'
		},
		error: {
			bg: 'bg-red-50',
			border: 'border-red-200',
			icon: 'text-red-400',
			title: 'text-red-800',
			message: 'text-red-700'
		},
		warning: {
			bg: 'bg-yellow-50',
			border: 'border-yellow-200',
			icon: 'text-yellow-400',
			title: 'text-yellow-800',
			message: 'text-yellow-700'
		},
		info: {
			bg: 'bg-blue-50',
			border: 'border-blue-200',
			icon: 'text-blue-400',
			title: 'text-blue-800',
			message: 'text-blue-700'
		}
	};
</script>

<div class="fixed top-4 right-4 z-50 w-full max-w-sm space-y-2">
	{#each $Notification as toast (toast.id)}
		<div
			class="rounded-lg border p-4 shadow-lg {colors[toast.type].bg} {colors[toast.type].border}"
			transition:fly={{ y: -50, duration: 300 }}
		>
			<div class="flex items-start">
				<div class="flex-shrink-0">
					{@render icons[toast.type]({ class: `size-5 ${colors[toast.type].icon}` })}
				</div>
				<div class="ml-3 flex-1">
					{#if toast.title}
						<h3 class="text-sm font-medium {colors[toast.type].title}">{toast.title}</h3>
					{/if}
					<p class="mt-1 text-sm {colors[toast.type].message}">{toast.message}</p>
				</div>
				<div class="ml-4 flex-shrink-0">
					<button
						on:click={() => Notification.dismiss(toast.id)}
						class="inline-flex text-gray-400 hover:text-gray-600 focus:text-gray-600 focus:outline-none"
					>
						<X class="size-4" />
					</button>
				</div>
			</div>
		</div>
	{/each}
</div>
