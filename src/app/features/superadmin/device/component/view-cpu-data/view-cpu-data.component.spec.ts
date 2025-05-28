import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCpuDataComponent } from './view-cpu-data.component';

describe('ViewCpuDataComponent', () => {
  let component: ViewCpuDataComponent;
  let fixture: ComponentFixture<ViewCpuDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewCpuDataComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewCpuDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
