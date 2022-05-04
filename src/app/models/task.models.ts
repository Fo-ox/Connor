export type Task = {
    id: string;
    code?: string;
    dashboardId: string;
    status: string;
    type: string;
    title?: string;
    description?: string;
    priority?: string;
    components?: string[];
    tags?: string[];

    reporter: string;
    assignee?: string;

    creationDate: string;
    updateDate?: string;
    resolveDate?: string;

    initialEstimateId?: string;
    resolvedEstimate?: number;
    predictEstimate?: number;
}

export type TaskResponse = {
    assignedBy?: string;
    createdBy: string;
    creationDate?: string;
    dashboardId: string;
    description?: string;
    modificationDate?: string;
    priority?: string;
    status: string;
    taskId?: string;
    dashboardSeq?: string;
    title?: string;
    type: string;
}
