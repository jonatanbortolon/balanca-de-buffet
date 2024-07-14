import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeightDialogComponent } from './weight-dialog.component';

describe('WightDialogComponent', () => {
  let component: WeightDialogComponent;
  let fixture: ComponentFixture<WeightDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WeightDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WeightDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
