import {MenuItem} from "@/types/Navigations";
import {URLBase} from "@/enums/navigation";

export const AdminMenuItems: MenuItem[] = [
    {
        id: 1,
        title: "Dashboard",
        icon: "Dashboard",
        isRootMenu: true,
        link: `${URLBase.ADMIN_DASHBOARD}`,
    },
    {
        id: 2,
        title: "User Management",
        icon: "Users",
        isRootMenu: true,
        link: `${URLBase.ADMIN_DASHBOARD}/users`,
        subMenu: [
            {
                id: 1,
                title: "Users",
                icon: "Users",
                link: `${URLBase.ADMIN_DASHBOARD}/users`,
            },
            {
                id: 2,
                title: "Roles",
                icon: "Roles",
                link: `${URLBase.ADMIN_DASHBOARD}/roles`,
            },
            {
                id: 2,
                title: "Permissions",
                icon: "Permissions",
                link: `${URLBase.ADMIN_DASHBOARD}/permissions`,
            },
        ],
        isDivider: true,
    },
];
