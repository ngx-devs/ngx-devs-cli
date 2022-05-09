import {
    OptionValuePipe
} from 'app/widget/components/select-search/pipes/option-value/option-value.pipe';

import { NgModule } from '@angular/core';

import { SamplePipe } from './sample.pipe';

@NgModule({
  declarations: [SamplePipe],
  exports: [SamplePipe],
  providers: [OptionValuePipe],
})
export class IncludesPipeWidgetModule {}
