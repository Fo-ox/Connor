import {Component, OnInit, TemplateRef} from '@angular/core';
import { TASKS } from "../../mockups/task.mockups";
import { Task } from "../../models/task.models";
import {Observable} from "rxjs";
import {AtomStateService} from "../../services/atom-state/app-atom-state.service";
import {User} from "../../models/user.models";

@Component({
  selector: 'task-table',
  templateUrl: './task-table.component.html',
  styleUrls: ['./task-table.component.less']
})
export class TaskTableComponent implements OnInit {
    public tasks: Task[] = TASKS;
    public userTemplate$: Observable<TemplateRef<any>> = AtomStateService.templates.getAtomValueByKey('TEMPLATE_PARAMETER_USER');
    public users$: Observable<User[]> = AtomStateService.systemUsersState.getAtomValueByKey('SYSTEM_USERS');

    readonly columns = ['task', 'estimate', 'assignee', 'status'];

    constructor() { }

    ngOnInit(): void {
    }
}
