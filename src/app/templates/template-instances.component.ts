import {
    AfterViewChecked,
    ChangeDetectionStrategy,
    Component,
    TemplateRef,
    ViewChild
} from '@angular/core';
import { AtomStateService } from "../services/atom-state/app-atom-state.service";

@Component({
    selector: 'template-instances',
    templateUrl: './template-instances.component.html',
    styleUrls: ['./template-instances.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TemplateInstances implements AfterViewChecked {
    private _isTemplateSet: boolean = false;

    ngAfterViewChecked(): void {
        if (!this._isTemplateSet) {
            AtomStateService.templates.setAtomByKey({
                key: 'TEMPLATE_PARAMETER_TYPE',
                value: this.parameterType
            })
            AtomStateService.templates.setAtomByKey({
                key: 'TEMPLATE_PARAMETER_EMPTY',
                value: this.parameterEmpty
            })
            AtomStateService.templates.setAtomByKey({
                key: 'TEMPLATE_PARAMETER_PRIORITY',
                value: this.parameterPriority
            })
            AtomStateService.templates.setAtomByKey({
                key: 'TEMPLATE_PARAMETER_USER',
                value: this.parameterUser
            })
            AtomStateService.templates.setAtomByKey({
                key: 'TEMPLATE_PARAMETER_VALUE',
                value: this.parameterValue
            })
            AtomStateService.templates.setAtomByKey({
                key: 'TEMPLATE_PARAMETER_DATE',
                value: this.parameterDate
            })
        }
        this._isTemplateSet = true;
    }

    @ViewChild('parameterType') parameterType: TemplateRef<any>
    @ViewChild('parameterEmpty') parameterEmpty: TemplateRef<any>
    @ViewChild('parameterPriority') parameterPriority: TemplateRef<any>
    @ViewChild('parameterUser') parameterUser: TemplateRef<any>
    @ViewChild('parameterValue') parameterValue: TemplateRef<any>
    @ViewChild('parameterDate') parameterDate: TemplateRef<any>
}
