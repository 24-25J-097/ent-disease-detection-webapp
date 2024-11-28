import React from "react";
import {GetLucideReactIconProps} from "@/types/Common";
import {
    Activity, BriefcaseBusiness,
    Calendar,
    ChevronDown,
    CreditCard,
    Edit,
    FileText,
    HardDrive,
    Home,
    Inbox,
    Layout, LockKeyholeOpen,
    MessageSquare,
    ShoppingBag,
    Sidebar,
    Trello,
    Users,
    Zap
} from "lucide-react";

const GetLucideReactIcon: React.FC<GetLucideReactIconProps> = ({ icon, className }) => {

    switch (icon) {
        case "Dashboard":
            return (<><Home className={className || "stroke-1.5 w-5 h-5"} /></>);
        case "Users":
            return (<><Users className={className || "stroke-1.5 w-5 h-5"} /></>);
        case "Roles":
            return (<><BriefcaseBusiness className={className || "stroke-1.5 w-5 h-5"} /></>);
        case "Permissions":
            return (<><LockKeyholeOpen className={className || "stroke-1.5 w-5 h-5"} /></>);
        case "Activity":
            return (<><Activity className={className || "stroke-1.5 w-5 h-5"} /></>);
        case "ShoppingBag":
            return (<><ShoppingBag className={className || "stroke-1.5 w-5 h-5"} /></>);
        case "Inbox":
            return (<><Inbox className={className || "stroke-1.5 w-5 h-5"} /></>);
        case "HardDrive":
            return (<><HardDrive className={className || "stroke-1.5 w-5 h-5"} /></>);
        case "Calendar":
            return (<><Calendar className={className || "stroke-1.5 w-5 h-5"} /></>);
        case "CreditCard":
            return (<><CreditCard className={className || "stroke-1.5 w-5 h-5"} /></>);
        case "Edit":
            return (<><Edit className={className || "stroke-1.5 w-5 h-5"} /></>);
        case "FileText":
            return (<><FileText className={className || "stroke-1.5 w-5 h-5"} /></>);
        case "Layout":
            return (<><Layout className={className || "stroke-1.5 w-5 h-5"} /></>);
        case "MessageSquare":
            return (<><MessageSquare className={className || "stroke-1.5 w-5 h-5"} /></>);
        case "Sidebar":
            return (<><Sidebar className={className || "stroke-1.5 w-5 h-5"} /></>);
        case "Trello":
            return (<><Trello className={className || "stroke-1.5 w-5 h-5"} /></>);
        case "Zap":
            return (<><Zap className={className || "stroke-1.5 w-5 h-5"} /></>);
        case "ChevronDown":
            return (<><ChevronDown className={className || "stroke-1.5 w-5 h-5"} /></>);
        default:
            return (<></>);
    }

};

export default GetLucideReactIcon;
