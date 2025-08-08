// User group mapping utility
export const USER_GROUP_MAP = {
    'Leader': 'Hálózati igazgató',
    'Manager': 'Menedzser',
    'Agent': 'Üzletkötő'
};

export function convertUserGroup(group) {
    return USER_GROUP_MAP[group] || group;
}