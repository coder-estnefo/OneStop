import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditCarwashPage } from './edit-carwash.page';

describe('EditCarwashPage', () => {
  let component: EditCarwashPage;
  let fixture: ComponentFixture<EditCarwashPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditCarwashPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditCarwashPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
