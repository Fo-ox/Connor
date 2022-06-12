import { Dictionary, Transition } from "./dictionaries.models";

export const MODEL_TYPE_DICTIONARY: Dictionary[] = [
    {
        key: 'randomForest',
        displayName: 'Random Forest'
    },
    {
        key: 'linearRegression',
        displayName: 'Linear Regression'
    },
]

export const TYPE_DICTIONARY: Dictionary[] = [
    {
        key: '10001',
        displayName: 'Story',
        icon: {
            name: 'd-type-story',
        }
    },
    {
        key: '10004',
        displayName: 'Bug',
        icon: {
            name: 'd-type-bug',
        }
    },
    {
        key: 'TASK',
        displayName: 'Task',
        icon: {
            name: 'd-type-task',
        },
        isDefault: true
    }
];

export const PRIORITY_DICTIONARY: Dictionary[] = [
    {
        key: 'LOW',
        displayName: 'Low',
        icon: {
            color: '#70B6F6',
            backgroundColor: '#EDF6FE',
        }
    },
    {
        key: 'NORMAL',
        displayName: 'Normal',
        icon: {
            color: '#4AC99B',
            backgroundColor: '#E9F8F3',
        },
        isDefault: true
    },
    {
        key: 'MAJORE',
        displayName: 'Majore',
        icon: {
            color: '#FFC700',
            backgroundColor: '#FFF8E0',
        }
    },
    {
        key: 'CRITICAL',
        displayName: 'Critical',
        icon: {
            color: '#F45725',
            backgroundColor: '#FDEAE4',
        }
    }
];

export const STATUS_DICTIONARY: Dictionary[] = [
    {
        key: '10000',
        displayName: 'Open',
        isDefault: true
    },
    {
        key: '10001',
        displayName: 'In progress'
    },
    {
        key: '10004',
        displayName: 'Technical review'
    },
    {
        key: '10003',
        displayName: 'Hold'
    },
    {
        key: '10002',
        displayName: 'Done',
        isDelete: true
    }
];

export const STATUS_TRANSITION_DICTIONARY: Transition[] = [
    {
        key: 'OPEN_TO_PROGRESS',
        displayName: 'Start progress',
        fromStatus: 'OPEN',
        toStatus: 'IN_PROGRESS'
    },
    {
        key: 'PROGRESS_TO_OPEN',
        displayName: 'Reopen',
        fromStatus: 'IN_PROGRESS',
        toStatus: 'OPEN'
    },
    {
        key: 'PROGRESS_TO_REVIEW',
        displayName: 'Start review',
        fromStatus: 'IN_PROGRESS',
        toStatus: 'TECH_REVIEW'
    },
    {
        key: 'REVIEW_TO_PROGRESS',
        displayName: 'To Progress',
        fromStatus: 'TECH_REVIEW',
        toStatus: 'IN_PROGRESS'
    },
    {
        key: 'REVIEW_TO_DONE',
        displayName: 'Close',
        fromStatus: 'TECH_REVIEW',
        toStatus: 'DONE'
    },
    {
        key: 'OPEN_TO_DELETE',
        displayName: 'Delete',
        fromStatus: 'OPEN',
        toStatus: 'DELETE'
    },
    {
        key: 'TECH_REVIEW_TO_DELETE',
        displayName: 'Delete',
        fromStatus: 'TECH_REVIEW',
        toStatus: 'DELETE'
    },
    {
        key: 'DONE_TO_DELETE',
        displayName: 'Delete',
        fromStatus: 'DONE',
        toStatus: 'DELETE'
    },
]
