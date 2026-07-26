import { ROLE_PERMISSIONS } from "../config/rolePermissions";

export function usePermissions(role: string) {

    const permissions = ROLE_PERMISSIONS[role] || [];

    function hasPermission(permission: string) {

        return permissions.includes(permission);

    }

    return {

        permissions,

        hasPermission,

    };

}