import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminContainerComponent } from '@soa/shared/layout/containers';
import { AdolescentListComponent } from './adolescent-list/adolescent-list.component';



const routes: Routes = [
  {
    path: '',
    component: AdminContainerComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'funcionary'
      },
      {
        path: 'funcionario',
        loadChildren: () => import('./funcionary/funcionary.module').then(m => m.FuncionaryModule)
      },
      {
        path: 'adolescente',
        loadChildren: () => import('./teenager/teenager.module').then(m => m.TeenagerModule)
      },
      {
        path: 'adolescent-list',
        component: AdolescentListComponent
      }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
