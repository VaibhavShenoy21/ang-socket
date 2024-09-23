import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io,Socket  } from 'socket.io-client';
const backendurl = 'https://sockettest-rw54.onrender.com/';

@Injectable({
  providedIn: 'root'
})
export class SocketIoService {

  private clientSocket: Socket;
  constructor() {
    this.clientSocket = io(backendurl);
   }

   listenToServer(connection:any): Observable<any>{
    return new Observable((subscribe:any) => {
      this.clientSocket.on(connection , (data:any) => {
        subscribe.next(data);
      })
    });
   }
   emitToServer(connection:any,data:any):void{
    this.clientSocket.emit(connection,data);
   }
}
