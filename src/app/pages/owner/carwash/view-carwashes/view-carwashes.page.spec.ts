import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ViewCarwashesPage } from './view-carwashes.page';

describe('ViewCarwashesPage', () => {
  let component: ViewCarwashesPage;
  let fixture: ComponentFixture<ViewCarwashesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewCarwashesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ViewCarwashesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
