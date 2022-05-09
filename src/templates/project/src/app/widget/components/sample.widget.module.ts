import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SampleComponent } from './sample.component';

@NgModule({
  declarations: [SampleComponent],
  imports: [CommonModule],
  exports: [SampleComponent],
})
export class SampleComponentWidgetModule {}
