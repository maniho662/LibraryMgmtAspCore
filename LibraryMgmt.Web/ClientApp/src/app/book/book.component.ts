import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ServicesService } from '../services.service';
import { Router, ActivatedRoute } from '@angular/router';

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

    let id = this.route.snapshot.queryParams["id"];

    if (id != null) {
      this.isEdit = true;

      this.ss.GetBookById(id).subscribe(
        (data) => {
          console.log(data);          
         
          this.dt.id = data.id;
          this.dt.bookName = data.bookName;
          this.dt.authorName = data.authorName;
          this.dt.bookCategory = data.bookCategory;
          this.dt.edition = data.edition;
          this.dt.price = data.price;
         
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
      price: [0, [Validators.pattern('\\d+\.?\\d{0,2}?')]],
    });
  }

  onSubmit(): any {
    // console.log(this.studentDet.value);
    if (this.bookDet.controls['id'].value == '0') {
      console.log(this.bookDet.value);
      Object.assign(this.dt, this.bookDet.value);
      console.log('dt value'+this.dt);
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


