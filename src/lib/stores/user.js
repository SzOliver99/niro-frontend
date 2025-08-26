import { get, writable } from 'svelte/store';

function createSimpleModalStore(initialValue = false) {
	const store = writable(initialValue);

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

export function createModalStore(user_id, modals = { Manage: false, Termination: false }) {
	const store = writable({ user_id, modals });

	function open(type) {
		store.update((state) => {
			state.modals[type] = true;
			return state;
		});
	}

	function close(type = null) {
		store.update((state) => {
			if (type) {
				state.modals[type] = false;
			} else {
				state.modals = Object.fromEntries(
					Object.entries(state.modals).map(([key, value]) => [key, false])
				);
			}
			return state;
		});
	}

	function isOpen(type) {
		const currentState = get(store);
		return currentState.modals[type];
	}

	return {
		...store,
		open,
		close,
		isOpen
	};
}

export const userHireModalStore = createSimpleModalStore();
export const changeCustomerUserStore = createSimpleModalStore();
export const userManageModalsStore = writable([]);
