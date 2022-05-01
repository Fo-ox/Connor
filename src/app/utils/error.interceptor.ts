import {
    HttpErrorResponse,
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
    HttpResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { AtomStateService } from "../services/atom-state/app-atom-state.service";
import { TuiNotification } from "@taiga-ui/core";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let handeledRequest: Observable<HttpEvent<any>>;

        if (request) {
            handeledRequest = next.handle(request).pipe(
                filter((response) => response instanceof HttpResponse && !!response.status),
                tap((response: HttpResponse<any>) => {
                    const error = response.body?.error;
                    if (error) {
                        AtomStateService.notificationState.setAtomByKey({
                            key: 'NOTIFICATION',
                            value: {
                                notificationType: TuiNotification.Error,
                                notificationTitle: 'Response error',
                                notificationContent: error.message || response.status
                            }
                        })
                        throw new HttpErrorResponse({
                            error: 'Response error',
                            headers: response.headers,
                            status: 200,
                            statusText: error.message,
                            url: response.url
                        });
                    }
                }),
            );
            return handeledRequest;
        }

        handeledRequest = next.handle(request);
        return handeledRequest;
    }
}
