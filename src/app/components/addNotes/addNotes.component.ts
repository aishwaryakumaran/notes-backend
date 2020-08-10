import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { noteServices} from '../../services/notes.service'
import { ToastrService } from 'ngx-toastr';
@Component({
  // selector: 'app-addproduct',
  templateUrl: './addNotes.component.html'
  // styleUrls: ['./addproduct.component.css']
})
export class AddNotesComponent implements OnInit {

  noteForm: FormGroup;
  loading = false;
  submitted = false;
  constructor(  private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,private noteservices: noteServices,private toastr: ToastrService) { }

  ngOnInit(): void {
    if(!localStorage.getItem('token')){
      this.router.navigate(['/login']);
    }
    this.addNoteForm()
  }
  addNoteForm(){
    this.noteForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required]
  });
  }
  get f() { return this.noteForm.controls; }
  onSubmit(){
    this.submitted = true;
    if (this.noteForm.invalid) {
        return;
    }
    let noteDetails=this.noteForm.value;
    this.noteservices.post('api/note/add-notes',noteDetails).subscribe((notes)=>{
     if(notes['status']===200){
      this.router.navigate(['/list-notes']);
      this.toastr.success(notes['message'])
      
        this.submitted = false
     }else{
      this.toastr.error(notes['message'])

     }
    })
  }

}

