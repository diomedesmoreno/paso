import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-assessment-exam',
  templateUrl: './assessment-exam.component.html',
  styleUrls: ['./assessment-exam.component.css']
})
export class AssessmentExamComponent implements OnInit {

  public urlIframe:string;// = "https://examen.intrant.gob.do/Home/registro";
  constructor() { 
    this.urlIframe = "https://examen.intrant.gob.do/Home/registro";
  }

  ngOnInit(): void {
  }

}
