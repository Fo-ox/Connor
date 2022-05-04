import { Injectable } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { logInDebug } from "../../utils/login-debug";
import { AtomStateService } from "../atom-state/app-atom-state.service";
import { QueryParametersEnum } from "../../constants/query-parameters.constants";

@Injectable({
    providedIn: "root"
})
export class RoutingService {
    constructor (private router: Router, private route: ActivatedRoute) {
    }

    public queryParamsDetector(): void {
        this.route.queryParams.subscribe((params: Params) => {
            AtomStateService.queryParametersEntities.setAtomByKey({
                key: 'QUERY_PARAMS_DASHBOARD_ID',
                value: params?.[QueryParametersEnum.QUERY_PARAM_DASHBOARD_ID]
            });
            AtomStateService.queryParametersEntities.setAtomByKey({
                key: 'QUERY_PARAMS_TASK_ID',
                value: params?.[QueryParametersEnum.QUERY_PARAM_TASK_ID]
            });
            AtomStateService.queryParametersEntities.setAtomByKey({
                key: 'QUERY_PARAMS_CHAT_ID',
                value: params?.[QueryParametersEnum.QUERY_PARAM_CHAT_ID]
            });
        })
    }

    public navigate(component: RouteLinks, parameters?: Partial<Record<RouteQueryParameter, string>>): void {
        this.router.navigate([component], {queryParams: parameters }).then(
            logInDebug(`[NAVIGATION] COMPLETE`)
        );
    }
}

export enum RouteLinks {
    PREDICTION = 'prediction',
    DASHBOARDS = 'dashboards',
    DASHBOARDS_DETAIL = 'dashboard-detail',
    USER = 'user',
    LOGIN = '',
    DIALOG = 'dialog',
    NOT_FOUND = '404',
}

export enum RouteQueryParameter {
    DASHBOARD_ID = 'dashboardId',
    TASK_ID = 'taskId',
    CHAT_ID = 'chatId'
}
