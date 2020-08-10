import { Component, OnInit,TemplateRef } from '@angular/core';
import { noteServices } from '../../services/notes.service'
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  // selector: 'app-order-details',
  templateUrl: './notes-details.component.html'
  // styleUrls: ['./order-details.component.css']
})
export class NotesDetailsComponent implements OnInit {
  modalRef: BsModalRef;
  modalRef1:BsModalRef;
  modalRef2:BsModalRef;
orderList:[];
pageSize=10;
pageNumber=1
totalcount;
total=0;
deleteNotesId;
editNoteId
noteForm: FormGroup;
loading = false;
submitted = false;
  constructor( private router: Router,private formBuilder: FormBuilder,private noteservices: noteServices,private modalService: BsModalService,private toastr: ToastrService) { }
 
  ngOnInit(): void {
    if(!localStorage.getItem('token')){
      this.router.navigate(['/login']);
    }
    this.noteList();
  }
  pageChange(newPage: number) {
    this.pageNumber = newPage;
    this.noteList();
  }
  OpenViewModel(template: TemplateRef<any>,notesId) {
      this.modalRef = this.modalService.show(template, {
        backdrop: 'static',
        keyboard: false,
        class: 'modal-lg modal-dialog-centered roaster-modal',
      });
      this.viewNotes(notesId)
    
  
  }
  viewNotes(notesId){
    this.noteservices.getNoteListById(notesId).subscribe((getNotesData)=>{
      if(getNotesData['status']===200){
        this.orderList=getNotesData && getNotesData['orderList']
        this.totalcount=getNotesData['pageDetails']['total']
      }else{
        this.orderList=[]
        this.totalcount=0
      }
     })
  }
  OpenDeleteModel(template: TemplateRef<any>,noteId) {
    this.modalRef1 = this.modalService.show(template, {
      backdrop: 'static',
      keyboard: false,
      class: 'modal-lg modal-dialog-centered roaster-modal',
    });
this.deleteNotesId=noteId
  

}
OpenEditModel(template: TemplateRef<any>,noteId) {
  this.modalRef2 = this.modalService.show(template, {
    backdrop: 'static',
    keyboard: false,
    class: 'modal-lg modal-dialog-centered roaster-modal',
  });
  this.viewNotes(noteId)
  this.editNoteId=noteId
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
  this.noteservices.updateNotes(this.editNoteId,noteDetails).subscribe((notes)=>{
   if(notes['status']===200){
    this.toastr.success(notes['message'])
      this.submitted = false
      this.noteForm.reset();
   }else{
    this.toastr.error(notes['message'])
   }
  })
}
DeleteNotes(){
  this.noteservices.deleteNotes(this.deleteNotesId).subscribe((deleteNotes)=>{
    if(deleteNotes['status']===200){
      this.toastr.success(deleteNotes['message'])
    }else{
      this.toastr.error(deleteNotes['message'])
    }
   })
}
  closePopup(){
    this.modalRef.hide()
  }
noteList(){
  this.noteservices.getNoteList(this.pageSize,this.pageNumber).subscribe((getNoteList)=>{
    if(getNoteList['status']===200){
      console.log('getNoteList',getNoteList)
      this.orderList=getNoteList && getNoteList['orderList']
      this.totalcount=getNoteList['pageDetails']['total']
    }else{
      this.orderList=[]
      this.totalcount=0
    }
   })
}
}
