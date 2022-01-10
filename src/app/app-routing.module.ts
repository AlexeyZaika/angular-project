import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CatalogComponent } from '@pages/catalog/catalog.component';
import { Router } from '@shared/enums/router.enum';

const routes: Routes = [
  {
    path: Router.home,
    component: CatalogComponent,
  },
  {
    path: Router.product,
    loadChildren: () => import('@pages/product/product.module').then(module => module.ProductModule),
  },
  {
    path: Router.about,
    loadChildren: () => import('@pages/about/about.module').then(module => module.AboutModule),
  },
  {
    path: Router.delivery,
    loadChildren: () => import('./pages/delivery/delivery.module').then(module => module.DeliveryModule),
  },
  {
    path: Router.contacts,
    loadChildren: () => import('./pages/contacts/contacts.module').then(module => module.ContactsModule),
  },
  {
    path: Router.user,
    loadChildren: () => import('./pages/user/user.module').then(module => module.UserModule),
  },
  {
    path: Router.login,
    loadChildren: () => import('./pages/login/login.module').then(module => module.LoginModule),
  },
  {
    path: Router.cart,
    loadChildren: () => import('./pages/cart/cart.module').then(module => module.CartModule),
  },
  {
    path: Router.notFound,
    loadChildren: () => import('./pages/not-found/not-found.module').then(module => module.NotFoundModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
