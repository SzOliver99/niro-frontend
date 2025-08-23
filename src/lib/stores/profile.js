import { FileUser, Lock } from 'lucide-svelte';
import { writable } from 'svelte/store';

function createProfileStore(initialValue = false) {
	const { subscribe, set, update } = writable(initialValue);

	function toggle() {
		update((v) => !v);
	}

	function close() {
		set(false);
	}

	return {
		subscribe,
		set,
		update,
		toggle,
		close
	};
}

export const profileStore = createProfileStore();
export const profileListStore = writable([
	{ href: '/profile', title: 'Személyes adatok', icon: FileUser },
	{ href: '/profile/security', title: 'Biztonság', icon: Lock }
]);
