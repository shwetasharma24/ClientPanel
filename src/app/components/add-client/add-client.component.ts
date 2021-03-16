import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Client } from '../../models/Clients';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ClientService } from '../../services/client.service';
import { Router } from '@angular/router';
import { Route } from '@angular/compiler/src/core';
import { SettingsService } from '../../services/settings.service'

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent implements OnInit {


  client: Client = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    balance : 0,
    createdBy: ''
  }

  disableBalanceOnAdd: boolean = this.settingsService.getSettings().disableBalanceOnAdd;

  @ViewChild('clientForm') form: any;

  constructor( private flasMessage: FlashMessagesService ,
    private clientService: ClientService,
    private router:Router,
    private settingsService: SettingsService
    ) { }

  ngOnInit(): void {
  }

  onSubmit({value,valid}: {value: Client, valid: boolean}){
    if(this.disableBalanceOnAdd){
      value.balance = 0;
    }

    if(!valid){
      //show error

      this.flasMessage.show('Please fill out the form correctly', {
        cssClass: 'alert-danger', timeout:4000
      });

    } else{
      //add new client

      //fetch createdBy from local storage and save with client details
      var loggedInUser = localStorage.getItem("loggedInUser");


      value.createdBy = loggedInUser;

      //console.log(value);

      this.clientService.newClient(value);

      //show message

      this.flasMessage.show('New client added', {
        cssClass: 'alert-success', timeout:4000
      });

      //redirect to dashboard

        this.router.navigate(['/']);
    }
  }

  

}
