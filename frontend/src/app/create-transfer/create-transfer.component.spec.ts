import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTransferComponent } from './create-transfer.component';

describe('CreateTransferComponent', () => {
  let component: CreateTransferComponent;
  let fixture: ComponentFixture<CreateTransferComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateTransferComponent]
    });
    fixture = TestBed.createComponent(CreateTransferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
