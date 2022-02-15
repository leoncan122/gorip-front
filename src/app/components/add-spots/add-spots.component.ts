import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { info } from 'src/app/store/localization/localization.action';
import { SpotsService } from '../../services/spots.service';
import { Observable, Subject } from 'rxjs';
import { RootState } from 'src/app/store/store';
import { addSpot } from 'src/app/store/spot/spot.action';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-add-spots',
  templateUrl: './add-spots.component.html',
  styleUrls: ['./add-spots.component.scss'],
})
export class AddSpotsComponent implements OnInit, OnDestroy {
  public lngLat$: number[];
  public addressInfo: info = {
    pc: '',
    address: '',
    city: '',
  };
  public errorAddSpot$: Observable<boolean>;
  public showForm = false;
  public onDestroy$ = new Subject();
  public filename = '';

  //form
  public form = new FormGroup({
    address: new FormControl('', [Validators.required]),
    type: new FormControl('', [Validators.required]),
    postal_code: new FormControl('', [Validators.required]),
    description: new FormControl('', [
      Validators.required,
      Validators.maxLength(50),
    ]),
    // photo: new FormControl(null),
  });
  constructor(
    private store: Store<RootState>,
    private spotService: SpotsService
  ) {
    this.store
      .select((state) => {
        return state.localization;
      })
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(
        (data) => {
          this.lngLat$ = data.localization;
          this.addressInfo.pc = data.whereami.pc;
          this.addressInfo.address = data.whereami.address;
          this.addressInfo.city = data.whereami.city;
        },
        (err) => console.log(err)
      );
    this.errorAddSpot$ = this.store.select((state) => state.spots.failure);
  }
  public onFileSelected(event: any) {
    const file = event.target.files[0];

    if (file) {
      this.filename = file.name;
      const formData = new FormData();
      formData.append('photo', file);
      this.form.addControl('photo', new FormControl(formData));

      // const submit$ = this.spotService.submitSpotImage(formData);
      // submit$.subscribe((data) => console.log(data));
    }
  }
  public getFormInfo = () => {
    this.showForm = true;
    // this function fill the addspot form
    try {
      this.form.addControl('city', new FormControl(this.addressInfo.city));
      this.form.addControl('lat', new FormControl(this.lngLat$[1]));
      this.form.addControl('long', new FormControl(this.lngLat$[0]));
    } catch (error) {
      console.log(error);
    }
  };
  public onSubmit(): void {
    const spot = this.form.value;
    this.spotService.addSpot(spot).subscribe((data) => console.log(data));
    //this.store.dispatch(addSpot({ spot }));
  }
  public resetForm() {
    this.showForm = false;
  }
  ngOnDestroy() {
    //this.onDestroy$.next();
  }
  ngOnInit(): void {
    this.getFormInfo();
  }
}
