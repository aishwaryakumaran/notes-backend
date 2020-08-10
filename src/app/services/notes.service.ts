import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders, } from '@angular/common/http';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class noteServices {

  url = environment.url;
  constructor(public http: HttpClient) { }

  isAuthenticated(): boolean {


    if (localStorage.getItem('token')) {
      return true;
    } else {
      return false;
    }

  }
  post(endpoint: string, body: any, reqOpts?: any) {
    return this.http.post(this.url + '/' + endpoint, body, reqOpts);
  }
  getNoteList(pageSize, page) {
    return this.http.get(this.url + '/api/note/get-notes?pagesize=' + pageSize + '&page=' + page)
  };
  getNoteListById(id){
    return this.http.get(this.url + `/api/note/notes-detail/${id}`)
  }
  updateNotes(id,updateData){
    return this.http.put(this.url + `/api/note/update-notes/${id}`,updateData)
  }
  deleteNotes(id){
    return this.http.delete(this.url + `/api/note/delete-notes/${id}`)
  }
}
