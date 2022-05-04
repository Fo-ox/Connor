import {
    HttpErrorResponse,
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
    HttpResponse, HttpStatusCode,
} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError, filter, tap} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { AtomStateService } from "../services/atom-state/app-atom-state.service";
import { TuiNotification } from "@taiga-ui/core";
import {RouteLinks, RoutingService} from "../services/routing-service/routing.service";
import {RestApiService} from "../services/rest-api-service/rest-api.service";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private routingService: RoutingService) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let handeledRequest: Observable<HttpEvent<any>>;

        if (request) {
            handeledRequest = next.handle(request).pipe(
                filter((response) => response instanceof HttpResponse && !!response.status),
                catchError((error) => {
                    if (error.status === HttpStatusCode.Unauthorized) {
                        RestApiService.clearSessionUser();
                        this.routingService.navigate(RouteLinks.LOGIN);
                    }
                    return of(null);
                }),
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
