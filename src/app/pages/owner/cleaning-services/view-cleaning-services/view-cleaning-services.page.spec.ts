import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ViewCleaningServicesPage } from './view-cleaning-services.page';

describe('ViewCleaningServicesPage', () => {
  let component: ViewCleaningServicesPage;
  let fixture: ComponentFixture<ViewCleaningServicesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewCleaningServicesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ViewCleaningServicesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
