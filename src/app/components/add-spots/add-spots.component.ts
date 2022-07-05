import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import {
  info,
  updateCoordinates,
} from 'src/app/store/localization/localization.action';

import { SpotsService } from '../../services/spots.service';
import { Observable, Subject } from 'rxjs';
import { RootState } from 'src/app/store/store';
import { addSpotSuccess } from 'src/app/store/spot/spot.action';
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
  public showForm: Boolean;
  public onDestroy$ = new Subject<void>();
  public photoFile: File;
  public form: FormGroup;
  public uploadData = new FormData();

  constructor(
    private store: Store<RootState>,
    private spotService: SpotsService,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      _id: [''],
      address: ['', [Validators.required]],
      type: ['', [Validators.required]],
      postal_code: ['', [Validators.required]],
      description: ['', [Validators.required]],
      photo: [''],
      lat: [''],
      long: [''],
      city: ['', [Validators.required]],
      file: [null, [Validators.required]],
    });
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
    // this.errorAddSpot$ = this.store.select((state) => state.spots.failure);
  }

  public handleInputImage(event: any) {
    this.photoFile = <File>event.target.files[0];
    this.form.get('file')?.setValue(this.photoFile);
  }
  public getFormInfo = () => {
    this.showForm = true;
    // this function fill the addspot form
    try {
      this.form.get('postal_code')?.setValue(this.addressInfo.pc);
      this.form.get('address')?.setValue(this.addressInfo.address);
      this.form.get('city')?.setValue(this.addressInfo.city);
      this.form.get('lat')?.setValue(this.lngLat$[1]);
      this.form.get('long')?.setValue(this.lngLat$[0]);
    } catch (error) {
      console.log(error);
    }
  };
  public resetForm() {
    this.showForm = false;
  }
  public onSubmit(): void {
    this.uploadData.append('photo', this.form.get('photo')?.value);
    this.uploadData.append('address', this.form.get('address')?.value);
    this.uploadData.append('description', this.form.get('description')?.value);
    this.uploadData.append('type', this.form.get('type')?.value);
    this.uploadData.append('city', this.form.get('city')?.value);
    this.uploadData.append('lat', this.form.get('lat')?.value);
    this.uploadData.append('long', this.form.get('long')?.value);
    this.uploadData.append('file', this.photoFile);

    // this.uploadData = this.form.getRawValue();
    this.resetForm();
    this.spotService
      .addSpot(this.uploadData)
      .subscribe((data) => this.store.dispatch(addSpotSuccess({ spot: data })));
  }

  ngOnDestroy() {
    console.log('component destroyed');
    this.onDestroy$.next();
  }
  ngOnInit(): void {
    this.getFormInfo();
  }
}
