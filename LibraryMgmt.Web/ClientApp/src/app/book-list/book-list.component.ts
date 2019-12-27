import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../services.service';
import { Router } from '@angular/router';
import { BookData } from '../_model';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {

  public bookList: BookData;
  constructor(private router: Router, private ss: ServicesService) { }

  ngOnInit() {
    this.ss.GetBook().subscribe(
      (data) => {
        this.bookList = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  deleteBook(id: number): any {    
    this.ss.DeleteBook(id).subscribe(
      (data) => {
        console.log(data);
        alert('Deleted Successfully');
        
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate(['listbook']);
      },
      (error) => {
        console.log('error', error);
      }
    );
  }

  editBook(id: number): any {    
    this.router.navigate(['/addbook/' + id]);
  }

}
