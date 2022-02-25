import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { RestApiService } from "../rest-api-service/rest-api.service";
import { RouteLinks, RoutingService } from "./routing.service";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class AuthorisationGuard implements CanActivate {
    constructor(private routingService: RoutingService) {
    }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : Observable<boolean> | boolean {
        if (RestApiService.hasSessionUser()) {
            return true;
        } else {
            this.routingService.navigate(RouteLinks.LOGIN);
            return false;
        }
    }
}
