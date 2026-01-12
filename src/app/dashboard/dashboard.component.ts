import { Component, OnInit } from '@angular/core';
import { ChartDataset, ChartOptions } from 'chart.js';
import { MemberService } from 'src/services/member.service';
import { ArticleService } from 'src/services/article.service';
import { EventService } from 'src/services/event.service';
import { Member } from 'src/models/Member';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  
  // Statistics counters
  nb_Members: number = 0;
  nb_Articles: number = 0;
  nb_Events: number = 0;

  // Chart: Member Distribution (Pie Chart)
  chartData: ChartDataset[] = [
    {
      label: 'Member Type',
      data: []
    }
  ];
  chartLabels: string[] = ['Teachers', 'Students'];

  chartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom'
      }
    }
  };

  constructor(
    private memberService: MemberService,
    private articleService: ArticleService,
    private eventService: EventService
  ) {}

  ngOnInit(): void {
    this.loadStatistics();
    this.loadChart();
  }

  // Load statistics for cards
  loadStatistics() {
    // Count Members
    this.memberService.GetAllMembers().subscribe(members => {
      this.nb_Members = members.length;
    });

    // Count Articles
    this.articleService.getAllArticle().subscribe(articles => {
      this.nb_Articles = articles.length;
    });

    // Count Events
    this.eventService.getAllEvent().subscribe(events => {
      this.nb_Events = events.length;
    });
  }

  // Load chart data
  loadChart() {
    this.memberService.GetAllMembers().subscribe(members => {
      
      let nbTeacher = 0;
      let nbStudent = 0;

      members.forEach(member => {
        // If has grade or etablissement -> Teacher
        if (member.grade || member.etablissement) {
          nbTeacher++;
        } 
        // If has diplome or sujet or dateInscription -> Student
        else if (member.diplome || member.sujet || member.dateInscription) {
          nbStudent++;
        }
      });

      // Update pie chart data
      this.chartData = [
        {
          label: 'Members',
          data: [nbTeacher, nbStudent],
          backgroundColor: ['#ff6384', '#36a2eb'],
          hoverBackgroundColor: ['#ff6384', '#36a2eb']
        }
      ];
    });
  }
}