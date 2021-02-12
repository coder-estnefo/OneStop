import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () =>
      import('./home/home.module').then((m) => m.HomePageModule),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'property-dashboard',
    loadChildren: () =>
      import('./pages/owner/property/dashboard/dashboard.module').then(
        (m) => m.DashboardPageModule
      ),
  },
  {
    path: 'add-property',
    loadChildren: () =>
      import('./pages/owner/property/add-property/add-property.module').then(
        (m) => m.AddPropertyPageModule
      ),
  },
  {
    path: 'view-properties',
    loadChildren: () =>
      import(
        './pages/owner/property/view-properties/view-properties.module'
      ).then((m) => m.ViewPropertiesPageModule),
  },
  {
    path: 'edit-property',
    loadChildren: () =>
      import('./pages/owner/property/edit-property/edit-property.module').then(
        (m) => m.EditPropertyPageModule
      ),
  },
  {
    path: 'view-appointments',
    loadChildren: () =>
      import(
        './pages/owner/property/view-appointments/view-appointments.module'
      ).then((m) => m.ViewAppointmentsPageModule),
  },
  // {
  //   path: 'login',
  //   loadChildren: () =>
  //     import('./pages/login/login.module').then((m) => m.LoginPageModule),
  // },
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
  {
    path: 'navigation',
    loadChildren: () =>
      import('./pages/owner/navigation/navigation.module').then(
        (m) => m.NavigationPageModule
      ),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
