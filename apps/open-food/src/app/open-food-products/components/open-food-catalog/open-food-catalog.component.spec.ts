import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenFoodCatalogComponent } from './open-food-catalog.component';

describe('OpenFoodCatalogComponent', () => {
  let component: OpenFoodCatalogComponent;
  let fixture: ComponentFixture<OpenFoodCatalogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OpenFoodCatalogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(OpenFoodCatalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
