import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    OnInit,
    Output,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { filter, map, tap } from "rxjs/operators";
import { BehaviorSubject, combineLatest, Observable } from "rxjs";
import { LoadingService } from "../../../services/loading-service/loading.service";
import { RestApiService } from "../../../services/rest-api-service/rest-api.service";
import { GenerateHelper } from "../../../helpers/generate.helper";
import { ConverterHelper } from "../../../helpers/converter.helper";
import { AtomStateMutations } from "../../../services/atom-state/atom-state.mutations";
import { UserResponse } from "../../../models/user.models";

@Component({
    selector: 'create-user',
    templateUrl: './create-user.component.html',
    styleUrls: ['./create-user.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateUserComponent implements OnInit {
    public formGroup: FormGroup;
    public loading$: Observable<boolean>;

    private loadingStarter$: BehaviorSubject<string> = new BehaviorSubject<string>(null);

    @Output() cancelEvent: EventEmitter<boolean> = new EventEmitter();

    constructor(private formBuilder: FormBuilder, private restApiService: RestApiService) {
        this.formGroup = this.formBuilder.group({
            firstName: [null, Validators.required],
            lastName: [null, Validators.required],
            login: [null, Validators.required],
            password: [null, Validators.required],
            profileIcon: [null],
        })
    }

    ngOnInit() {
        this.loading$ = combineLatest([
            LoadingService.getLoadingState(),
            this.loadingStarter$
        ]).pipe(
            map(([loadingState, loadingId]: [string[], string]) => {
                return !!loadingState?.find((item: string) => item === loadingId)
            })
        );
    }

    onCreate(): void {
        this.formGroup.markAllAsTouched();
        this.formGroup.updateValueAndValidity();
        if (this.formGroup.valid) {
            this.loadingStarter$.next(GenerateHelper.generateUUID());
            this.restApiService.createUser(
                ConverterHelper.convertFormToUserPayload(this.formGroup),
                this.loadingStarter$.value
            ).pipe(
                filter((user: UserResponse) => !!user),
                tap((user: UserResponse) => {
                    AtomStateMutations.setUser(ConverterHelper.convertUserResponseToUser(user));
                    this.cancelEvent.emit(true);
                })
            ).subscribe();
        }
    }
}
