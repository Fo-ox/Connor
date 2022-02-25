import { AtomKeys } from './app-atom-state.models';

export type Atom<K extends AtomKeys, T> = {
    key: K;
    value: T;
};

export type AbstractAtomState = Atom<AtomKeys, any>;
