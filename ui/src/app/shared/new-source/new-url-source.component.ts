import { Component, Inject } from '@angular/core';
import { AbstractNewSourceComponent } from './abstract-new-source.component';
import { FormBuilder, Validators, FormGroup, FormArray, AbstractControl } from '@angular/forms';

@Component({
  selector: 'rvn-new-url-source',
  templateUrl: './new-url-source.component.html',
  styleUrls: ['./new-url-source.component.scss'],
  outputs: ['created', 'done', 'cancelled']
})
export class NewUrlSourceComponent extends AbstractNewSourceComponent {

  form: FormGroup;

  constructor(@Inject(FormBuilder) private fb:FormBuilder) {
    super();

    this.form = fb.group({
      urls: fb.array([
        fb.group({
          title: ['New URL Source', Validators.required],
          content: ['', Validators.required]
        })
      ])
    });
  }
 
  /**
   * Alias for url form value
   * @return {FormArray}
   */
  get urls(): FormArray { return this.form.get('urls') as FormArray; }

  addUrlSource() {
    this.urls.push(this.fb.group({
      title: 'New URL Source',
      content: '',
    }));
  }
  
  removeUrlSource($i: number) {
    this.urls.removeAt($i);
  }
  
  onSubmit() {

    // TODO: Send each source to a service, emit a new source for each 
    // success, and a done event when all URLs have been successfully
    // consumed.
    //
    this.urls.controls.forEach((control: AbstractControl) => {
      console.log(control.value);
    });
  }
}
