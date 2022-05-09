import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SampleComponent } from './sample.component';

describe("AlertComponent", () => {
  let component: SampleComponent;
  let fixture: ComponentFixture<SampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SampleComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
