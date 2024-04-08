import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { HighlightDirective } from './directive/highlight.directive';
import { MonthFilterPipe } from './month-filter.pipe';
import { InputRestrictDirective } from './directive/input-restrict.directive';
import { TrackerComponent } from './tracker/tracker.component';
import { HeaderComponent } from './header/header.component';
import { VisualizationComponent } from './visualization/visualization.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { SavingModalComponent } from './saving-modal/saving-modal.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
@NgModule({
  declarations: [AppComponent, HighlightDirective, MonthFilterPipe, InputRestrictDirective, TrackerComponent, HeaderComponent, VisualizationComponent, SavingModalComponent],
  imports: [BrowserAnimationsModule,MatToolbarModule,MatIconModule, MatDialogModule,BrowserModule, AppRoutingModule, ReactiveFormsModule, FormsModule, NoopAnimationsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
