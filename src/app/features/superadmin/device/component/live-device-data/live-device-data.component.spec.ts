import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveDeviceDataComponent } from './live-device-data.component';

describe('LiveDeviceDataComponent', () => {
  let component: LiveDeviceDataComponent;
  let fixture: ComponentFixture<LiveDeviceDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LiveDeviceDataComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LiveDeviceDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
