import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageCommandComponent } from './manage-command.component';

describe('ManageCommandComponent', () => {
  let component: ManageCommandComponent;
  let fixture: ComponentFixture<ManageCommandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageCommandComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageCommandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
