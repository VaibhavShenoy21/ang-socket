import { Component } from '@angular/core';
import { SocketIoService } from './socket-io.service';
import { Connection } from './connection.enum';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'my-angular-app';
  users:any = [];
  label: any;
  constructor(private socketservice: SocketIoService){
    this.socketservice.listenToServer(Connection.change).subscribe((change)=>{
      this.onChange(change);
    });
    this.socketservice.listenToServer(Connection.create).subscribe((user)=>{
      debugger
      this.onCreate(user);
    });
  }
  onChange(change:any){
    const index = this.users.findIndex((user:any)=> user.id === change.id);
    this.users[index].label = change.label;
  }
  onCreate(user:any){
    this.users.push(user);
  }
  createUser(label:string):void {
    const user = {id: Date.now().toString(),label};
    this.socketservice.emitToServer(Connection.create,user);
    this.label = '';
  }
  updateUser(label:string,id:string):void{
    this.socketservice.emitToServer(Connection.change,{id,label});
  }
}
