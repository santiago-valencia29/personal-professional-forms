import { NgModule, isDevMode } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { SharedModule } from './shared/shared.module'
import { HomeModule } from './pages/home/home.module'
import { FormsContainerModule } from './pages/forms/forms-container.module'
import { ServiceWorkerModule } from '@angular/service-worker'
import { environment } from 'src/environments/environment'
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http'

@NgModule({
  declarations: [AppComponent],
  bootstrap: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgbModule,
    SharedModule,
    HomeModule,
    FormsContainerModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      // enabled: !isDevMode(),
      enabled: environment.production,
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerImmediately'
    })
  ],
  providers: [provideHttpClient(withInterceptorsFromDi())]
})
export class AppModule {}
