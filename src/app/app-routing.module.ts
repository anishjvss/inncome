import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TrackerComponent } from './tracker/tracker.component';
import { VisualizationComponent } from './visualization/visualization.component';

const routes: Routes = [
  { path: '', component: TrackerComponent },
  { path: 'analytics', component: VisualizationComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
