export type TaskComment = {
    commentId?: string;
    taskId: string;
    userId: string;
    commentText: string;
    commentTime?: string;
    deletionTime?: string;
    updateTime?: string;
}
