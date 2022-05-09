import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: "appSample",
})
export class SamplePipe implements PipeTransform {
  transform(value: string): string {
    return value;
  }
}
