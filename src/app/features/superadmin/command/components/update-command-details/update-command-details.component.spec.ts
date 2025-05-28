import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateCommandDetailsComponent } from './update-command-details.component';

describe('UpdateCommandDetailsComponent', () => {
  let component: UpdateCommandDetailsComponent;
  let fixture: ComponentFixture<UpdateCommandDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateCommandDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateCommandDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
