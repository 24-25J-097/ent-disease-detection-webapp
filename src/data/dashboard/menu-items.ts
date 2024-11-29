import {MenuItem} from "@/types/Navigations";

export const MenuItems: MenuItem[] = [
    {
        id: 1,
        title: "Dashboard",
        icon: "Home",
        isRootMenu: true,
        link: "dashboard",
    },
    {
        id: 2,
        title: "E-Commerce",
        icon: "ShoppingBag",
        isRootMenu: true,
        subMenu: [
            {
                id: 1,
                title: "Categories",
                icon: "Activity",
                link: "categories",
            },
            {
                id: 2,
                title: "Add Product",
                icon: "Activity",
                link: "add-product",
            },
            {
                id: 3,
                title: "Product",
                icon: "Activity",
                subMenu: [
                    {
                        id: 1,
                        title: "Product List",
                        icon: "Zap",
                        link: "",
                    },
                    {
                        id: 2,
                        title: "Product Grid",
                        icon: "Zap",
                        link: "",
                    },
                    {
                        id: 3,
                        title: "Products",
                        icon: "Zap",
                        subMenu: [
                            {
                                id: 1,
                                title: "Product 001",
                                icon: "Zap",
                                subMenu: [
                                    {
                                        id: 1,
                                        title: "Product 001 Details",
                                        icon: "Zap",
                                        link: "",
                                    },
                                ]
                            },
                        ]
                    },
                ],
            },
            {
                id: 4,
                title: "Transactions",
                icon: "Activity",
                subMenu: [
                    {
                        id: 1,
                        title: "Transactions List",
                        icon: "Zap",
                        link: "",
                    },
                    {
                        id: 2,
                        title: "Transactions Details",
                        icon: "Zap",
                        link: "",
                    },
                ],
            },
            {
                id: 5,
                title: "Sellers",
                icon: "Activity",
                subMenu: [
                    {
                        id: 1,
                        title: "Sellers List",
                        icon: "Zap",
                        link: "",
                    },
                    {
                        id: 2,
                        title: "Sellers Details",
                        icon: "Zap",
                        link: "",
                    },
                ],
            },
            {
                id: 6,
                title: "Reviews",
                icon: "Activity",
                link: "",
            },

        ],
    },
    {
        id: 3,
        title: "Inbox",
        icon: "Inbox",
        isRootMenu: true,
        link: "dashboard/inbox",
    },
    {
        id: 4,
        title: "File Manager",
        icon: "HardDrive",
        isRootMenu: true,
        link: "",
    },
    {
        id: 5,
        title: "Point of Sale",
        icon: "CreditCard",
        isRootMenu: true,
        link: "",
    },
    {
        id: 6,
        title: "Chat",
        icon: "MessageSquare",
        isRootMenu: true,
        link: "",
    },
    {
        id: 7,
        title: "Post",
        icon: "FileText",
        isRootMenu: true,
        link: "",
    },
    {
        id: 8,
        title: "Calendar",
        icon: "Calendar",
        isRootMenu: true,
        link: "",
        isDivider: true,
    },
    {
        id: 9,
        title: "Crud",
        icon: "Edit",
        isRootMenu: true,
        subMenu: [
            {
                id: 1,
                title: "Data List",
                icon: "Activity",
                link: "",
            },
            {
                id: 2,
                title: "Form",
                icon: "Activity",
                link: "",
            },
        ],
    },
    {
        id: 10,
        title: "Users",
        icon: "Users",
        isRootMenu: true,
        subMenu: [
            {
                id: 1,
                title: "Layout 1",
                icon: "Activity",
                link: "",
            },
            {
                id: 2,
                title: "Layout 2",
                icon: "Activity",
                link: "",
            },
        ],
        isDivider: true,
    },
    {
        id: 11,
        title: "Components",
        icon: "Inbox",
        isRootMenu: true,
        subMenu: [
            {
                id: 1,
                title: "Layout 1",
                icon: "Activity",
                subMenu: [
                    {
                        id: 1,
                        title: "Layout 1.1",
                        icon: "Activity",
                        link: "",
                    },
                    {
                        id: 2,
                        title: "Layout 1.2",
                        icon: "Activity",
                        link: "",
                    },
                ],
            },
            {
                id: 2,
                title: "Layout 2",
                icon: "Activity",
                subMenu: [
                    {
                        id: 1,
                        title: "Layout 2.1",
                        icon: "Activity",
                        link: "",
                    },
                    {
                        id: 2,
                        title: "Layout 2.2",
                        icon: "Activity",
                        link: "",
                    },
                ],
            },
        ],
        isDivider: true,
    },
];
