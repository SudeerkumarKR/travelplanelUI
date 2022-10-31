import { Component, OnInit } from '@angular/core';
import { TravelSearchAPIService } from 'src/app/services/traversearchapi.service';

@Component({
  selector: 'app-travel-search',
  templateUrl: './travel-search.component.html',
  styleUrls: ['./travel-search.component.css']
})
export class TravelSearchComponent implements OnInit {
  check : string = '';
  diseasesList = [];
	citylist :any;

  constructor(private service:TravelSearchAPIService) { }

  ngOnInit(): void {
  }

  filterCityName(event){
    this.service.getCity(event.target.value).subscribe({
			next:  result => {
				console.warn('Result => ', result);
				this.citylist=result
			},

			error: _error => { },
			complete: () => { }
		});


  }

}
