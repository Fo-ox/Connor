import { NgDompurifySanitizer } from "@tinkoff/ng-dompurify";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import {
    TuiRootModule,
    TuiDialogModule,
    TuiNotificationsModule,
    TUI_SANITIZER,
    TuiButtonModule,
    TuiDropdownModule
} from "@taiga-ui/core";
import { NgModule } from '@angular/core';
import { BrowserModule, HammerModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SvgIconsModule } from "@ngneat/svg-icon";
import { getAllIcons, ICON_CONFIGURATION } from "../assets/svg/svg-icons-configuration";
import { RoutingService } from "./services/routing-service/routing.service";
import { TemplateInstancesModule } from "./templates/template-instances.module";
import { RestApiService } from "./services/rest-api-service/rest-api.service";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { NotificationModule } from "./modules/notification/notification.module";
import { POLYMORPHEUS_CONTEXT, PolymorpheusModule } from "@tinkoff/ng-polymorpheus";
import { SocketService } from "./services/socket-server/socket.service";
import { ErrorInterceptor } from "./utils/error.interceptor";

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        SvgIconsModule.forRoot(ICON_CONFIGURATION),
        SvgIconsModule.forChild(getAllIcons()),
        TuiRootModule,
        BrowserAnimationsModule,
        TuiDialogModule,
        TuiNotificationsModule,
        TuiButtonModule,
        TuiDropdownModule,
        HammerModule,
        TemplateInstancesModule,
        NotificationModule,
        PolymorpheusModule,
    ],
    providers: [
        {provide: TUI_SANITIZER, useClass: NgDompurifySanitizer},
        {provide: POLYMORPHEUS_CONTEXT, useClass:PolymorpheusModule},
        RoutingService,
        RestApiService,
        SocketService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: ErrorInterceptor,
            multi: true,
        },
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
