import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { DashboardDetailComponent } from "./dashboard-detail.component";

const routes: Routes = [
    {
        path: '',
        component: DashboardDetailComponent
    }
]

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ]
})
export class DashboardsDetailRoutingModule {}
