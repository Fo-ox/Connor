import { Observable } from "rxjs";
import { AtomStateService } from "../atom-state/app-atom-state.service";
import { switchMap, take } from "rxjs/operators";

export class LoadingService {
    public static getLoadingState(): Observable<string[]> {
        return AtomStateService.loadingState.getAtomValueByKey('LOADING');
    }

    public static startLoadingById(id: string): void {
        LoadingService.getLoadingState()
            .pipe(
                take(1),
                switchMap((loadingState: string[]) => {
                    return AtomStateService.loadingState.setAtomByKey({
                        key: 'LOADING',
                        value: loadingState?.find((item: string) => item === id)
                            ? loadingState
                            : loadingState?.length
                                ? loadingState.push(id) && loadingState
                                : [id]
                    })
                }),
            ).subscribe();
    }

    public static finishLoadingById(id: string): void {
        LoadingService.getLoadingState()
            .pipe(
                take(1),
                switchMap((loadingState: string[]) => {
                    return AtomStateService.loadingState.setAtomByKey({
                        key: 'LOADING',
                        value: loadingState?.filter((item: string) => item !== id)
                    })
                }),
            ).subscribe();
    }
}
