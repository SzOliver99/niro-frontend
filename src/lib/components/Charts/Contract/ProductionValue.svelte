<script>
	let { selected_user } = $props();

	let title = 'Termelés (Állománydíj)';

	let product_value = 1234567;
</script>

<div class="my-3">
	<div class="mx-3 flex items-center justify-between">
		<div class="flex items-center gap-2">
			<h1 class="text-start text-lg italic">{title} WIP</h1>
		</div>
		<div class="flex items-center gap-2"></div>
	</div>
	<div class="mt-2 flex justify-center text-2xl">
		<p>
			{product_value.toLocaleString('hu-HU', {
				style: 'currency',
				currency: 'HUF',
				minimumFractionDigits: 0,
				maximumFractionDigits: 0
			})}
		</p>
	</div>
</div>
