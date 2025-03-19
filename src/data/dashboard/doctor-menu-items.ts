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
        link: `${URLBase.DOCTOR_DASHBOARD}/sinusitis`,
        subMenu: [
            {
                id: 1,
                title: "Identification",
                icon: "ScanEye",
                link: `${URLBase.DOCTOR_DASHBOARD}/sinusitis/identification`,
            },
            {
                id: 2,
                title: "Patient History",
                icon: "List",
                link: `${URLBase.DOCTOR_DASHBOARD}/sinusitis`,
            },
            {
                id: 3,
                title: "Analytic Reports",
                icon: "ClipboardPlus",
                link: `${URLBase.DOCTOR_DASHBOARD}/sinusitis/reports`,
            },
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
                id: 1,
                title: "Identification",
                icon: "ScanEye",
                link: `${URLBase.DOCTOR_DASHBOARD}/cholesteatoma/identification`,
            },
            {
                id: 2,
                title: "Diagnosis History",
                icon: "List",
                link: `${URLBase.DOCTOR_DASHBOARD}/cholesteatoma`,
            },
            {
                id: 3,
                title: "Statistical Reports",
                icon: "ClipboardPlus",
                link: `${URLBase.DOCTOR_DASHBOARD}/cholesteatoma/reports`,
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
            {
                id: 3,
                title: "Reports",
                icon: "ClipboardPlus",
                link: `${URLBase.DOCTOR_DASHBOARD}/pharyngitis/reports`,
            },
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
                id: 1,
                title: "Patients",
                icon: "Users",
                link: `${URLBase.DOCTOR_DASHBOARD}/foreign-bodies/patients`,
            },
            {
                id: 2,
                title: "Identification",
                icon: "ScanEye",
                link: `${URLBase.DOCTOR_DASHBOARD}/foreign-bodies/identification`,
            },
            {
                id: 3,
                title: "Reports",
                icon: "ClipboardPlus",
                link: `${URLBase.DOCTOR_DASHBOARD}/foreign-bodies/reports`,
            }
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
