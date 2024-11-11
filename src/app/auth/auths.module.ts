import { NgModule } from "@angular/core";
import { LoginComponent } from "./login/login.component";
import { SignupComponent } from "./signup/signup.component";
import { AuthModule } from "@angular/fire/auth";
import { ReactiveFormsModule } from "@angular/forms";

import { SharedModule } from "../shared/shared.module";
import { AuthRoutingModule } from "./auth-routing.module";

@NgModule({
    declarations: [
        LoginComponent,
        SignupComponent
    ],
    imports: [
        ReactiveFormsModule,
        AuthModule,
        SharedModule,    
        AuthRoutingModule
    ],
    exports: []
})
export class AuthsModule {}
