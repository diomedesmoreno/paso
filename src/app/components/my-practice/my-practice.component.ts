import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-practice',
  templateUrl: './my-practice.component.html',
  styleUrls: ['./my-practice.component.css']
})
export class MyPracticeComponent implements OnInit {

  public nameTeacher: string;
  public myName: string;
  // public teacher: string;

  constructor() { 
    this.myName = "Diomedes Moreno";
    this.nameTeacher = "Diory De La Cruz";
  }

  ngOnInit(): void {
  }

}
