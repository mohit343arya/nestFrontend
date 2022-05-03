import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CountryISO } from 'ngx-intl-tel-input';
import { AddressService } from 'src/app/services/address.service';
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
  myControl = new FormControl();
  isLoading = true;
  constructor(
    private modalService: NgbModal,
    private _formBuilder: FormBuilder,
    private addressService: AddressService,
    private userService: UserService
  ) { }

  CountryISO = CountryISO;
  fakeArray: any = [];
  countries: any = []

  ngOnInit(): void {
    this.candidateForm = this._formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      countryCode: ['', [Validators.required]],
      identityNumber: ['', [Validators.required]],
      address: ['', [Validators.required]],
      line2: [''],
      country: [null, [Validators.required]],
      city: [null, [Validators.required]],
      province: [null, [Validators.required]],
      postalCode: ['', [Validators.required]],
      linkedin: ['', [Validators.required]],
      facebook: ['', [Validators.required]],
      twitter: ['', [Validators.required]],

    })
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

  open(content: any) {
    this.modalService.open(content, { size: 'lg' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.candidateForm.reset()
      //this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  loadData() {
    this.userService.getUsers().then((res: any) => {
      this.isLoading = false;
      this.candidates = this.candidateMapping(res?.data?.users || []);
    }, err => {
      this.isLoading = false;
    })
    this.addressService.getAllCountries().subscribe(res => {
      this.countries = res;
    });
  }

  submitData() {
    this.candidateForm.markAllAsTouched();
    if (this.candidateForm.invalid) {
      return
    }
    this.userService.createUser(this.candidateForm.value).subscribe(res => {
      this.modalService.dismissAll();
      this.candidateForm.reset();
      this.contact = undefined;
      this.loadData();
    })
  }

  provinces: any = [];
  countryCode = '';
  stateCode = '';
  selectCountry(event: any) {
    let data = '';
    this.countries.forEach((element: any) => {
      if (element.name == event) {
        this.countryCode = element.iso2
      }
    });
    this.addressService.getStatesOfCountry(this.countryCode).subscribe(res => {
      this.provinces = res;
    });
  }

  cities: any = [];
  selectProvince(event: any) {
    let data = '';
    this.provinces.forEach((element: any) => {
      if (element.name == event) {
        this.stateCode = element.iso2
      }
    });
    this.addressService.getCitiesOfState(this.countryCode, this.stateCode).subscribe(res => {
      this.cities = res;
    });
  }

  getContactInfo() {
    console.log(this.contact);
    if (this.contact !== null) {
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
  removeCandidate(id = '') {
    const list = this.candidates.filter(el => (id ? el._id === id : el.checked === true));
    const promises: any[] = [];
    if (list.length === 0) {
      alert('Select a candidate');
      return
    } else if (confirm('Are you sure to delete selected candidates')) {
      list.forEach(el => {
        promises.push(new Promise((resolve, reject) => {
          this.userService.removeUser(el._id).subscribe(res => {
            resolve(res);
          }, err => {
            reject(err)
          })
        }))
      })
      Promise.all(promises).then(() => {
        this.loadData();
      })
    }
  }
  checkAll(e) {
    this.candidates.forEach(el => (el['checked'] = e.checked))
  }
  candidateMapping(list: any[]) {
    return list.map(item => ({
      ...item,
      flag: '', // findFlagUrlByCountryName(item.country),
      active: getHumanReadableTime(item?.createdAt)
    }))
  }
  async handleAddressChange(e: any) {
    const address = e.address_components.reverse();
    this.candidateForm.patchValue({
      country: address[0].long_name,
      province: address[1].long_name,
      city: address[2].long_name,
    })

    this.countries.forEach((element: any) => {
      if (element.name == this.candidateForm.value.country) {
        this.countryCode = element.iso2
      }
    });
    this.provinces = await this.addressService.getStatesOfCountry(this.countryCode).toPromise();
    this.provinces.forEach((element: any) => {
      if (element.name == this.candidateForm.value.province) {
        this.stateCode = element.iso2
      }
    });
    this.cities = await this.addressService.getCitiesOfState(this.countryCode, this.stateCode).toPromise();;
  }
}
function getHumanReadableTime(date: any) {
  let timeScalarIndex = 0, scaledTime = new Date().valueOf() - new Date(date).valueOf();
  const timeScalars = [1000, 60, 60, 24, 7, 52];
  const timeUnits = ['ms', 'secs', 'mins', 'hrs', 'days', 'weeks', 'years'];

  while (scaledTime > timeScalars[timeScalarIndex]) {
    scaledTime /= timeScalars[timeScalarIndex++];
  }

  return `${scaledTime.toFixed(0)} ${timeUnits[timeScalarIndex]}`;
};
