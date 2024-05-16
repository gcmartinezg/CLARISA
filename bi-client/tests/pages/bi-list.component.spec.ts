import { TestBed } from '@angular/core/testing';
import BiListComponent from '../../src/app/pages/bi-list/bi-list.component';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { of } from 'rxjs';

describe('BiListComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BiListComponent, HttpClientModule, RouterModule],
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
    const fixture = TestBed.createComponent(BiListComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
