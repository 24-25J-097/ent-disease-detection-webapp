import {MenuItem} from "@/types/Navigations";
import {URLBase} from "@/enums/navigation";

export const DoctorMenuItems: MenuItem[] = [
    {
        id: 1,
        title: "Dashboard",
        icon: "Dashboard",
        isRootMenu: true,
        link: `${URLBase.DOCTOR_DASHBOARD}`,
    },
    {
        id: 2,
        title: "Diagnosis of Cholesteatoma",
        icon: "SquareActivity",
        isRootMenu: true,
        link: `${URLBase.DOCTOR_DASHBOARD}/patients`,
        subMenu: [
            {
                id: 1,
                title: "Patients",
                icon: "Users",
                link: `${URLBase.DOCTOR_DASHBOARD}/patients`,
            },
            {
                id: 2,
                title: "Identification",
                icon: "ScanEye",
                link: `${URLBase.DOCTOR_DASHBOARD}/identification`,
            },
            {
                id: 3,
                title: "Reports",
                icon: "ClipboardPlus",
                link: `${URLBase.DOCTOR_DASHBOARD}/reports`,
            },
        ],
        isDivider: true,
    },
];
