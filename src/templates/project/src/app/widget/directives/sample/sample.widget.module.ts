import { NgModule } from '@angular/core';

import { SampleDirective } from './sample.directive';

@NgModule({
  declarations: [SampleDirective],
  exports: [SampleDirective],
})
export class SampleDirectiveWidgetModule {}
