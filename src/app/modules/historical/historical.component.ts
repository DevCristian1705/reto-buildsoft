import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-historical',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './historical.component.html',
  styleUrl: './historical.component.scss'
})
export class HistoricalComponent {

  arrayHistory : any[] = [];

  constructor(
    private router : Router
  ){

  }
  ngOnInit(){
    this.onGetHistorical();
  }

  onGetHistorical(){
    const DATA = JSON.parse(localStorage.getItem('DATA') || '[]');
    this.arrayHistory = DATA; 
  }

  
 onBack(){
  this.router.navigateByUrl('/currency-exchange')
 }
}
