import {User} from "@/models/User";

export type UserListGridProps = {
    currentUsers: User[];
    searchTerm: string;
    pageSize: number;
}

export type UserProfileTabProps = {
    selectedUser: User | null;
    onUpdated?: () => void;
}
