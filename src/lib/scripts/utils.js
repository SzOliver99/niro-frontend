// User group mapping utility
const USER_ROLE_NAMING_MAP = {
    'Agent': 'Üzletkötő',
    'Manager': 'Menedzser',
    'Leader': 'Hálózati igazgató'
};

const USER_ROLE_RANK = {
    "Agent": 0,
    "Manager": 1,
    "Leader": 2,
}

export const convertUserGroup = (role) => USER_ROLE_NAMING_MAP[role] || role
export const checkPermission = (min_role, user_role) => USER_ROLE_RANK[user_role] >= USER_ROLE_RANK[min_role]

// Phone Number formatter
export function formatPhoneNumber() {
    let value = phone_number.value.replace(/\D/g, '');

    if (!value.startsWith('36')) {
        value = '36' + value.replace(/^36/, '');
    }
    let rest = value.slice(2);

    let formatted = '+36';
    if (rest.length > 0) formatted += ' ' + rest.substring(0, 2);
    if (rest.length > 2) formatted += ' ' + rest.substring(2, 5);
    if (rest.length > 5) formatted += ' ' + rest.substring(5, 9);
    phone_number.value = formatted;
}