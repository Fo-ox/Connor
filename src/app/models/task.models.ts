export type Task = {
    id: string;
    externalSystemId?: string;
    code?: string;
    dashboardId: string;
    status: string;
    type: string;
    title?: string;
    description?: string;
    priority?: string;
    components?: string[];
    tags?: string[];
    completed?: boolean;

    reporter: string;
    assignee?: string;

    creationDate: string;
    updateDate?: string;
    resolveDate?: string;

    initialEstimateId?: string;
    resolvedEstimate?: number;
    predictEstimate?: number;
    predictorVersion?: string,
    predictorType?: string,
}

export type TaskResponse = {
    id?: string,
    externalSystemId?: string,
    name?: string,
    description?: string,
    projectId?: string,
    statusId?: string,
    completed?: boolean,
    typeId?: string,
    priorityId?: string,
    tags?: string,
    reporterId?: string,
    assigneeId?: string,
    createDate?: string,
    closeDate?: string,
    initialEstimate?: string,
    resolvedEstimate?: number,
    predictEstimate?: number,
    predictorVersion?: string,
    predictorType?: string,
}
