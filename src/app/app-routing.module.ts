import { NgModule } from '@angular/core'
import { PreloadAllModules, RouterModule, Routes } from '@angular/router'
import { HomeContainerComponent } from './pages/home/home-container/home-container.component'
import { FormsContainerComponent } from './pages/forms/containers/forms-container/forms-container.component'

const routes: Routes = [
  //Path classic when you don't have lazy loading
  {
    path: 'home',
    pathMatch: 'full',
    component: HomeContainerComponent
  },
  {
    path: 'forms-answers',
    pathMatch: 'full',
    component: FormsContainerComponent
  },
  {
    //lazy loading for Modules
    path: 'forms',
    loadChildren: () =>
      import('./pages/forms/forms-container.module').then((m) => m.FormsContainerModule)
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'home'
  }
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: true,
      preloadingStrategy: PreloadAllModules
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
