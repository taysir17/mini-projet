import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Message } from '../lesclasses/message';
import { Observable } from 'rxjs';
const URL="http://localhost:3000/messages"
@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private http:HttpClient){}
  addmessage(m:Message):Observable<Message>{
    return this.http.post<Message>(URL, m);
    }
  getmessages(info:string):Observable<Message[]>{
    return this.http.get<Message[]>(URL+info);
    }
  patchmessage(id:string, data:any):Observable<Message>{
    return this.http.patch<Message>(URL+"/"+ id, data);
    }
}
