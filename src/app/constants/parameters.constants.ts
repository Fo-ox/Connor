import { Task } from "../models/task.models";
import { AtomKeys } from "../services/atom-state/app-atom-state.models";

export const parametersNameMap: Map<keyof Task, string> = new Map<keyof Task, string>([
    ['status', 'Status'],
    ['type', 'Type'],
    ['priority', 'Priority'],
    ['reporter', 'Reporter'],
    ['assignee', 'Assignee'],
    ['creationDate', 'Created'],
    ['updateDate', 'Last update'],
]);

export const parametersTemplateMap: Map<keyof Task, AtomKeys> = new Map<keyof Task, AtomKeys>([
    ['status', 'TEMPLATE_PARAMETER_VALUE'],
    ['type', 'TEMPLATE_PARAMETER_TYPE'],
    ['priority', 'TEMPLATE_PARAMETER_PRIORITY'],
    ['reporter', 'TEMPLATE_PARAMETER_USER'],
    ['assignee', 'TEMPLATE_PARAMETER_USER'],
    ['creationDate', 'TEMPLATE_PARAMETER_DATE'],
    ['updateDate', 'TEMPLATE_PARAMETER_DATE'],
]);
