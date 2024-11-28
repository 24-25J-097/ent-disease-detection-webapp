interface MenuItemBase {
    id: number;
    title: string;
    icon: string;
    isRootMenu?: boolean;
    isDivider?: boolean;
}

interface MenuItemWithLink extends MenuItemBase {
    link: string;
    subMenu?: never; // Ensure subMenu is not present
}

interface MenuItemWithSubMenu extends MenuItemBase {
    link?: never; // Ensure link is not present
    subMenu: MenuItem[];
}

interface MenuItemWithLinkAndSubMenu extends MenuItemBase {
    link: string; // Ensure link is present
    subMenu: MenuItem[]; // Ensure subMenu is present
    isRootMenu: true; // Ensure isRootMenu is present & true
}

export type MenuItem = MenuItemWithLink | MenuItemWithSubMenu | MenuItemWithLinkAndSubMenu;


export type MenuItemListProps = {
    index: any;
    item: MenuItem;
    menuPlace: 'top' | 'side';
}

export type MenuProps = {
    menuItems: MenuItem[];
}
