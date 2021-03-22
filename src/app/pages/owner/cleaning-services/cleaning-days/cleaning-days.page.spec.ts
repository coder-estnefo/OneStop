import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CleaningDaysPage } from './cleaning-days.page';

describe('CleaningDaysPage', () => {
  let component: CleaningDaysPage;
  let fixture: ComponentFixture<CleaningDaysPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CleaningDaysPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CleaningDaysPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
