<script>
	import { changeCustomerUserModal } from '$lib/stores/user';
	import { ChevronDown, ChevronUp, Search, Filter, X, TestTube } from 'lucide-svelte';
	import ChangeCustomerUserModal from '../Customer/ChangeCustomerUserModal.svelte';
	import { scale } from 'svelte/transition';

	let {
		data = [],
		columns = [],
		searchable = true,
		filterable = true,
		sortable = true,
		modifiable = true,
		pageSize = 10,
		class: className = ''
	} = $props();

	let searchTerm = $state('');
	let currentPage = $state(1);
	let sortColumn = $state('');
	let sortDirection = $state('asc');
	let filters = $state({});
	let selectedRows = $state([]);

	let filteredData = $derived(() => {
		let result = [...data];

		if (searchTerm && searchable) {
			result = result.filter((item) =>
				columns.some((col) =>
					item[col.key]?.toString().toLowerCase().includes(searchTerm.toLowerCase())
				)
			);
		}

		if (filterable) {
			Object.entries(filters).forEach(([key, value]) => {
				if (value) {
					result = result.filter((item) => item[key] === value);
				}
			});
		}

		if (sortColumn && sortable) {
			result.sort((a, b) => {
				const aVal = a[sortColumn];
				const bVal = b[sortColumn];

				if (sortDirection === 'asc') {
					return aVal > bVal ? 1 : -1;
				} else {
					return aVal < bVal ? 1 : -1;
				}
			});
		}

		return result;
	});

	let paginatedData = $derived(() => {
		const start = (currentPage - 1) * pageSize;
		const end = start + pageSize;
		return filteredData().slice(start, end);
	});

	let totalPages = $derived(Math.ceil(filteredData().length / pageSize));

	function handleSort(columnKey) {
		if (sortColumn === columnKey) {
			sortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
		} else {
			sortColumn = columnKey;
			sortDirection = 'asc';
		}
		currentPage = 1;
	}

	function handleFilter(columnKey, value) {
		filters[columnKey] = value;
		currentPage = 1;
	}

	function clearFilters() {
		filters = {};
		selectedRows = [];
		sortColumn = '';
		searchTerm = '';
		currentPage = 1;
	}

	function toggleSelectedRow(selectedRowId) {
		if (selectedRows.includes(selectedRowId)) {
			selectedRows = selectedRows.filter((row) => row !== selectedRowId);
			return;
		}

		selectedRows.push(selectedRowId);
	}

	function modifySelectedRowsUser() {
		changeCustomerUserModal.open();
	}
</script>

<div class="rounded-lg bg-white shadow-lg {className}">
	{#if searchable || filterable}
		<div class="border-b border-gray-200 p-4">
			<div class="flex items-center gap-4">
				{#if searchable}
					<div class="flex-1">
						<div class="relative">
							<Search
								class="absolute top-1/2 left-3 size-4 -translate-y-1/2 transform text-gray-400"
							/>
							<input
								type="text"
								placeholder="Keresés..."
								bind:value={searchTerm}
								class="w-full rounded-lg border border-gray-300 py-2 pr-4 pl-10 focus:border-transparent focus:ring-2 focus:ring-blue-500"
							/>
						</div>
					</div>
				{/if}

				{#if filterable}
					<button
						onclick={clearFilters}
						class="rounded-lg border-1 border-gray-300 px-4 py-2 text-sm shadow-2xl duration-200 hover:border-gray-500"
					>
						Szűrők törlése
					</button>
				{/if}
				{#if selectedRows.length !== 0}
					<div in:scale={{ start: 0.8, duration: 200 }} out:scale={{ end: 0.8, duration: 200 }}>
						{#if modifiable}
							<button
								class="rounded-lg bg-blue-600 px-4 py-2 text-sm text-white shadow-2xl duration-200 hover:bg-blue-700"
								onclick={modifySelectedRowsUser}
							>
								Üzletkötő módosítása
							</button>
						{/if}
						<button
							class="rounded-lg bg-red-900 px-4 py-2 text-sm text-white shadow-2xl duration-200 hover:bg-red-950"
						>
							Sor(ok) törlése
						</button>
					</div>
				{/if}

				<ChangeCustomerUserModal bind:selectedRows />
			</div>
		</div>
	{/if}

	<div class="overflow-x-auto rounded-b-lg">
		<table class="w-full">
			<thead class="bg-gray-50">
				<tr>
					{#each columns as column}
						<th
							class="cursor-pointer px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase hover:bg-gray-100"
							onclick={sortable ? () => handleSort(column.key) : undefined}
						>
							<div class="flex items-center gap-2">
								{column.label}
								{#if sortable && sortColumn === column.key}
									{#if sortDirection === 'asc'}
										<ChevronUp class="size-4" />
									{:else}
										<ChevronDown class="size-4" />
									{/if}
								{/if}
							</div>
						</th>
					{/each}
				</tr>
			</thead>
			<tbody class="divide-y divide-gray-200 bg-white">
				{#each paginatedData() as item, index}
					<tr class="hover:bg-gray-50" onclick={() => console.log(item.id)}>
						{#each columns as column}
							{#if column.key === 'action'}
								<td class="px-5">
									<label
										class="group flex h-5 w-5 items-center rounded border-2 border-gray-300 bg-white duration-200 has-[:checked]:border-blue-600 has-[:checked]:bg-blue-600"
									>
										<input
											type="checkbox"
											checked={selectedRows.includes(item.id)}
											onchange={() => toggleSelectedRow(item.id)}
											class="sr-only"
										/>

										<X class="hidden text-white group-has-[:checked]:block" />
									</label>
								</td>
							{:else}
								<td class="px-6 py-4 text-sm whitespace-nowrap text-gray-900">
									{#if column.action}
										{column.action(item.user_id)}
									{:else}
										{item[column.key]}
									{/if}
								</td>
							{/if}
						{/each}
					</tr>
				{/each}
			</tbody>
		</table>
	</div>

	{#if totalPages > 1}
		<div class="border-t border-gray-200 px-6 py-3">
			<div class="flex flex-wrap items-center justify-between text-nowrap">
				<div class="text-sm text-gray-700">
					{filteredData().length} találat
				</div>
				<div class="flex items-center gap-2">
					<button
						onclick={() => (currentPage = Math.max(1, currentPage - 1))}
						disabled={currentPage === 1}
						class="rounded border px-3 py-1 text-sm hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
					>
						Előző
					</button>

					<span class="px-3 py-1 text-sm">
						{currentPage} / {totalPages}
					</span>

					<button
						onclick={() => (currentPage = Math.min(totalPages, currentPage + 1))}
						disabled={currentPage === totalPages}
						class="rounded border px-3 py-1 text-sm hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
					>
						Következő
					</button>
				</div>
			</div>
		</div>
	{/if}
</div>
