import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {BehaviorSubject, combineLatest, Observable} from "rxjs";
import {Task} from "../../models/task.models";
import {Dashboard} from "../../models/dashboards.models";
import {filter, map} from "rxjs/operators";
import {AtomStateService} from "../../services/atom-state/app-atom-state.service";
import {DictionariesService} from "../../services/dictionary-provider/dictionaries.service";
import {DictionariesBeObject} from "../../services/dictionary-provider/dictionaries.models";
import {RouteLinks, RouteQueryParameter, RoutingService} from "../../services/routing-service/routing.service";

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchComponent implements OnInit {
    public isSearchActive: boolean = false;
    public searchValue: string = '';
    public findItems$: Observable<{tasks: Task[], dashboards: Dashboard[]}>;
    public viewSearchResult$: Observable<boolean>;
    public dictionaries: DictionariesBeObject = DictionariesService.objectDictionaries;
    public DEFAULT_ICON_NAME = DictionariesService.DEFAULT_ICON_NAME;
    public DEFAULT_ICON_COLOR = DictionariesService.DEFAULT_ICON_COLOR;
    public DEFAULT_ICON_BACKGROUND = DictionariesService.DEFAULT_ICON_BACKGROUND_COLOR;

    private searchFocusDetector$: BehaviorSubject<boolean> = new BehaviorSubject(null);
    private searchValueDetector$: BehaviorSubject<string> = new BehaviorSubject(null);

    constructor(private routingService: RoutingService) { }

    ngOnInit(): void {
        this.viewSearchResult$ = combineLatest([
            this.searchFocusDetector$,
            this.searchValueDetector$
        ]).pipe(
            map(([focus, searchValue]: [boolean, string]) => !!searchValue || (focus && !!searchValue))
        );

        this.findItems$ = combineLatest([
            AtomStateService.dashboardState.getAtomValueByKey('DASHBOARDS'),
            AtomStateService.tasksState.getAtomValueByKey('TASKS'),
            this.searchValueDetector$
        ]).pipe(
            filter(([dashboards, tasks, searchValue]: [Dashboard[], Task[], string]) => dashboards && tasks && !!searchValue),
            map(([dashboards, tasks, searchValue]: [Dashboard[], Task[], string]) => {
                return {
                    tasks: tasks?.filter((task: Task) => task.title?.toLowerCase()?.includes(searchValue?.toLowerCase())
                        || task.code?.toLowerCase()?.includes(searchValue?.toLowerCase())) || [],
                    dashboards: dashboards?.filter((dashboard: Dashboard) => dashboard.projectTitle?.toLowerCase()
                        ?.includes(searchValue?.toLowerCase())) || []
                }
            })
        )
    }

    onFocusChange(event: boolean) {
        this.searchFocusDetector$.next(event);
    }

    onSearchValueChange(event: string) {
        this.searchValueDetector$.next(event);
    }

    onTaskNavigate(task: Task) {
        this.routingService.navigate(
            RouteLinks.DASHBOARDS_DETAIL,
            {
                [RouteQueryParameter.DASHBOARD_ID]: task.dashboardId,
                [RouteQueryParameter.TASK_ID]: task.id,
            },
        )
    }

    onDashboardNavigate(dashboard: Dashboard) {
        this.routingService.navigate(
            RouteLinks.DASHBOARDS_DETAIL, {[RouteQueryParameter.DASHBOARD_ID]: dashboard.id},
        )
    }
}
