import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnvelopComponent } from './envelop.component';

describe('EnvelopComponent', () => {
  let component: EnvelopComponent;
  let fixture: ComponentFixture<EnvelopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnvelopComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnvelopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
