import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import { Observable, of } from "rxjs";
import { CERTIFICATE, DOMAIN, Endpoints } from "./endpoints.constant";
import { SessionUser, UserResponse } from "../../models/user.models";
import {catchError, finalize, map, tap} from "rxjs/operators";
import { DashboardResponse } from "../../models/dashboards.models";
import { LoadingService } from "../loading-service/loading.service";
import { AtomStateService } from "../atom-state/app-atom-state.service";
import { TuiNotification } from "@taiga-ui/core";
import { ErrorHelper } from "../../helpers/error.helper";
import { TaskResponse } from "../../models/task.models";
import { ChatListResponse, ChatMessageResponse} from "../../models/chatList.models";
import { TaskComment } from "../../models/comments.model";
import { ConverterHelper } from "../../helpers/converter.helper";
import { DataResponse } from "../../models/data.models";
import {Model} from "../../models/model.models";

@Injectable({
    providedIn: 'root'
})
export class RestApiService {
    constructor(private http: HttpClient) { }

    public static saveSessionUser(sessionUser: SessionUser): void {
        window.sessionStorage.setItem('userToken', sessionUser.userToken);
        window.sessionStorage.setItem('userId', sessionUser.userId);
    }

    public static getSessionUser(): SessionUser {
        return {
            userToken: window.sessionStorage.getItem('userToken'),
            userId: window.sessionStorage.getItem('userId'),
        };
    }

    public static clearSessionUser(): void {
        window.sessionStorage.removeItem('userToken');
        window.sessionStorage.removeItem('userId');
    }

    public static hasSessionUser(): boolean {
        return !!window.sessionStorage.getItem('userToken');
    }

    public static getUrl(endpoint: Endpoints): string {
        return CERTIFICATE + DOMAIN + endpoint;
    }

    public static getAuthorizationHeaders(): HttpHeaders {
        const token = RestApiService.getSessionUser().userToken;
        return new HttpHeaders()
            .append('Authorization', 'Bearer ' + token);
    }

    public login(login: string, password: string, loadingId?: string): Observable<UserResponse> {
        loadingId && LoadingService.startLoadingById(loadingId);
        return this.http.get(
            RestApiService.getUrl(Endpoints.LOGIN),
            {
                params: {login, password},
                responseType: 'json'
            },
        ).pipe(
            map((response: DataResponse<UserResponse>) => response?.data),
            finalize(() => loadingId && LoadingService.finishLoadingById(loadingId)),
        );
    }

    public loadUsers(): Observable<UserResponse[]> {
        return this.http.get(
            RestApiService.getUrl(Endpoints.GET_USERS),
            { headers: RestApiService.getAuthorizationHeaders() }
        ).pipe(
            map((response: DataResponse<UserResponse[]>) => response?.data),
            catchError((error: HttpErrorResponse) => {
                AtomStateService.notificationState.setAtomByKey({
                    key: 'NOTIFICATION',
                    value: {
                        notificationType: TuiNotification.Error,
                        notificationTitle: 'Error load system users',
                        notificationContent: error?.error?.message || ErrorHelper.errorMap.get(error.status)
                    }
                })
                return of(null);
            }),
        );
    }

    public createUser(newUser: UserResponse, loadingId?: string): Observable<UserResponse> {
        AtomStateService.notificationState.setAtomByKey({
            key: 'NOTIFICATION',
            value: {
                notificationType: TuiNotification.Info,
                notificationTitle: `Creating ${newUser.firstName + ' ' +newUser.lastName} user`
            }
        })
        loadingId && LoadingService.startLoadingById(loadingId);
        return this.http.post(
            RestApiService.getUrl(Endpoints.CREATE_USER),
            { ...newUser },
            {
                params: {token: RestApiService.getSessionUser()?.userToken},
                responseType: 'json'
            },
        ).pipe(
            map((response: DashboardResponse) => {
                AtomStateService.notificationState.setAtomByKey({
                    key: 'NOTIFICATION',
                    value: {
                        notificationType: TuiNotification.Success,
                        notificationTitle: 'User successfully creating'
                    }
                })
                return response
            }),
            catchError((error: HttpErrorResponse) => {
                AtomStateService.notificationState.setAtomByKey({
                    key: 'NOTIFICATION',
                    value: {
                        notificationType: TuiNotification.Error,
                        notificationTitle: 'Error user creating',
                        notificationContent: error?.error?.message || ErrorHelper.errorMap.get(error.status)
                    }
                })
                return of(null);
            }),
            finalize(() => loadingId && LoadingService.finishLoadingById(loadingId)),
        );
    }

