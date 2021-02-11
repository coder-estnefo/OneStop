import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ViewPropertiesPage } from './view-properties.page';

describe('ViewPropertiesPage', () => {
  let component: ViewPropertiesPage;
  let fixture: ComponentFixture<ViewPropertiesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewPropertiesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ViewPropertiesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
