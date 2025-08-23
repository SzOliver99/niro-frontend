import { writable } from 'svelte/store';

function createModalStore(initialValue = false) {
	const { subscribe, set, update } = writable(initialValue);

	function open() {
		set(true);
	}

	function close() {
		set(false);
	}

	return {
		subscribe,
		set,
		update,
		open,
		close
	};
}

export const userHireModalStore = createModalStore();
export const userManageModalStore = createModalStore();
export const userTerminationModalStore = createModalStore();