    public loadDashboards(): Observable<DashboardResponse[]> {
        return this.http.get(RestApiService.getUrl(Endpoints.GET_DASHBOARDS)).pipe(
            map((response: DashboardResponse[]) => response),
            catchError((error: HttpErrorResponse) => {
                AtomStateService.notificationState.setAtomByKey({
                    key: 'NOTIFICATION',
                    value: {
                        notificationType: TuiNotification.Error,
                        notificationTitle: 'Error load system dashboards',
                        notificationContent: error?.error?.message || ErrorHelper.errorMap.get(error.status)
                    }
                })
                return of(null);
            }),
        );
    }

    public loadTasks(): Observable<TaskResponse[]> {
        return this.http.get(
            RestApiService.getUrl(Endpoints.GET_TASKS),
            { headers: RestApiService.getAuthorizationHeaders() }
        ).pipe(
            map((response: DataResponse<TaskResponse[]>) => response.data),
            catchError((error: HttpErrorResponse) => {
                AtomStateService.notificationState.setAtomByKey({
                    key: 'NOTIFICATION',
                    value: {
                        notificationType: TuiNotification.Error,
                        notificationTitle: 'Error load system tasks',
                        notificationContent: error?.error?.message || ErrorHelper.errorMap.get(error.status)
                    }
                })
                return of(null);
            }),
        );
    }

    public loadTasksCount(): Observable<number> {
        return this.http.get(
            RestApiService.getUrl(Endpoints.GET_TASKS_COUNT),
            { headers: RestApiService.getAuthorizationHeaders() }
        ).pipe(
            map((response: DataResponse<number>) => response.data),
            catchError((error: HttpErrorResponse) => {
                AtomStateService.notificationState.setAtomByKey({
                    key: 'NOTIFICATION',
                    value: {
                        notificationType: TuiNotification.Error,
                        notificationTitle: 'Error load tickets count',
                        notificationContent: error?.error?.message || ErrorHelper.errorMap.get(error.status)
                    }
                })
                return of(null);
            }),
        );
    }

    public loadModels(): Observable<Model[]> {
        return this.http.get(
            RestApiService.getUrl(Endpoints.GET_MODELS),
            { headers: RestApiService.getAuthorizationHeaders() }
        ).pipe(
            map((response: DataResponse<Model[]>) => response.data),
            catchError((error: HttpErrorResponse) => {
                AtomStateService.notificationState.setAtomByKey({
                    key: 'NOTIFICATION',
                    value: {
                        notificationType: TuiNotification.Error,
                        notificationTitle: 'Error load models',
                        notificationContent: error?.error?.message || ErrorHelper.errorMap.get(error.status)
                    }
                })
                return of(null);
            }),
        );
    }

    public loadDefaultModel(): Observable<Model> {
        return this.http.get(
            RestApiService.getUrl(Endpoints.GET_DEFAULT_MODEL),
            { headers: RestApiService.getAuthorizationHeaders() }
        ).pipe(
            map((response: DataResponse<Model>) => response.data),
            catchError((error: HttpErrorResponse) => {
                AtomStateService.notificationState.setAtomByKey({
                    key: 'NOTIFICATION',
                    value: {
                        notificationType: TuiNotification.Error,
                        notificationTitle: 'Error load default models',
                        notificationContent: error?.error?.message || ErrorHelper.errorMap.get(error.status)
                    }
                })
                return of(null);
            }),
        );
    }

    public setDefaultModel(id: string): Observable<Model> {
        return this.http.get(
            RestApiService.getUrl(Endpoints.GET_DEFAULT_MODEL),
            { headers: RestApiService.getAuthorizationHeaders(), params: {id}}
        ).pipe(
            map((response: DataResponse<Model>) => response.data),
            catchError((error: HttpErrorResponse) => {
                AtomStateService.notificationState.setAtomByKey({
                    key: 'NOTIFICATION',
                    value: {
                        notificationType: TuiNotification.Error,
                        notificationTitle: 'Error set default model',
                        notificationContent: error?.error?.message || ErrorHelper.errorMap.get(error.status)
                    }
                })
                return of(null);
            }),
        );
    }

    public trainNewModel(modelType: string): Observable<void> {
        return this.http.get(
            RestApiService.getUrl(Endpoints.TRAIN_NEW_MODEL),
            { headers: RestApiService.getAuthorizationHeaders(), params: {modelType}}
        ).pipe(
            map((response: DataResponse<void>) => response.data),
            catchError((error: HttpErrorResponse) => {
                AtomStateService.notificationState.setAtomByKey({
                    key: 'NOTIFICATION',
                    value: {
                        notificationType: TuiNotification.Error,
                        notificationTitle: 'Error start train model',
                        notificationContent: error?.error?.message || ErrorHelper.errorMap.get(error.status)
                    }
                })
                return of(null);
            }),
        );
    }

