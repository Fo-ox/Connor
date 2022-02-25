import { logInDebug } from "../../utils/login-debug";
import { AbstractAtomState } from "./atom-state.models";
import { BehaviorSubject, Observable } from "rxjs";
import { AtomKeys } from "./app-atom-state.models";
import { distinctUntilChanged, map } from "rxjs/operators";
import isEqual from 'lodash.isequal'

export class AbstractAtomService<AtomsUnion extends AbstractAtomState> {
    private state$: BehaviorSubject<AtomsUnion[]> = new BehaviorSubject<AtomsUnion[]>([]);
    private lastStateBuffer: AtomsUnion[] = [];
    private readonly serviceName: string;

    constructor(serviceName: string) {
        this.serviceName = serviceName;
        logInDebug(`[ATOM SERVICE]: CONSTRUCT INSTANCE FOR ${this.serviceName}`);
    }

    public getAtoms(): Observable<AtomsUnion[]> {
        return this.state$;
    }

    public getAtomByKey(key: AtomKeys): Observable<AtomsUnion> {
        return this.state$.pipe(
            map((atoms: AtomsUnion[]) => atoms.find((atom: AtomsUnion) => atom.key === key)),
            distinctUntilChanged(isEqual),
        );
    }

    public getAtomValueByKey<T = AtomsUnion['value']>(key: AtomKeys): Observable<T> {
        return this.state$.pipe(
            map((atoms: AtomsUnion[]) => atoms.find((atom: AtomsUnion) => atom.key === key)),
            distinctUntilChanged(isEqual),
            map((atomUnion: AtomsUnion) => atomUnion?.value)
        );
    }

    public setAtomByKey(newAtom: AtomsUnion): Observable<AtomsUnion[]> {
        this.lastStateBuffer = [
            ...this.lastStateBuffer.filter((atom:AtomsUnion) => atom.key !== newAtom.key),
            ...[newAtom],
        ];
        return this.mutateAtoms();
    }

    public deleteAtomByKey(key: AtomKeys): Observable<AtomsUnion[]> {
        this.lastStateBuffer = [
            ...this.lastStateBuffer.filter((atom:AtomsUnion) => atom.key !== key),
        ];
        return this.mutateAtoms();
    }

    public clearAtoms(): Observable<AtomsUnion[]> {
        this.lastStateBuffer = [];
        return this.mutateAtoms();
    }

    private mutateAtoms(): Observable<AtomsUnion[]> {
        logInDebug(`[ATOM SERVICE]: MUTATE ${this.serviceName}`);
        logInDebug(this.lastStateBuffer);
        this.state$.next(this.lastStateBuffer);
        return this.state$;
    }
}
