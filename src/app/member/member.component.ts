import { Component, OnInit } from '@angular/core';
import { Member } from 'src/models/Member';
import { MemberService } from 'src/services/member.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: '<app-member>',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.css']
})
export class MemberComponent implements OnInit {

  displayedColumns: string[] = [
    'id',
    'cin',
    'nom',
    'prenom',
    'email',
    'type',
    'diplome',
    'grade',
    'etablissement',
    'sujet',
    'dateInscription',
    'dateNaissance',
    'cv',
    'actions'
  ];
  
  dataSource: Member[] = [];

  constructor(private MS: MemberService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.MS.GetAllMembers().subscribe((data) => {
      this.dataSource = data;
    });
  }

  fetch(): void {
    this.MS.GetAllMembers().subscribe((data) => {
      this.dataSource = data;
    });
  }

  delete(id: String): void {
    let dialogRef = this.dialog.open(ConfirmDialogComponent, {
      height: '200px',
      width: '300px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.MS.deleteMemberById(id).subscribe(() => {
          this.fetch();
        });
      }
    });
  }
}