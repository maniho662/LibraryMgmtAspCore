import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { BookComponent } from './book/book.component';
import { BookListComponent } from './book-list/book-list.component';

const routes: Routes = [{
  path: 'addbook:/id',
  component: BookComponent
},
{
  path: 'addbook',
  component: BookComponent
},
{
  path: 'listbook',
  component: BookListComponent
},
{
  path: '**',
  component: BookListComponent
},
{
  path: '',
  component: HomeComponent,
  pathMatch: 'full'
},
{ 
  path: 'counter', 
  component: CounterComponent 
},
{ 
  path: 'fetch-data', 
  component: FetchDataComponent 
}];

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    BookComponent,
    BookListComponent    
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,    
    ReactiveFormsModule,
    RouterModule.forRoot(routes, {useHash: true})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
