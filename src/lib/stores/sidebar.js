import { writable } from 'svelte/store';

function createSideBarStore(initalValue = true) {
	const store = writable(initalValue);

	function open() {
		store.set(true);
	}

	function close() {
		store.set(false);
	}

	return {
		...store,
		open,
		close
	};
}

export const sideBarStore = createSideBarStore();
