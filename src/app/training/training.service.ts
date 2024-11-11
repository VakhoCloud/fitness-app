import { Injectable } from "@angular/core";
import { Exercise } from "./exercise.model";
import { Subject, Subscription, take } from "rxjs";
import { Firestore, collectionData, addDoc } from "@angular/fire/firestore";
import { collection } from "firebase/firestore";
import { UIService } from "../shared/ui.service";
import { Store } from "@ngrx/store";
import * as fromTraining from "./training.reducer"
import * as Training from "./training.actions"
import * as UI from '../shared/ui.actions'


@Injectable({providedIn: "root"})
export class TrainingService {
    private fbSubs: Subscription[] = [];

    constructor(
        private db: Firestore, 
        private uiService: UIService,
        private store: Store<fromTraining.State>
    ){}

    fetchAvailableExercises() {
        this.store.dispatch(new UI.StartLoading())
        this.fbSubs.push(
        collectionData(collection(this.db, 'availableExercises'), { idField: 'id'})
            .subscribe((exercises: Exercise[]) => {
                this.store.dispatch(new UI.StopLoading())
                this.store.dispatch(new Training.SetAvailableTrainings(exercises));
        }, error => {
            this.store.dispatch(new UI.StopLoading())

            this.uiService.showSnackbar('Fetching Exercise failed, please try again later', null, 3000);
        }));
    }

    startExercise(selectedId: string) {
        this.store.dispatch(new Training.StartTraining(selectedId));
    }

    completeExercise() {
        this.store.select(fromTraining.getActiveExercises).pipe(take(1)).subscribe(ex => {
            this.addDataToDatabase({ 
                ...ex, 
                date: new Date(),  
                state: 'completed'
            });
            this.store.dispatch(new Training.StopTraining());
        });
    }

    cancelExercise(progress: number) {
        this.store.select(fromTraining.getActiveExercises).pipe(take(1)).subscribe(ex => {
            this.addDataToDatabase({ 
                ...ex, 
                duration: ex.duration * (progress / 100),
                calories: ex.calories * (progress / 100),
                date: new Date(), 
                state: 'cancelled'
            });
            this.store.dispatch(new Training.StopTraining());
        })
    }

    fetchPastTrainings() {
        this.fbSubs.push(
            collectionData(collection(this.db, 'finishedExercises'))
                .subscribe((exercises: Exercise[]) => {
                    this.store.dispatch(new Training.SetFinishedTrainings(exercises));
                }
            )
        );
    }

    cancelSubscriptions() {
        this.fbSubs.forEach(sub => sub.unsubscribe());
    }

    private addDataToDatabase(exercise: Exercise) { 
        addDoc(collection(this.db, 'finishedExercises'), exercise);
    }
}
