import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddNotesComponent } from './components/addNotes/addNotes.component';
import { NotesDetailsComponent } from './components/notes-details/notes-details.component';
import {AuthComponent } from './components/auth/auth.component'

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component : AuthComponent },
  {
    path: '',
    children: [
      { path: 'list-notes', component : NotesDetailsComponent },
      { path: 'add-notes', component : AddNotesComponent }
  
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
