import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddCarwashPage } from './add-carwash.page';

describe('AddCarwashPage', () => {
  let component: AddCarwashPage;
  let fixture: ComponentFixture<AddCarwashPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCarwashPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddCarwashPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
