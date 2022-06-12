import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { Task } from "../../models/task.models";
import { Observable } from "rxjs";
import { AtomStateService } from "../../services/atom-state/app-atom-state.service";
import { User } from "../../models/user.models";
import { TuiComparator } from "@taiga-ui/addon-table";

@Component({
  selector: 'task-table',
  templateUrl: './task-table.component.html',
  styleUrls: ['./task-table.component.less']
})
export class TaskTableComponent implements OnInit {
    @Input() tasks: Task[];

    public userTemplate$: Observable<TemplateRef<any>> = AtomStateService.templates.getAtomValueByKey('TEMPLATE_PARAMETER_USER');
    public estimateTemplate$: Observable<TemplateRef<any>> = AtomStateService.templates.getAtomValueByKey('TEMPLATE_PARAMETER_ESTIMATE');
    public users$: Observable<User[]> = AtomStateService.systemUsersState.getAtomValueByKey('SYSTEM_USERS');

    readonly estimateSorter: TuiComparator<Task> = (a: Task, b: Task) => {
        return +a?.predictEstimate - +b?.predictEstimate;
    }

    readonly columns = ['task', 'estimate', 'assignee', 'status'];

    constructor() { }

    ngOnInit(): void {
    }
}
