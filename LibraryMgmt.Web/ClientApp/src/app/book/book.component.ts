import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ServicesService } from '../services.service';
import { Router, ActivatedRoute } from '@angular/router';
import { BookData } from '../_model';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})

export class BookComponent implements OnInit {

  public formValue: any;
  public bookDet: FormGroup;
  public isEdit: boolean = false;
  public dt: BookData;

  constructor(private router: Router, private route: ActivatedRoute, private fb: FormBuilder, private ss: ServicesService) { }

  ngOnInit() {
    this.builForm();

    let id = this.route.snapshot.params["id"];
    console.log(id);
    if (id != null) {
      this.isEdit = true;

      this.ss.GetBookById(id).subscribe(
        (data) => {
          this.dt = new BookData();
          Object.assign(this.dt, data[0]); 
          //this.dt.id = data[0].id;
          //this.dt.bookName = data[0].bookName;
          //this.dt.authorName = data[0].authorName;
          //this.dt.bookCategory = data[0].bookCategory;
          //this.dt.edition = data[0].edition;
          //this.dt.price = data[0].price;
          //console.log(this.dt);
          this.bookDet.setValue(this.dt);          
        },
        (error) => {
          console.log('error', error);
        }
      );
    }
  }

  public builForm(): void {
    this.bookDet = this.fb.group({
      id: [0],
      bookName: ['', [Validators.required]],
      authorName: ['', [Validators.required]],
      bookCategory: [''],
      edition: ['', [Validators.required]],
      price: ['', [Validators.required]],
    });
  }

  onSubmit(): any {
    this.dt = new BookData();
    if (this.bookDet.controls['id'].value == '0') {      
      Object.assign(this.dt, this.bookDet.value);      
      console.log(this.dt);
      this.ss.AddBook(this.dt).subscribe(
        (data) => {
          alert('Saved Successfully');
          this.router.navigate(['listbook'])
        },
        (error) => {
          console.log('error', error);
        }
      );
    } else {
      Object.assign(this.dt, this.bookDet.value);
      this.ss.EditBook(this.dt).subscribe(
        (data) => {
          alert('Edited Successfully');
          this.router.navigate(['listbook'])
        },
        (error) => {
          console.log('error', error);
        }
      );
    }
  } 

}


