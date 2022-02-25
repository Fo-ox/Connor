import {UserResponse} from "./user.models";

export type Dashboard = {
    id: string;
    projectTitle:string;
    description?: string;

    reporter: string;
    assignee?: string[];

    creationDate: string;
    updateDate?: string;
    resolveDate?: string;
}

export type DashboardResponse = {
    createdBy?: string;
    creationDate?: string;
    dashboardId?: string;
    defaultAssignedBy?: string;
    description?: string;
    modificationDate?: string;
    title?: string;
    team?: UserResponse[];
}

export type DashboardTypes = 'my' | 'teams' | 'all';
