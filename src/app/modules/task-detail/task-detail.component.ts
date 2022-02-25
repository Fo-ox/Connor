import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Task, TaskResponse } from "../../models/task.models";
import { Dashboard } from "../../models/dashboards.models";
import { TooltipAction } from "../../models/ui.models";
import { ConverterHelper } from "../../helpers/converter.helper";
import { Transition } from "../../services/dictionary-provider/dictionaries.models";
import { DictionariesService } from "../../services/dictionary-provider/dictionaries.service";
import { RouteLinks, RoutingService } from "../../services/routing-service/routing.service";
import { RestApiService } from "../../services/rest-api-service/rest-api.service";
import { filter, map, tap } from "rxjs/operators";
import { AtomStateMutations } from "../../services/atom-state/atom-state.mutations";
import { GenerateHelper } from "../../helpers/generate.helper";
import { BehaviorSubject, combineLatest, Observable } from "rxjs";
import { LoadingService } from "../../services/loading-service/loading.service";
import { User } from "../../models/user.models";
import { AtomStateService } from "../../services/atom-state/app-atom-state.service";
import { TaskComment } from "../../models/comments.model";

@Component({
    selector: 'task-detail',
    templateUrl: './task-detail.component.html',
    styleUrls: ['./task-detail.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskDetailComponent implements OnChanges {
    @Input() task: Task;
    @Input() dashboard: Dashboard;
    @Input() currentUser: User;

    public editingTitle: boolean = false;
    public editingDescription: boolean = false;
    public transitions: TooltipAction[] = [];
    public draftTaskUI: Task = {creationDate: "", dashboardId: "", id: "", reporter: "", status: "", type: ""};
    public dictionaries = DictionariesService.arrayDictionaries;
    public loading$: Observable<boolean>;
    public userAvatars$: Observable<Record<string, string>>;
    public commentsLoading$: Observable<boolean>;
    public commentValue: string = '';

    public taskComments$: Observable<TaskComment[]>;
    public taskChanges: boolean = false;
    public noDashboardAccess: boolean = false;

    private loadingStarter$: BehaviorSubject<string> = new BehaviorSubject<string>(null);
    private commentsLoadingStarter$: BehaviorSubject<string> = new BehaviorSubject<string>(null);
    private changeTaskDetector$: BehaviorSubject<string> = new BehaviorSubject<string>(null);

    constructor(private routingService: RoutingService, private restApiService: RestApiService) {
        this.loading$ = combineLatest([
            LoadingService.getLoadingState(),
            this.loadingStarter$
        ]).pipe(
            map(([loadingState, loadingId]: [string[], string]) => {
                return !!loadingState?.find((item: string) => item === loadingId)
            })
        );

        this.commentsLoading$ = combineLatest([
            LoadingService.getLoadingState(),
            this.commentsLoadingStarter$
        ]).pipe(
            map(([loadingState, loadingId]: [string[], string]) => {
                return !!loadingState?.find((item: string) => item === loadingId)
            })
        );

        this.taskComments$ = combineLatest([
            AtomStateService.commentsState.getAtomValueByKey('COMMENTS'),
            this.changeTaskDetector$
        ]).pipe(
            filter(([comments, taskId]: [TaskComment[], string]) => !!taskId),
            map(([comments, taskId]: [TaskComment[], string]) => {
                return comments.filter((comment: TaskComment) => comment.taskId === taskId)
                    ?.sort((curr: TaskComment, next: TaskComment) => +new Date(curr.commentTime) - +new Date(next.commentTime));
            })
        );

        this.userAvatars$ = AtomStateService.systemUsersState.getAtomValueByKey('SYSTEM_USERS')
            .pipe(
                map((users: User[]) => {
                    const userAvatars: Record<string, string> = {};
                    users.forEach((user: User) => userAvatars[user.id] = user.userInfo?.profileIcon)
                    return userAvatars
                })
            )
    }

    ngOnChanges(changes: SimpleChanges): void {
        this.transitions = ConverterHelper.transitionToTooltipAction(this.dictionaries.transition
            .filter((transition: Transition) => transition.fromStatus === this.task?.status))
        if (this.task && changes.task) {
            this.draftTaskUI = {...this.task}
            this.taskChanges = false
            this.changeTaskDetector$.next(this.task.id);

            AtomStateService.commentsState.setAtomByKey({
                key: 'COMMENTS',
                value: []
            })

            this.commentsLoadingStarter$.next(GenerateHelper.generateUUID());
            this.restApiService.loadCommentsByTaskId(
                this.task.id,
                this.commentsLoadingStarter$.value
            ).pipe(
                tap((comments: TaskComment[]) => {
                    AtomStateService.commentsState.setAtomByKey({
                        key: 'COMMENTS',
                        value: comments
                    })
                })
            ).subscribe();
        }
        if (this.dashboard && this.currentUser) {
            this.noDashboardAccess = !this.dashboard?.assignee?.includes(this.currentUser?.id)
                && !(this.dashboard.reporter === this.currentUser?.id);
        }
    }

    onTaskDetailClose() {
        this.routingService.navigate(RouteLinks.DASHBOARDS_DETAIL, {dashboardId: this.dashboard.id})
    }

    onCancelChanges(): void {
        this.draftTaskUI = {...this.task}
        this.taskChanges = false
    }

    onDraftTaskUpdate(value: string, key: keyof Task) {
        this.draftTaskUI[key] = value;
        this.taskChanges = true
    }

    onAddingComment(): void {
        const newComment: TaskComment = {
            taskId: this.task.id,
            userId: this.currentUser.id,
            commentText: this.commentValue
        }
        this.commentsLoadingStarter$.next(GenerateHelper.generateUUID());
        this.restApiService.createComment(
            newComment,
            this.commentsLoadingStarter$.value
        ).subscribe(() => {
            this.commentValue = '';
            this.restApiService.loadCommentsByTaskId(
                this.task.id,
                this.commentsLoadingStarter$.value
            ).pipe(
                tap((comments: TaskComment[]) => {
                    AtomStateService.commentsState.setAtomByKey({
                        key: 'COMMENTS',
                        value: comments
                    })
                })
            ).subscribe();
        })
    }

    onTransitionTask(transition: TooltipAction): void {
        this.taskUpdate({
            ...this.task,
            status:transition.customData.toStatus
        })
    }

    onUpdateChanges(): void {
        this.taskUpdate({...this.task, ...this.draftTaskUI})
    }

    private taskUpdate(task: Task): void {
        this.loadingStarter$.next(GenerateHelper.generateUUID());
        this.restApiService.updateTask(
            ConverterHelper.convertTaskToTaskPayload(task),
            this.loadingStarter$.value
        ).pipe(
            filter((task: TaskResponse) => !!task),
            tap((task: TaskResponse) => {
                AtomStateMutations.setTask(ConverterHelper.convertTaskResponseToTask(task));
            })
        ).subscribe()
    }
}
