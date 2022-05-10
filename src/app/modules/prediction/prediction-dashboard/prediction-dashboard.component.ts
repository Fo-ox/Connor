import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { PREDICTION_TYPES } from "../../../constants/UI.constants";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { distinctUntilChanged, tap } from "rxjs/operators";
import isEqual from "lodash.isequal";

@UntilDestroy()
@Component({
  selector: 'prediction-dashboard',
  templateUrl: './prediction-dashboard.component.html',
  styleUrls: ['./prediction-dashboard.component.less']
})
export class PredictionDashboardComponent implements OnInit {
    public formGroup: FormGroup;

    public readonly PREDICTION_TYPES = PREDICTION_TYPES;

    constructor(private formBuilder: FormBuilder) {
        this.formGroup = this.formBuilder.group({
            filters: [null],
            preview: [this.PREDICTION_TYPES[0]],
            date: [null],
        })
    }

    ngOnInit(): void {
        this.formGroup.valueChanges
            .pipe(
                distinctUntilChanged(isEqual),
                tap((formValue) => console.log(formValue)),
                untilDestroyed(this)
            ).subscribe()
    }
}
