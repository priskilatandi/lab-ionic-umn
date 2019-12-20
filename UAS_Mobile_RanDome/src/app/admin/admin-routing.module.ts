import { Routes, RouterModule } from "@angular/router";
import { AdminPage } from './admin.page';
import { NgModule } from '@angular/core';

const routes: Routes = [
    {
        path: 'tabs',
        component: AdminPage,
        children: [
            {
                path: 'article',
                children: [
                    {
                        path: '',
                        loadChildren: './article/article.module#ArticlePageModule'
                    }
                ]
            },
            {
                path: 'product',
                children: [
                    {
                        path: '',
                        loadChildren: './product/product.module#ProductPageModule'
                    }
                ]
            },
            {
                path: '',
                redirectTo: '/admin/tabs/article',
                pathMatch: 'full'
            }
        ]
    },
    {
        path: '',
        redirectTo: '/admin/tabs/article',
        pathMatch: 'full'
    },
    {
        path: 'tabs/article/add', 
        loadChildren: './article/add/add.module#AddPageModule' 
    },
    {
        path: 'tabs/product/add', 
        loadChildren: './product/add/add.module#AddPageModule' 
    },
  { path: 'tabs/product/:productId', loadChildren: './product/product-detail/product-detail.module#ProductDetailPageModule' },
  { path: 'tabs/article/:articleId', loadChildren: './article/article-detail/article-detail.module#ArticleDetailPageModule' },
  { path: 'tabs/article/edit/:articleId', loadChildren: './article/edit/edit.module#EditPageModule' },
  { path: 'tabs/product/edit/:productId', loadChildren: './product/edit/edit.module#EditPageModule' }




];



@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class AdminRoutingModule {}