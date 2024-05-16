import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import BiComponent from '../../src/app/pages/bi/bi.component';

describe('BiListComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BiComponent, HttpClientModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ id: 'testId' })
          }
        }
      ]
    }).compileComponents();
  });

  test('should create the app', () => {
    const fixture = TestBed.createComponent(BiComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
