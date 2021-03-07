import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { redirectUnauthorizedTo, canActivate } from '@angular/fire/auth-guard';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['/login']);

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () =>
      import('./home/home.module').then((m) => m.HomePageModule),
  },
  {
    path: '',
    redirectTo: 'navigation',
    pathMatch: 'full',
  },
  {
    path: 'property-dashboard',
    loadChildren: () =>
      import('./pages/owner/property/dashboard/dashboard.module').then(
        (m) => m.DashboardPageModule
      ),
    ...canActivate(redirectUnauthorizedToLogin),
  },
  {
    path: 'add-property',
    loadChildren: () =>
      import('./pages/owner/property/add-property/add-property.module').then(
        (m) => m.AddPropertyPageModule
      ),
    ...canActivate(redirectUnauthorizedToLogin),
  },
  {
    path: 'view-properties',
    loadChildren: () =>
      import(
        './pages/owner/property/view-properties/view-properties.module'
      ).then((m) => m.ViewPropertiesPageModule),
    ...canActivate(redirectUnauthorizedToLogin),
  },
  {
    path: 'edit-property',
    loadChildren: () =>
      import('./pages/owner/property/edit-property/edit-property.module').then(
        (m) => m.EditPropertyPageModule
      ),
    ...canActivate(redirectUnauthorizedToLogin),
  },
  {
    path: 'view-appointments',
    loadChildren: () =>
      import(
        './pages/owner/property/view-appointments/view-appointments.module'
      ).then((m) => m.ViewAppointmentsPageModule),
    ...canActivate(redirectUnauthorizedToLogin),
  },

  {
    path: 'navigation',
    loadChildren: () =>
      import('./pages/owner/navigation/navigation.module').then(
        (m) => m.NavigationPageModule
      ),
    ...canActivate(redirectUnauthorizedToLogin),
  },

  {
    path: 'login',
    loadChildren: () =>
      import('./pages/owner/login/login.module').then((m) => m.LoginPageModule),
  },
  {
    path: 'register',
    loadChildren: () =>
      import('./pages/owner/register/register.module').then(
        (m) => m.RegisterPageModule
      ),
  },
  // {
  //   path: 'car-wash-dashboard',
  //   loadChildren: () => import('./pages/owner/car-wash/car-wash-dashboard/car-wash-dashboard.module').then( m => m.CarWashDashboardPageModule)
  // },
  // {
  //   path: 'add-car-wash-details',
  //   loadChildren: () => import('./pages/owner/car-wash/add-car-wash-details/add-car-wash-details.module').then( m => m.AddCarWashDetailsPageModule)
  // },
  // {
  //   path: 'add-car-wash-services',
  //   loadChildren: () => import('./pages/owner/car-wash/add-car-wash-services/add-car-wash-services.module').then( m => m.AddCarWashServicesPageModule)
  // },
  {
    path: 'messages',
    loadChildren: () => import('./pages/owner/property/messages/messages.module').then( m => m.MessagesPageModule)
  },
  {
    path: 'add-carwash',
    loadChildren: () => import('./pages/owner/carwash/add-carwash/add-carwash.module').then( m => m.AddCarwashPageModule),
    ...canActivate(redirectUnauthorizedToLogin),
  },
  {
    path: 'carwash-dashboard',
    loadChildren: () => import('./pages/owner/carwash/dashboard/dashboard.module').then( m => m.DashboardPageModule),
    ...canActivate(redirectUnauthorizedToLogin),
  },
  {
    path: 'edit-carwash',
    loadChildren: () => import('./pages/owner/carwash/edit-carwash/edit-carwash.module').then( m => m.EditCarwashPageModule),
    ...canActivate(redirectUnauthorizedToLogin),
  },
  {
    path: 'view-carwashes',
    loadChildren: () => import('./pages/owner/carwash/view-carwashes/view-carwashes.module').then( m => m.ViewCarwashesPageModule)
  },
  {
    path: 'cleaning-dashboard',
    loadChildren: () => import('./pages/owner/cleaning-services/dashboard/dashboard.module').then( m => m.DashboardPageModule)
  },  {
    path: 'cleaning-details',
    loadChildren: () => import('./pages/owner/cleaning-services/cleaning-details/cleaning-details.module').then( m => m.CleaningDetailsPageModule)
  },
  {
    path: 'view-cleaning-services',
    loadChildren: () => import('./pages/owner/cleaning-services/view-cleaning-services/view-cleaning-services.module').then( m => m.ViewCleaningServicesPageModule)
  },






  /* {
    path: 'login',
    loadChildren: () =>
    import('./pages/login/login.module').then((m) => m.LoginPageModule),
  },
 {
   path: 'registration',
   loadChildren: () => import('./pages/registration/registration.module').then( m => m.RegistrationPageModule)
 },*/
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
