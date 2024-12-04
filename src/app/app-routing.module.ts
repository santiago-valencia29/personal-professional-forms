import { NgModule } from '@angular/core'
import { PreloadAllModules, RouterModule, Routes } from '@angular/router'
import { HomeContainerComponent } from './pages/home/home-container/home-container.component'
import { NotFoundComponent } from './shared/not-found/not-found.component'
import { UiElementsComponent } from './pages/ui-elements/containers/ui-elements/ui-elements.component'

const routes: Routes = [
  //Path classic when you don't have lazy loading
  {
    path: 'home',
    pathMatch: 'full',
    component: HomeContainerComponent
  },
  {
    path: 'ui-elements',
    pathMatch: 'full',
    component: UiElementsComponent
  },
  {
    //lazy loading for Modules
    path: 'ui',
    loadChildren: () =>
      import('./pages/ui-elements/ui-elements.module').then(
        (m) => m.UiElementsModule
      )
  },
  {
    path: 'not-found',
    component: NotFoundComponent
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
