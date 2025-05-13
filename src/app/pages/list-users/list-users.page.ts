import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from 'src/app/interfaces/user.interface';
import { WebSocketService } from 'src/app/services/web-socket.service';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.page.html',
  styleUrls: ['./list-users.page.css'],
  standalone: false,
})
export class ListUsersPage implements OnInit {
  constructor(
    private activateRouter: ActivatedRoute,
    private fb: FormBuilder,
    private webSocket: WebSocketService,
    private router: Router,
  ) {}
  private jwtHelper = new JwtHelperService();
  public users: User[] = [];
  public visible: boolean = false;
  public sendMessageForm = this.fb.group({
    message: ['', [Validators.required]],
    to: ['', [Validators.required]],
  });
  ngOnInit() {
    this.activateRouter.data.subscribe(({ users }) => {
      this.users = users;
      const user = this.decodeToken();
      this.users = this.users.filter((u) => u.id !== user.id);
    });
  }
  private decodeToken(): User {
    const token = localStorage.getItem('token');
    const decodedToken: User = this.jwtHelper.decodeToken(token!)!;
    return decodedToken;
  }
  public openDialog(userId: string): void {
    this.visible = true;
    this.sendMessageForm.patchValue({ to: userId });
  }
  public closeDialog():void{
    this.visible = false;
    this.sendMessageForm.reset();
  }
  public sendMessage(): void {
    if(this.sendMessageForm.invalid) return;
    const data = {
      from: this.decodeToken().id,
      to: this.sendMessageForm.controls['to'].value!,
      message: this.sendMessageForm.controls['message'].value!,
    };
    this.webSocket.sendMessage(data);
    this.closeDialog();
    this.router.navigate(['/home']);
  }
}
