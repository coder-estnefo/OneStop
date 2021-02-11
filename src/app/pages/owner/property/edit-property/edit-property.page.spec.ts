import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditPropertyPage } from './edit-property.page';

describe('EditPropertyPage', () => {
  let component: EditPropertyPage;
  let fixture: ComponentFixture<EditPropertyPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditPropertyPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditPropertyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
