import {MenuItem} from "@/types/Navigations";
import {URLBase} from "@/enums/navigation";

export const DoctorMenuItems: MenuItem[] = [
    {
        id: 1,
        title: "Dashboard",
        icon: "Dashboard",
        isRootMenu: true,
        link: `${URLBase.DOCTOR_DASHBOARD}`,
        isDivider: true,
    },
    {
        id: 2,
        title: "Diagnosis of Sinusitis",
        icon: "SquareActivity",
        isRootMenu: true,
        link: `${URLBase.DOCTOR_DASHBOARD}/sinusitis/patients`,
        subMenu: [
            {
                id: 2,
                title: "Identification",
                icon: "ScanEye",
                link: `${URLBase.DOCTOR_DASHBOARD}/sinusitis/identification`,
            },
            /*{
                id: 3,
                title: "Reports",
                icon: "ClipboardPlus",
                link: `${URLBase.DOCTOR_DASHBOARD}/sinusitis/reports`,
            },*/
        ],
        isDivider: false,
    },
    {
        id: 3,
        title: "Diagnosis of Cholesteatoma",
        icon: "SquareActivity",
        isRootMenu: true,
        link: `${URLBase.DOCTOR_DASHBOARD}/cholesteatoma`,
        subMenu: [
            {
                id: 2,
                title: "Identification",
                icon: "ScanEye",
                link: `${URLBase.DOCTOR_DASHBOARD}/cholesteatoma/identification`,
            },
            {
                id: 3,
                title: "Reports",
                icon: "ClipboardPlus",
                link: `${URLBase.DOCTOR_DASHBOARD}/cholesteatoma/reports`,
            },
            {
                id: 3,
                title: "Identification List",
                icon: "List",
                link: `${URLBase.DOCTOR_DASHBOARD}/cholesteatoma`,
            },
        ],
        isDivider: false,
    },
    {
        id: 4,
        title: "Diagnosis of Pharyngitis",
        icon: "SquareActivity",
        isRootMenu: true,
        link: `${URLBase.DOCTOR_DASHBOARD}/pharyngitis/patients`,
        subMenu: [
            {
                id: 2,
                title: "Identification",
                icon: "ScanEye",
                link: `${URLBase.DOCTOR_DASHBOARD}/pharyngitis/identification`,
            },
            /*{
                id: 3,
                title: "Reports",
                icon: "ClipboardPlus",
                link: `${URLBase.DOCTOR_DASHBOARD}/pharyngitis/reports`,
            },*/
        ],
        isDivider: false,
    },
    {
        id: 5,
        title: "Diagnosis of Foreign Bodies",
        icon: "SquareActivity",
        isRootMenu: true,
        link: `${URLBase.DOCTOR_DASHBOARD}/foreign-bodies/patients`,
        subMenu: [
            {
                id: 2,
                title: "Identification",
                icon: "ScanEye",
                link: `${URLBase.DOCTOR_DASHBOARD}/foreign-bodies/identification`,
            },
            //             {
            //                 id: 3,
            //                 title: "Reports",
            //                 icon: "ClipboardPlus",
            //                 link: `${URLBase.DOCTOR_DASHBOARD}/foreign-bodies/reports`,
            //             }
        ],
        isDivider: true,
    },
    {
        id: 6,
        title: "Patients",
        icon: "Users",
        isRootMenu: true,
        link: `${URLBase.DOCTOR_DASHBOARD}/patients`,
        isDivider: true,
    },
];