    public createDashboard(newDashboard: DashboardResponse, loadingId?: string): Observable<DashboardResponse> {
        AtomStateService.notificationState.setAtomByKey({
            key: 'NOTIFICATION',
            value: {
                notificationType: TuiNotification.Info,
                notificationTitle: `Creating ${newDashboard.title} dashboard`
            }
        })
        loadingId && LoadingService.startLoadingById(loadingId);
        return this.http.post(
            RestApiService.getUrl(Endpoints.CREATE_DASHBOARD),
            { ...newDashboard },
            {
                params: {token: RestApiService.getSessionUser()?.userToken},
                responseType: 'json'
            },
        ).pipe(
            map((response: DashboardResponse) => {
                AtomStateService.notificationState.setAtomByKey({
                    key: 'NOTIFICATION',
                    value: {
                        notificationType: TuiNotification.Success,
                        notificationTitle: 'Dashboard successfully creating'
                    }
                })
                return response
            }),
            catchError((error: HttpErrorResponse) => {
                AtomStateService.notificationState.setAtomByKey({
                    key: 'NOTIFICATION',
                    value: {
                        notificationType: TuiNotification.Error,
                        notificationTitle: 'Error dashboard creating',
                        notificationContent: error?.error?.message || ErrorHelper.errorMap.get(error.status)
                    }
                })
                return of(null);
            }),
            finalize(() => loadingId && LoadingService.finishLoadingById(loadingId)),
        );
    }

    public updateDashboard(newDashboard: DashboardResponse, loadingId?: string): Observable<DashboardResponse> {
        AtomStateService.notificationState.setAtomByKey({
            key: 'NOTIFICATION',
            value: {
                notificationType: TuiNotification.Info,
                notificationTitle: `Updating ${newDashboard.title} dashboard`
            }
        })
        loadingId && LoadingService.startLoadingById(loadingId);
        return this.http.post(
            RestApiService.getUrl(Endpoints.UPDATE_DASHBOARD),
            { ...newDashboard },
            {
                params: {token: RestApiService.getSessionUser()?.userToken},
                responseType: 'json'
            },
        ).pipe(
            map((response: DashboardResponse) => {
                AtomStateService.notificationState.setAtomByKey({
                    key: 'NOTIFICATION',
                    value: {
                        notificationType: TuiNotification.Success,
                        notificationTitle: 'Dashboard successfully updating'
                    }
                })
                return response
            }),
            catchError((error: HttpErrorResponse) => {
                AtomStateService.notificationState.setAtomByKey({
                    key: 'NOTIFICATION',
                    value: {
                        notificationType: TuiNotification.Error,
                        notificationTitle: 'Error dashboard updating',
                        notificationContent: error?.error?.message || ErrorHelper.errorMap.get(error.status)
                    }
                })
                return of(null);
            }),
            finalize(() => loadingId && LoadingService.finishLoadingById(loadingId)),
        );
    }

    public createTask(newTask: TaskResponse, loadingId?: string): Observable<TaskResponse> {
        AtomStateService.notificationState.setAtomByKey({
            key: 'NOTIFICATION',
            value: {
                notificationType: TuiNotification.Info,
                notificationTitle: `Creating ${newTask.name} task`
            }
        })
        loadingId && LoadingService.startLoadingById(loadingId);
        return this.http.post(
            RestApiService.getUrl(Endpoints.CREATE_TASK),
            { ...newTask },
            {
                params: {token: RestApiService.getSessionUser()?.userToken},
                responseType: 'json'
            },
        ).pipe(
            map((response: TaskResponse) => {
                AtomStateService.notificationState.setAtomByKey({
                    key: 'NOTIFICATION',
                    value: {
                        notificationType: TuiNotification.Success,
                        notificationTitle: 'Task successfully creating'
                    }
                })
                return response
            }),
            catchError((error: HttpErrorResponse) => {
                AtomStateService.notificationState.setAtomByKey({
                    key: 'NOTIFICATION',
                    value: {
                        notificationType: TuiNotification.Error,
                        notificationTitle: 'Error task creating',
                        notificationContent: error?.error?.message || ErrorHelper.errorMap.get(error.status)
                    }
                })
                return of(null);
            }),
            finalize(() => {
                this.loadTasks()
                    .pipe(
                        tap((tasks: TaskResponse[]) => AtomStateService.tasksState.setAtomByKey({
                            key: 'TASKS',
                            value: tasks?.map((task: TaskResponse) => {
                                return ConverterHelper.convertTaskResponseToTask(task)
                            })
                        }))
                    ).subscribe();
                loadingId && LoadingService.finishLoadingById(loadingId);
            }),
        );
    }

