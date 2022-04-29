import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor() { }

  sidebar:any = ['home.svg', 'job-seeker.svg', 'workflow.svg', 'inspection.svg', 'tear-off-calendar.svg', 'combo-chart.svg', 'privacy-policy.svg', 'communication.svg']
  ngOnInit(): void {
  }

}
