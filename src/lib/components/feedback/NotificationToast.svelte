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
			message: 'text-green-700'
		},
		error: {
			bg: 'bg-red-50',
			border: 'border-red-200',
			icon: 'text-red-400',
			message: 'text-red-700'
		},
		warning: {
			bg: 'bg-yellow-50',
			border: 'border-yellow-200',
			icon: 'text-yellow-400',
			message: 'text-yellow-700'
		},
		info: {
			bg: 'bg-blue-50',
			border: 'border-blue-200',
			icon: 'text-blue-400',
			message: 'text-blue-700'
		}
	};
</script>

<div class="fixed top-4 left-4 z-50 w-full max-w-sm space-y-2">
	{#each $Notification as { id, message, type } (id)}
		<button
			class="rounded-lg border p-4 shadow-lg {colors[type].bg} {colors[type].border}"
			onclick={() => Notification.dismiss(id)}
			transition:fly={{ y: -50, duration: 300 }}
		>
			<div class="flex items-start">
				<div class="flex-shrink-0">
					{@render icons[type]({ class: `size-5 ${colors[type].icon}` })}
				</div>
				<div class="ml-3 flex-1">
					<p class="mt-1 text-sm {colors[type].message}">{message}</p>
				</div>
			</div>
		</button>
	{/each}
</div>
