import { Routes, RouterModule } from "@angular/router";
import { HomePage } from './home.page';
import { NgModule } from '@angular/core';

const routes: Routes = [
    {
        path: 'tabs',
        component: HomePage,
        children: [
            {
                path: 'discover',
                children: [
                    {
                        path: '',
                        loadChildren: './discover/discover.module#DiscoverPageModule'
                    },
                    // {
                    //     path: ':articleId',
                    //     loadChildren: './discover/discover-detail/discover-detail.module#DiscoverDetailPageModule'
                    // }
                ]
            },
            {
                path: 'product',
                children: [
                    {
                        path: '',
                        loadChildren: './discover/discover.module#DiscoverPageModule'
                    },
                    // {
                    //     path: ':productId',
                    //     loadChildren: './discover/product-detail/product-detail.module#ProductDetailPageModule'
                    // }
                ]
            },
            {
                path: 'favourite',
                children: [
                    {
                        path: '',
                        loadChildren: './favourite/favourite.module#FavouritePageModule'
                    }
                ]
            },
            {
                path: 'account',
                children: [
                    {
                        path: '',
                        loadChildren: './account/account.module#AccountPageModule'
                    },
                ]
            },
            {
                path: '',
                redirectTo: '/home/tabs/discover',
                pathMatch: 'full'
            }
        ]
    },
    {
        path: '',
        redirectTo: '/home/tabs/discover',
        pathMatch: 'full'
    },
    {
        path: 'tabs/discover/:articleId',
        loadChildren: './discover/discover-detail/discover-detail.module#DiscoverDetailPageModule'
    },
    {
        path: 'tabs/product/:productId',
        loadChildren: './discover/product-detail/product-detail.module#ProductDetailPageModule'
    }
];



@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class HomeRoutingModule {}