import { NgModule } from "@angular/core";
import { CurrentTrainingComponent } from "./current-training/current-training.component";
import { PastTrainingsComponent } from "./past-trainings/past-trainings.component";
import { NewTrainingComponent } from "./new-training/new-training.component";
import { SharedModule } from "../shared/shared.module";
import { TrainingComponent } from "./training.component";
import { StopTrainingComponent } from "./current-training/stop-training.component";
import { FirestoreModule } from "@angular/fire/firestore";
import { TrainingRoutingModule } from "./training-routing.module";
import { StoreModule } from "@ngrx/store";
import { trainingReducer } from "./training.reducer";

@NgModule({
    declarations: [
        TrainingComponent,
        CurrentTrainingComponent,
        PastTrainingsComponent,
        NewTrainingComponent,
        StopTrainingComponent
    ],
    imports: [
        SharedModule,
        FirestoreModule,
        TrainingRoutingModule,
        StoreModule.forFeature('training', trainingReducer),
    ]
})
export class TrainingModule {}

