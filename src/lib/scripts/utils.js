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