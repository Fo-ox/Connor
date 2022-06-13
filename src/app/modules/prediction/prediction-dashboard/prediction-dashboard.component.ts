import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { PREDICTION_TYPES } from "../../../constants/UI.constants";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { distinctUntilChanged, tap } from "rxjs/operators";
import isEqual from "lodash.isequal";
import { AtomStateService } from "../../../services/atom-state/app-atom-state.service";
import {RestApiService} from "../../../services/rest-api-service/rest-api.service";
import {TaskResponse} from "../../../models/task.models";
import {ConverterHelper} from "../../../helpers/converter.helper";

@UntilDestroy()
@Component({
  selector: 'prediction-dashboard',
  templateUrl: './prediction-dashboard.component.html',
  styleUrls: ['./prediction-dashboard.component.less']
})
export class PredictionDashboardComponent implements OnInit {
    public formGroup: FormGroup;

    public tasks$ = AtomStateService.tasksState.getAtomValueByKey('TASKS')

    public readonly PREDICTION_TYPES = PREDICTION_TYPES;

    constructor(private formBuilder: FormBuilder, private restApiService: RestApiService) {
        this.formGroup = this.formBuilder.group({
            filters: [null],
            preview: [this.PREDICTION_TYPES[0]],
            date: [null],
        })
        this.formGroup.controls.date.disable();
    }

    ngOnInit(): void {
        this.formGroup.valueChanges
            .pipe(
                distinctUntilChanged(isEqual),
                tap((formValue) => console.log(formValue)),
                untilDestroyed(this)
            ).subscribe()
    }

    refreshTickets() {
        this.restApiService.loadTasks()
            .pipe(
                tap((tasks: TaskResponse[]) => AtomStateService.tasksState.setAtomByKey({
                    key: 'TASKS',
                    value: tasks?.map((task: TaskResponse) => {
                        return ConverterHelper.convertTaskResponseToTask(task)
                    })
                }))
            ).subscribe();
    }
}
