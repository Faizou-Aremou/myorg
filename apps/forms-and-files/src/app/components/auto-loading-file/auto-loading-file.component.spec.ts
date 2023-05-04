import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AutoLoadingFileComponent } from './auto-loading-file.component';

describe('AutoLoadingFileComponent', () => {
  let component: AutoLoadingFileComponent;
  let fixture: ComponentFixture<AutoLoadingFileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AutoLoadingFileComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AutoLoadingFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
