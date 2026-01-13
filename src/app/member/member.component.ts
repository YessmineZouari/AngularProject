import { Component, OnInit } from '@angular/core';
import { Member } from 'src/models/Member';
import { MemberService } from 'src/services/member.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ArticleMembersComponent } from '../article-members/article-members.component';
import { MemberEventsComponent } from '../member-events/member-events.component';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-member',
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
    'publications',
    'events',
    'cv',

    'actions'
  ];

  dataSource: Member[] = [];

  constructor(
    private memberService: MemberService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.fetch();
  }

  fetch(): void {
    this.memberService.GetAllMembers().subscribe({
      next: (members: Member[]) => {
        const requests = members.map(member =>
          this.memberService.getFullMember(member.id.toString())
        );

        forkJoin(requests).subscribe({
          next: (fullMembers: Member[]) => {
            this.dataSource = fullMembers;
          },
          error: (error) => {
            console.error('Error loading full members:', error);
          }
        });
      },
      error: (error) => {
        console.error('Error loading members:', error);
      }
    });
  }

  delete(id: string): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      height: '200px',
      width: '300px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.memberService.deleteMemberById(id).subscribe({
          next: () => this.fetch(),
          error: (error) => console.error('Delete error:', error)
        });
      }
    });
  }

  openPublications(member: Member): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '800px';
    dialogConfig.maxHeight = '80vh';
    dialogConfig.data = {
      publications: member.pubs,
      memberName: `${member.nom} ${member.prenom}`
    };

    this.dialog.open(ArticleMembersComponent, dialogConfig);
  }

  openEvents(member: Member): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '800px';
    dialogConfig.maxHeight = '80vh';
    dialogConfig.data = {
      events: member.events,
      memberName: `${member.nom} ${member.prenom}`
    };

    this.dialog.open(MemberEventsComponent, dialogConfig);
  }

  // Download CV
  downloadCV(member: Member): void {
    const fileName = `${member.nom}_${member.prenom}_CV.pdf`;
    this.memberService.triggerCVDownload(member.id, fileName);
  }
}
