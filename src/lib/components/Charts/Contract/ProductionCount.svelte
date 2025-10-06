<script>
	let { selected_user } = $props();

	let title = 'Termelés (Darabszám)';

	let product_count = 123;
</script>

<div class="my-3">
	<div class="mx-3 flex items-center justify-between">
		<div class="flex items-center gap-2">
			<h1 class="text-start text-lg italic">{title} WIP</h1>
		</div>
		<div class="flex items-center gap-2"></div>
	</div>
	<div class="mt-2 flex justify-center text-2xl">
		<p>{product_count} db</p>
	</div>
</div>
