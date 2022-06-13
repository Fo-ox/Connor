import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RouteLinks } from "./services/routing-service/routing.service";
import { AuthorisationGuard } from "./services/routing-service/authorisationGuard";

const routes: Routes = [
    {
        path: RouteLinks.DASHBOARDS,
        canActivate: [AuthorisationGuard],
        loadChildren: () => import('./modules/dashboards/dashboards.module').then(m => m.DashboardsModule)
    },
    {
        path: RouteLinks.PREDICTION,
        canActivate: [AuthorisationGuard],
        loadChildren: () => import('./modules/prediction/prediction.module').then(m => m.PredictionModule)
    },
    {
        path: RouteLinks.DASHBOARDS_DETAIL,
        canActivate: [AuthorisationGuard],
        loadChildren: () => import('./modules/dashboard-detail/dashboard-detail.module').then(m => m.DashboardDetailModule)
    },
    {
        path: RouteLinks.DIALOG,
        canActivate: [AuthorisationGuard],
        loadChildren: () => import('./modules/dialog/dialog.module').then(m => m.DialogModule)
    },
    {
        path: RouteLinks.NOT_FOUND,
        canActivate: [AuthorisationGuard],
        loadChildren: () => import('./modules/not-found-page/not-found-page.module').then(m => m.NotFoundPageModule)
    },
    {
        path: RouteLinks.LOGIN,
        loadChildren: () => import('./modules/login/login.module').then(m => m.LoginModule)
    },
    {
        path: '**',
        redirectTo: RouteLinks.NOT_FOUND
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {useHash: true})],
    exports: [RouterModule],
    providers: [AuthorisationGuard]
})
export class AppRoutingModule { }
