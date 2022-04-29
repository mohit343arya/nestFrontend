import { UserService } from './../../services/user.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CountryISO, SearchCountryField } from 'ngx-intl-tel-input';
import { Country, State, City, } from 'country-state-city';
import { getStatesOfCountry, } from 'country-state-city/dist/lib/state';
import { findFlagUrlByCountryName } from "country-flags-svg";
@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
  dataTable: any = [];
  closeResult = '';
  contact: any = '';
  candidateForm: any = FormGroup;
  candidates: any[] = [];
  isLoading = true;
  constructor(
    private modalService: NgbModal,
    private _formBuilder: FormBuilder,
    private userService: UserService
  ) { }

  CountryISO = CountryISO;
  fakeArray: any = [];
  countries: any = []
  ngOnInit(): void {
    this.fakeArray = new Array(15)
    setTimeout(() => {
      this.dataTable = this.data;
    }, 2000);
    this.candidateForm = this._formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      countryCode: ['', [Validators.required]],
      identityNumber: ['', [Validators.required]],
      address: ['', [Validators.required]],
      line2: [''],
      country: ['', [Validators.required]],
      city: ['', [Validators.required]],
      province: ['', [Validators.required]],
      postalCode: ['', [Validators.required]],
      linkedin:['', [Validators.required]],
      facebook:['', [Validators.required]],
      twitter:['', [Validators.required]],

    })
    this.countries = Country.getAllCountries();
    console.log('contact', this.contact)
    //console.log(this.countries)
    //console.log(State.getAllStates())
    this.loadData();
  }

  get firstName() { return this.candidateForm.get('firstName'); }
  get lastName() { return this.candidateForm.get('lastName'); }
  get email() { return this.candidateForm.get('email'); }
  get phone() { return this.candidateForm.get('phone'); }
  get identityNumber() { return this.candidateForm.get('identityNumber'); }
  get address() { return this.candidateForm.get('address'); }
  get line2() { return this.candidateForm.get('address'); }
  get country() { return this.candidateForm.get('country'); }
  get city() { return this.candidateForm.get('city'); }
  get province() { return this.candidateForm.get('province'); }
  get postalCode() { return this.candidateForm.get('postalCode'); }
  get linkedin() { return this.candidateForm.get('linkedin'); }
  get facebook() { return this.candidateForm.get('facebook'); }
  get twitter() { return this.candidateForm.get('twitter'); }

  data:any = [
    {id:1, name:'john', idNumber:'5123212XXXXXXjkjh', location: 'Centurion, South Africa', email: 'greg@hellocrowd.net', mobile:'+27 82 801 4085', active:'30 days'},
    {id:2, name:'john', idNumber:'5123212XXXXXXjkjh', location: 'Centurion, South Africa', email: 'greg@hellocrowd.net', mobile:'+27 82 801 4085', active:'30 days'},
    {id:3, name:'john', idNumber:'5123212XXXXXXjkjh', location: 'Centurion, South Africa', email: 'greg@hellocrowd.net', mobile:'+27 82 801 4085', active:'30 days'},
    {id:4, name:'john', idNumber:'5123212XXXXXXjkjh', location: 'Centurion, South Africa', email: 'greg@hellocrowd.net', mobile:'+27 82 801 4085', active:'30 days'},
    {id:5, name:'john', idNumber:'5123212XXXXXXjkjh', location: 'Centurion, South Africa', email: 'greg@hellocrowd.net', mobile:'+27 82 801 4085', active:'30 days'},
    {id:6, name:'john', idNumber:'5123212XXXXXXjkjh', location: 'Centurion, South Africa', email: 'greg@hellocrowd.net', mobile:'+27 82 801 4085', active:'30 days'},
    {id:7, name:'john', idNumber:'5123212XXXXXXjkjh', location: 'Centurion, South Africa', email: 'greg@hellocrowd.net', mobile:'+27 82 801 4085', active:'30 days'},
    {id:8, name:'john', idNumber:'5123212XXXXXXjkjh', location: 'Centurion, South Africa', email: 'greg@hellocrowd.net', mobile:'+27 82 801 4085', active:'30 days'},
    {id:9, name:'john', idNumber:'5123212XXXXXXjkjh', location: 'Centurion, South Africa', email: 'greg@hellocrowd.net', mobile:'+27 82 801 4085', active:'30 days'},
    {id:10, name:'john', idNumber:'5123212XXXXXXjkjh', location: 'Centurion, South Africa', email: 'greg@hellocrowd.net', mobile:'+27 82 801 4085', active:'30 days'},
    {id:11, name:'john', idNumber:'5123212XXXXXXjkjh', location: 'Centurion, South Africa', email: 'greg@hellocrowd.net', mobile:'+27 82 801 4085', active:'30 days'},
    {id:12, name:'john', idNumber:'5123212XXXXXXjkjh', location: 'Centurion, South Africa', email: 'greg@hellocrowd.net', mobile:'+27 82 801 4085', active:'30 days'},
    {id:13, name:'john', idNumber:'5123212XXXXXXjkjh', location: 'Centurion, South Africa', email: 'greg@hellocrowd.net', mobile:'+27 82 801 4085', active:'30 days'},
    {id:14, name:'john', idNumber:'5123212XXXXXXjkjh', location: 'Centurion, South Africa', email: 'greg@hellocrowd.net', mobile:'+27 82 801 4085', active:'30 days'},
    {id:15, name:'john', idNumber:'5123212XXXXXXjkjh', location: 'Centurion, South Africa', email: 'greg@hellocrowd.net', mobile:'+27 82 801 4085', active:'30 days'}

  ]

  open(content:any) {
    this.modalService.open(content, { size: 'lg' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.candidateForm.reset()
      //this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  loadData() {
    this.userService.getUsers().subscribe((res: any) => {
      this.isLoading = false;
      this.candidates = this.candidateMapping(res?.data?.users || []);
      console.log('this.candidates', this.candidates)
    }, err => {
      this.isLoading = false;
    })
  }

  submitData() {
    this.candidateForm.markAllAsTouched();
    if(this.candidateForm.invalid) {
      return
    }
    this.userService.createUser(this.candidateForm.value).subscribe(res => {
      console.log('res2', res);
    })
  }

  provinces:any = [];
  countryCode= '';
  stateCode = '';
  selectCountry(event:any) {
    let data = '';
    this.countries.forEach((element:any) => {
      if(element.name == event.target.value ) {
        this.countryCode = element.isoCode
      }
    });
    this.provinces =  getStatesOfCountry(this.countryCode);
  }

  cities:any = [];
  selectProvince(event:any) {
    let data = '';
    this.provinces.forEach((element: any) => {
      if (element.name == event.target.value) {
        this.stateCode = element.isoCode
      }
    });
    this.cities = City.getCitiesOfState(this.countryCode, this.stateCode);
  }

  getContactInfo() {
    console.log(this.contact);
    if(this.contact !== null ) {
      this.candidateForm.patchValue({
        countryCode: this.contact.dialCode,
        phone: this.contact.number
      })
    } else {
      this.candidateForm.patchValue({
        phone: null
      })
    }
  }
  removeCandidate() {
    const list = this.candidates.filter(el => el.checked === true);
    if(list.length === 0) {
      alert('Select a candidate');
    } else if(confirm('Are you sure to delete selected candidates')) {
      list.forEach(el=> {

      })
    }
  }
  checkAll(e) {
    this.candidates.forEach(el => (el['checked'] = e.checked))
    console.log('this.candidates', this.candidates)
  }
  candidateMapping(list: any[]) {
    return list.map(item => ({
      ...item,
      flag: findFlagUrlByCountryName(item.country),
      active: getHumanReadableTime(item?.createdAt)
    }))
  }
}
function getHumanReadableTime(date: any) {
  let timeScalarIndex = 0, scaledTime = new Date().valueOf() - new Date(date).valueOf() ;
  const timeScalars = [1000, 60, 60, 24, 7, 52];
  const timeUnits = ['ms', 'secs', 'mins', 'hrs', 'days', 'weeks', 'years'];

  while (scaledTime > timeScalars[timeScalarIndex]) {
    scaledTime /= timeScalars[timeScalarIndex++];
  }

  return `${scaledTime.toFixed(0)} ${timeUnits[timeScalarIndex]}`;
};
