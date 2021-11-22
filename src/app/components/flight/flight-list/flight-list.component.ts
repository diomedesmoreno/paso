import { Component, OnInit } from '@angular/core';
import { FlightComponent } from './../flight.component';
import { TokenService } from 'app/services/token.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MessengerNotification } from 'app/messenger-notification';
import { FlightService } from 'app/services/flight/flight.service';
import { CountryService } from 'app/services/country/country.service';
import { MatTableDataSource } from '@angular/material/table';

interface FieldTable {
  id: number;
  countryFrom: string;
  countryTo: string;
  timeDeparture: string;
  }

@Component({
  selector: 'app-flight-list',
  templateUrl: './flight-list.component.html',
  styleUrls: ['./flight-list.component.css']
})
export class FlightListComponent implements OnInit {
  private notification = new MessengerNotification();
  public errors: string[];
  private dataSource: any = [];
  // private dataSource: any = [
  //   {'id':1,countryFrom: 'Republica dominicana',countryTo: 'Chicago',timeDeparture: '01:00'},
  //   {'id':2,countryFrom: 'Republica dominicana',countryTo: 'Alaska',timeDeparture: '06:00'},
  //   {'id':3,countryFrom: 'Republica dominicana',countryTo: 'China',timeDeparture: '12:00'},
  //   {'id':4,countryFrom: 'Republica dominicana',countryTo: 'Brasil',timeDeparture: '04:00'},
  //   {'id':5,countryFrom: 'Republica dominicana',countryTo: 'Mexico',timeDeparture: '05:00'},
  // ];
  private displayColumns: string[]; 
  constructor(
    private modal: MatDialog,
    private token: TokenService,
    private flightService: FlightService,
    private countryServices: CountryService,
  ) { 
    this.displayColumns = ['id', 'countryFrom', 'countryTo', 'timeDeparture','options'];
  }
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngOnInit(): void {
    this.flightService.get()
    .subscribe(
      data  => { this.responde(data["data"]); },
      error => { this.errorResponde(error); }
    )
  }

  private responde(data): void {
    this.dataSource = new MatTableDataSource <FieldTable>(data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  private errorResponde(error): void {
    this.errors = error.error.error;
    if (this.errors.length)
      this.notification.getDisplayErrors(this.errors);
    else 
      this.notification.getDisplayNotification('Opss.. ocurrio un error con el servidor','danger');
      console.log(this.errors);
  }

  updateTable(): void {
    this.flightService.get()
    .subscribe(
      data => {
        this.responde(data['data']);
      },
      error => {
        this.errorResponde(error);
      }
      );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  editFlight(row) {
    this.flightService.setForm(row);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "80%";
    let afterCloseModal = this.modal.open(FlightComponent,dialogConfig);
    afterCloseModal.afterClosed().subscribe(() => { 
      this.updateTable();
     } );
  }

  onCreate() {
    this.flightService.initialForm();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "80%";
    let afterCloseModal = this.modal.open(FlightComponent,dialogConfig);
    afterCloseModal.afterClosed().subscribe(() => { 
      this.updateTable();
     } );
     this.countryServices.get()
    .subscribe(
      data => {
        // console.log("0",data['data']);
        // this.paisOrigen = data['data'];
        // this.handleResponse(data['data']);
      },
      error => {
        console.log("Error: ",error);
      }
      );
  }


}
