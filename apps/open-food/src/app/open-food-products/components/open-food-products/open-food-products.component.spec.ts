import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenFoodProductsComponent } from './open-food-products.component';

describe('OpenFoodProductsComponent', () => {
  let component: OpenFoodProductsComponent;
  let fixture: ComponentFixture<OpenFoodProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OpenFoodProductsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(OpenFoodProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
