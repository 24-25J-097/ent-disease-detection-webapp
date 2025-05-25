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
        ],
    },
    {
        id: 3,
        title: "Payment Management",
        icon: "CreditCard",
        isRootMenu: true,
        link: `${URLBase.ADMIN_DASHBOARD}/packages`,
        subMenu: [
            {
                id: 1,
                title: "Packages",
                icon: "Package",
                link: `${URLBase.ADMIN_DASHBOARD}/packages`,
            },
            {
                id: 2,
                title: "Reports",
                icon: "BarChart",
                link: `${URLBase.ADMIN_DASHBOARD}/reports`,
            },
        ],
        isDivider: true,
    },
];
