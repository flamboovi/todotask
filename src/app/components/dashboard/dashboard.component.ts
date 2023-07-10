import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';
import { Todo } from '../../model/todo';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  taskObj:Todo= new Todo();
  taskArr:Todo[]=[];
  addTaskData:string='';
  editTaskData:string='';
  constructor(private api:TaskService) { }

  ngOnInit(): void {
    this.editTaskData='';
    this.addTaskData='';
    this.taskObj=new Todo();
    this.taskArr=[];
    this.getAllTask();
  }

  //Create Task data
  addTask(){
    this.taskObj.task=this.addTaskData;
    this.api.addTask(this.taskObj).subscribe(res=>{
      this.ngOnInit();
      this.addTaskData='';
    },err=>{
      alert(err);
    })
  }

  //get all task Data

  getAllTask(){
    this.api.getAllTask().subscribe(res=>{
      this.taskArr=res;
    },err=>{
      alert('unable to find any task');
    })
  }

  //edit todo task

  editTask(){
    this.taskObj.task=this.editTaskData;
    this.api.editTask(this.taskObj).subscribe(res=>{
      this.ngOnInit();
    },err=>{
      alert('Unable to edit task');
    })
  }

  // Delete task after complete
  deleteTask(todo:Todo){
    this.api.delete(todo).subscribe(res=>{
      this.ngOnInit();
    },err=>{
      alert('Unable to delete task');
    })
  }

  //edit property
  callEdit(todo:Todo){
    this.taskObj=todo;
    this.editTaskData=todo.task;
  }

}
