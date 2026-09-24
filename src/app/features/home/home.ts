import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  imports: [CommonModule],
  selector: 'app-home',
  styleUrl: './home.css',
  templateUrl: './home.html',
})
export class Home implements OnInit {
  isScrolled = false;
  activeTabIndex = 0;

  departments = [
    { 
      name: 'Women & Child Development (WCD)', shortName: 'WCD', icon: 'pi-users', color: 'bg-blue-700', accentColor: '#1d4ed8',
      image: '/images/wcd.jpg',
      schemes: [
        { name: 'Old Age Pension', desc: 'Age: 60 years and above' },
        { name: 'Widow Pension', desc: 'Age: 18 years and above (only Widow Women)' },
        { name: 'Disability Pension', desc: 'Age: 18 years and above' }
      ], 
      desc: 'Empowering women and nurturing children for a better tomorrow.' 
    },
    { 
      name: 'Tribal Affairs', shortName: 'Tribal', icon: 'pi-compass', color: 'bg-pink-600', accentColor: '#db2777',
      image: '/images/tribal.jpg',
      schemes: [
        { name: 'Jai Johar', desc: 'Age: 60 years and above for ST' },
        { name: 'Old Age Pension for ST', desc: 'Age: 60 years and above' }
      ], 
      desc: 'Dedicated to the holistic development of tribal communities.' 
    },
    { 
      name: 'Backward Classes Welfare (BCW)', shortName: 'BCW', icon: 'pi-id-card', color: 'bg-green-600', accentColor: '#16a34a',
      image: '/images/bcw.jpg',
      schemes: [
        { name: 'Tapasili Bandhu', desc: 'Age: 60 years and above for SC' }
      ], 
      desc: 'Promoting educational and economic interests of backward classes.' 
    },
    { 
      name: 'MSME & Textile', shortName: 'MSME', icon: 'pi-briefcase', color: 'bg-orange-600', accentColor: '#ea580c',
      image: '/images/msme.jpg',
      schemes: [
        { name: 'MSME Support', desc: 'Micro, Small and Medium Enterprises support' },
        { name: 'Textile Development', desc: 'Support for textile weavers and businesses' }
      ], 
      desc: 'Fostering industrial growth and textile innovation.' 
    },
    { 
      name: 'Information & Cultural Affairs', shortName: 'Cultural', icon: 'pi-building', color: 'bg-purple-600', accentColor: '#9333ea',
      image: '/images/inc.jpg',
      schemes: [
        { name: 'LPP Retainer', desc: 'Age: Below 60 years' },
        { name: 'LPP Pensioner / Purohit', desc: 'Age: Above 60 years' }
      ], 
      desc: 'Preserving heritage and supporting cultural practitioners.' 
    },
    { 
      name: 'Agriculture', shortName: 'Agriculture', icon: 'pi-sun', color: 'bg-teal-600', accentColor: '#0d9488',
      image: '/images/agriculture.jpg',
      schemes: [
        { name: 'Farmer Pension', desc: 'Age: 60 years and above' }
      ], 
      desc: 'Ensuring prosperity and financial security for farmers.' 
    },
    { 
      name: 'Fishery', shortName: 'Fishery', icon: 'pi-box', color: 'bg-cyan-700', accentColor: '#0e7490',
      image: '/images/fishery.jpg',
      schemes: [
        { name: 'Fisherman OAP Scheme', desc: 'Age: 60 years and above' }
      ], 
      desc: 'Supporting the livelihood of fishermen communities.' 
    }
  ];

  selectedDept: any;

  // All scheme names for the marquee
  allSchemes: string[] = [];

  constructor(
    private router: Router, 
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit() {
    this.selectedDept = this.departments[0];
    this.allSchemes = this.departments.flatMap(d => d.schemes.map(s => s.name));
  }

  @HostListener('window:scroll')
  onScroll() {
    this.isScrolled = window.scrollY > 50;
  }

  selectDept(dept: any, index: number) {
    this.selectedDept = dept;
    this.activeTabIndex = index;
  }

  get totalSchemes(): number {
    return this.departments.reduce((sum, d) => sum + d.schemes.length, 0);
  }

  navigateToLogin() {
    this.spinner.show();
    setTimeout(() => {
      this.router.navigate(['/login']);
    }, 600);
  }
}
