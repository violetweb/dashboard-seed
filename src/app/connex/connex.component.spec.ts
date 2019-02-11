import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnexComponent } from './connex.component';

describe('ConnexComponent', () => {
  let component: ConnexComponent;
  let fixture: ComponentFixture<ConnexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConnexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConnexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
