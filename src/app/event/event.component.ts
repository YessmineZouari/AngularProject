import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Evt } from 'src/models/Evt';
import { EventService } from 'src/services/event.service';
import { EventCreateComponent } from '../event-create/event-create.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DialogConfig } from '@angular/cdk/dialog';


@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements AfterViewInit {
  displayedColumns: string[] = ['id', 'titre', 'date', 'lieu', "edit"];
  dataSource: MatTableDataSource<Evt>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private Es:EventService , private dialog:MatDialog) {
    
    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource();
  }
  open(){
    const dialogRef =this.dialog.open(EventCreateComponent);
    dialogRef.afterClosed().subscribe((data)=>{
      if(data){
      this.Es.addEvent(data).subscribe((data)=>{
        this.Es.getAllEvent().subscribe((x)=>{this.dataSource.data=x})
      })
    }
    })
  }
openEdit(id: string) {
  const dialogRef = this.dialog.open(EventCreateComponent, {
    data: id
  });

  dialogRef.afterClosed().subscribe(updatedData => {
    if (updatedData) {
      this.Es.updateEvent(id, updatedData).subscribe(() => {
        // 🔄 refresh table after update
        this.Es.getAllEvent().subscribe(res => {
          this.dataSource.data = res;
        });
      });
    }
  });
}



  ngAfterViewInit() {
    //remplir le tableau datasource 
    this.Es.getAllEvent().subscribe((res)=>{
      this.dataSource.data=res;})
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
} {

}