    public updateTask(newTask: TaskResponse, loadingId?: string): Observable<TaskResponse> {
        AtomStateService.notificationState.setAtomByKey({
            key: 'NOTIFICATION',
            value: {
                notificationType: TuiNotification.Info,
                notificationTitle: `Updating ${newTask.name} task`
            }
        })
        loadingId && LoadingService.startLoadingById(loadingId);
        return this.http.post(
            RestApiService.getUrl(Endpoints.UPDATE_TASK),
            { ...newTask },
            {
                params: {token: RestApiService.getSessionUser()?.userToken},
                responseType: 'json'
            },
        ).pipe(
            map((response: TaskResponse) => {
                AtomStateService.notificationState.setAtomByKey({
                    key: 'NOTIFICATION',
                    value: {
                        notificationType: TuiNotification.Success,
                        notificationTitle: 'Task successfully updating'
                    }
                })
                return response
            }),
            catchError((error: HttpErrorResponse) => {
                AtomStateService.notificationState.setAtomByKey({
                    key: 'NOTIFICATION',
                    value: {
                        notificationType: TuiNotification.Error,
                        notificationTitle: 'Error task updating',
                        notificationContent: error?.error?.message || ErrorHelper.errorMap.get(error.status)
                    }
                })
                return of(null);
            }),
            finalize(() => loadingId && LoadingService.finishLoadingById(loadingId)),
        );
    }

    public loadChats(userId: string): Observable<ChatListResponse[]> {
        return this.http.get(RestApiService.getUrl(Endpoints.GET_CHATS), {
            params: {userId}
        }).pipe(
            map((response: ChatListResponse[]) => response),
            catchError((error: HttpErrorResponse) => {
                AtomStateService.notificationState.setAtomByKey({
                    key: 'NOTIFICATION',
                    value: {
                        notificationType: TuiNotification.Error,
                        notificationTitle: 'Error load user chats',
                        notificationContent: error?.error?.message || ErrorHelper.errorMap.get(error.status)
                    }
                })
                return of(null);
            }),
        );
    }

    public loadMessages(chatId: string): Observable<ChatMessageResponse[]> {
        return this.http.get(RestApiService.getUrl(Endpoints.GET_MESSAGES), {
            params: {chatId}
        }).pipe(
            map((response: ChatMessageResponse[]) => response),
            catchError((error: HttpErrorResponse) => {
                AtomStateService.notificationState.setAtomByKey({
                    key: 'NOTIFICATION',
                    value: {
                        notificationType: TuiNotification.Error,
                        notificationTitle: 'Error load chat messages',
                        notificationContent: error?.error?.message || ErrorHelper.errorMap.get(error.status)
                    }
                })
                return of(null);
            }),
        );
    }

    public loadCommentsByTaskId(taskId: string, loadingId?: string): Observable<TaskComment[]> {
        loadingId && LoadingService.startLoadingById(loadingId);
        return this.http.get(RestApiService.getUrl(Endpoints.GET_COMMENTS), {params: {taskId}}).pipe(
            map((response: TaskComment[]) => response),
            catchError((error: HttpErrorResponse) => {
                AtomStateService.notificationState.setAtomByKey({
                    key: 'NOTIFICATION',
                    value: {
                        notificationType: TuiNotification.Error,
                        notificationTitle: 'Error load task comments',
                        notificationContent: error?.error?.message || ErrorHelper.errorMap.get(error.status)
                    }
                })
                return of(null);
            }),
            finalize(() => loadingId && LoadingService.finishLoadingById(loadingId)),
        );
    }

    public createComment(newComment: TaskComment, loadingId?: string): Observable<TaskComment> {
        AtomStateService.notificationState.setAtomByKey({
            key: 'NOTIFICATION',
            value: {
                notificationType: TuiNotification.Info,
                notificationTitle: `Adding task comment`
            }
        })
        loadingId && LoadingService.startLoadingById(loadingId);
        return this.http.post(
            RestApiService.getUrl(Endpoints.SEND_COMMENT),
            { ...newComment },
            {
                responseType: 'json'
            },
        ).pipe(
            map((response: TaskComment) => {
                AtomStateService.notificationState.setAtomByKey({
                    key: 'NOTIFICATION',
                    value: {
                        notificationType: TuiNotification.Success,
                        notificationTitle: 'Comment successfully added'
                    }
                })
                return response
            }),
            catchError((error: HttpErrorResponse) => {
                AtomStateService.notificationState.setAtomByKey({
                    key: 'NOTIFICATION',
                    value: {
                        notificationType: TuiNotification.Error,
                        notificationTitle: 'Error comment adding',
                        notificationContent: error?.error?.message || ErrorHelper.errorMap.get(error.status)
                    }
                })
                return of(null);
            }),
            finalize(() => loadingId && LoadingService.finishLoadingById(loadingId)),
        );
    }
}
