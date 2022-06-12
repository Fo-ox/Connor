import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs";
import { AtomStateService } from "../../services/atom-state/app-atom-state.service";
import {map, tap} from "rxjs/operators";
import { RestApiService } from "../../services/rest-api-service/rest-api.service";
import {Model} from "../../models/model.models";
import {DictionariesService} from "../../services/dictionary-provider/dictionaries.service";
import {Dictionary} from "../../services/dictionary-provider/dictionaries.models";

@Component({
  selector: 'prediction-tool',
  templateUrl: './predition-tool.component.html',
  styleUrls: ['./predition-tool.component.less']
})
export class PreditionToolComponent implements OnInit {
    public dropdownVisible: boolean = false;
    public dictionaries = DictionariesService.objectDictionaries;

    public taskDataSize$: Observable<number> = AtomStateService.tasksCountState.getAtomValueByKey('TASKS_COUNT');
    public defaultModel$: Observable<Model> = AtomStateService.defaultModelState.getAtomValueByKey('DEFAULT_MODEL')
        .pipe(tap((defaultModel: Model) => {
            this.defaultModel = PreditionToolComponent.getDisplayModelName(defaultModel);
        }));
    public models$: Observable<string[]> = AtomStateService.modelsState.getAtomValueByKey('MODELS')
        .pipe(
            tap((models: Model[]) => this.models = models),
            map((models: Model[]) => models?.map((model: Model) => PreditionToolComponent.getDisplayModelName(model))))

    public trainSelectedType: string = DictionariesService.objectDictionaries.modelType['randomForest'].displayName
    public modelTypes: string[] = DictionariesService.arrayDictionaries.modelType.map((item: Dictionary) => item.displayName);
    public defaultModel: string;

    private models: Model[];

    constructor(private restApiService: RestApiService) { }

    ngOnInit(): void {
    }

    _onOpenDropdown(open: boolean) {
        if (open) {
            this.restApiService.loadTasksCount()
                .pipe(
                    tap((count: number) => AtomStateService.tasksCountState.setAtomByKey({
                        key: 'TASKS_COUNT',
                        value: count
                    }))
                ).subscribe();

            this.restApiService.loadModels()
                .pipe(
                    tap((models: Model[]) => AtomStateService.modelsState.setAtomByKey({
                        key: 'MODELS',
                        value: models
                    }))
                ).subscribe();

            this.restApiService.loadDefaultModel()
                .pipe(
                    tap((model: Model) => AtomStateService.defaultModelState.setAtomByKey({
                        key: 'DEFAULT_MODEL',
                        value: model
                    }))
                ).subscribe();
        }
    }

    public static getDisplayModelName(model: Model): string {
        if (!model) {
            return null;
        }
        return `${DictionariesService.objectDictionaries.modelType[model.type].displayName} / v ${model.version}.0`;
    }

    startTrain() {
        this.restApiService.trainNewModel(
            DictionariesService.arrayDictionaries.modelType
                .find((item: Dictionary) => item.displayName === this.trainSelectedType).key
        ).subscribe(() => this.dropdownVisible = false)
    }

    _onSelectNewDefaultModel() {
        this.restApiService.setDefaultModel(
            this.models.find((model: Model) => this.defaultModel === PreditionToolComponent.getDisplayModelName(model))?.id
        ).subscribe()
    }
}
