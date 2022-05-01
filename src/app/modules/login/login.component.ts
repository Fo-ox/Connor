import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { RestApiService } from "../../services/rest-api-service/rest-api.service";
import { RouteLinks, RoutingService } from "../../services/routing-service/routing.service";
import { catchError, map, tap } from "rxjs/operators";
import { BehaviorSubject, combineLatest, Observable, of } from "rxjs";
import { AtomStateService } from "../../services/atom-state/app-atom-state.service";
import { GenerateHelper } from "../../helpers/generate.helper";
import { LoadingService } from "../../services/loading-service/loading.service";
import { UserResponse } from "../../models/user.models";
import { Token } from "../../models/data.models";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent {
    public formGroup: FormGroup;
    public invalid: boolean = false;
    public loading$: Observable<boolean>;

    private loadingStarter$: BehaviorSubject<string> = new BehaviorSubject<string>(null);

    constructor(private formBuilder: FormBuilder,
                private routingService: RoutingService,
                private restApiService: RestApiService) {
        this.formGroup = this.formBuilder.group({
            login: [null, Validators.required],
            password: [null, Validators.required]
        })

        this.loading$ = combineLatest([
            LoadingService.getLoadingState(),
            this.loadingStarter$
        ]).pipe(
            map(([loadingState, loadingId]: [string[], string]) => {
                return !!loadingState?.find((item: string) => item === loadingId)
            })
        )
    }

    onLogin() {
        this.formGroup.markAllAsTouched();
        this.formGroup.updateValueAndValidity();
        if (this.formGroup.valid) {
            this.loadingStarter$.next(GenerateHelper.generateUUID());
            this.invalid = false;
            this.restApiService.login(
                this.formGroup.controls.login.value,
                this.formGroup.controls.password.value,
                this.loadingStarter$.value
            ).pipe(
                tap((response: UserResponse & Token) => {
                    RestApiService.saveSessionUser({
                        userToken: response.access_token,
                        userId: response.id
                    });
                    AtomStateService.tokenState.setAtomByKey({
                        key: 'TOKEN',
                        value: {
                            userId: response.id,
                            userToken: response.access_token
                        }
                    })
                    this.routingService.navigate(RouteLinks.DASHBOARDS);
                }),
                catchError(() => {
                    this.invalid = true;
                    return of(null);
                })
            ).subscribe();
        }
    }
}
