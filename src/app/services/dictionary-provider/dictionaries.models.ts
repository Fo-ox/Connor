export type Dictionary = {
    key: string;
    displayName: string;
    description?: string;
    isDefault?: boolean;
    isDelete?: boolean;
    icon?: Icon;
}

export type Icon = {
    name?: string;
    color?: string;
    backgroundColor?: string;
}

export interface Transition extends Dictionary {
    fromStatus: string;
    toStatus: string;
}

export type DictionariesBeArray = {
    status?: Dictionary[];
    priority?: Dictionary[];
    type?: Dictionary[];
    transition?: Transition[];
    modelType?: Dictionary[];
}

export type DictionariesBeObject = {
    status?: Record<string, Dictionary>
    priority?: Record<string, Dictionary>
    type?: Record<string, Dictionary>
    transition?: Record<string, Transition>
    modelType?: Record<string, Dictionary>;
}
