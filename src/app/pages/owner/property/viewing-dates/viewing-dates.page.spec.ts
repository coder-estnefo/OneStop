import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ViewingDatesPage } from './viewing-dates.page';

describe('ViewingDatesPage', () => {
  let component: ViewingDatesPage;
  let fixture: ComponentFixture<ViewingDatesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewingDatesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ViewingDatesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
