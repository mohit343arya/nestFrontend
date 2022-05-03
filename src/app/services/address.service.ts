import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AddressService {
  headers: HttpHeaders;

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders().append("X-CSCAPI-KEY", "QVRtalRrZzN5QU9wdnNNQVU0ZHE4SUhVMVdQdVF2a0NyYVBJWjNsdw==");
  }

  getAllCountries() {
    return this.http.get('https://api.countrystatecity.in/v1/countries', { headers: this.headers })
  }

  getStatesOfCountry(country) {
    return this.http.get(`https://api.countrystatecity.in/v1/countries/${country}/states`, { headers: this.headers })
  }

  getCitiesOfState(country, state) {
    return this.http.get(`https://api.countrystatecity.in/v1/countries/${country}/states/${state}/cities`, { headers: this.headers })
  }
}
