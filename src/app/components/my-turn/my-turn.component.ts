import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import { TurnsService } from './../../services/turns/turns.service';
import { TokenService } from 'app/services/token.service';
import { MessengerNotification } from './../../messenger-notification';

interface FieldTable {
  id: number;
  noTurn: number;
  status: string;
  tteacher: string;
  dattime: string;
}

@Component({
  selector: 'app-my-turn',
  templateUrl: './my-turn.component.html',
  styleUrls: ['./my-turn.component.css']
})
export class MyTurnComponent implements OnInit {

  private errors: string[];
  public form: FormGroup;
  private notificacion = new MessengerNotification();
  public teachers = [
    {key: 1, name: 'Usuario 1'},
    {key: 2, name: 'Usuario 2'}
  ];
  public dataSource: any;
  public displayedColumns: string[];

  constructor(
    private formBuiler: FormBuilder,
    private turnService: TurnsService,
  ) { 
    this.form = formBuiler.group({
      id: [''],
      teacher: ['', Validators.required],
      hour: ['', Validators.required],
      datetime: ['',Validators.required]
    });
    this.displayedColumns = ['noTurn', 'datetime', 'status', 'tteacher','options'];

  }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngOnInit(): void {
    this.getDataTable();
  }

  getDataTable(): void {
    this.turnService.allDatas()
    .subscribe(
      data => {
        this.handleResponse(data['data']);
      },
      error => {
        this.handleError(error);
      }
    )
  }

  onSubmit(): void {
    if (!this.form.invalid){
      if (!this.form.get('id').value){
        this.turnService.insert(this.form.value)
        .subscribe(
          data => this.handleResponse(),
          error => this.handleError(error)
        );
      } else {
        this.turnService.update(this.form.value, this.form.get('id').value)
        .subscribe(
          data => this.handleResponse(),
          error => this.handleError(error)
        );
      }

    }

  }

  handleResponse(data?): void {
    if (data === null) {
      this.notificacion.getDisplayNotification('Turno creado con exitos!','success');
    } else {
      console.log("me actualices despues de todo",data);
      this.dataSource = new MatTableDataSource<FieldTable>(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

  handleError(error): void {
    this.errors = error.error.errors;
    console.log(this.errors);
    // this.notificacion.getDisplayErrors(this.errors);
  }

}
