import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data/data.service';
import { ConfirmComponent } from '../confirm/confirm.component';
import { DialogService } from "ng2-bootstrap-modal";

@Component({
  selector: 'tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  tasks: Array<any>;
  searchPriority = "A/B";
  status: number;

  constructor(private _dataService: DataService, private dialogService:DialogService) {
    this._dataService.getTasks()
      .subscribe(res => this.tasks = res);
  }

  showDialog() {
      let disposable = this.dialogService.addDialog(ConfirmComponent, {
          message:'Confirm message'})
          .subscribe((isConfirmed)=>{
              if(isConfirmed) {
                this._dataService.getTasks()
                  .subscribe(res => this.tasks = res);
              }
          });
  }

  deleteTask(event: any)
  {
    this._dataService.deleteTask(event.target.id);
    this._dataService.getTasks()
      .subscribe(res => this.tasks = res);
  }

  toggleStatus(event: any)
  {
    if (event.target.checked)
      this.status = 1;
    else
      this.status = 0;
    this._dataService.updateTask(event.target.id, this.status);
    /*this._dataService.getTasks()
      .subscribe(res => this.tasks = res);*/
  }

  ngOnInit() {
  }

}
