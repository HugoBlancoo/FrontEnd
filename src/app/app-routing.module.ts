import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//import { ClientComponent } from './cliente/payment.component';

const routes: Routes = [
  //{ path: 'cliente', component: ClientComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }