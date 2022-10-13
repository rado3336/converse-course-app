import {Component, OnInit} from '@angular/core';
import axios from "axios";

interface countryDataType {
  country: string,
  parking_rate: boolean
  reduced_rate: number
  reduced_rate_alt: boolean
  standard_rate: number
  super_reduced_rate: boolean
}

interface rates {
  rates: {
    [key:string]: countryDataType
  }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit{

  title = 'Exchange course';

  allCountryData: countryDataType[] = [];

  selectedValue: countryDataType | undefined;

  onChange = (value: string) => {
    this.selectedValue = this.allCountryData.find(countryData => countryData.country == value);
  }

  getDataFromApi = () => {
    axios.get<rates>("https://myjson.dit.upm.es/api/bins/e7wo").then(response => {

      for (let key in response.data.rates) {
        let value = response.data.rates[key];
        this.allCountryData.push(value);
      }

      this.allCountryData.sort((a,b) => {
        return a.country.localeCompare(b.country);
      })

    })
  }

  ngOnInit(): void {
    this.getDataFromApi();
  }
}
