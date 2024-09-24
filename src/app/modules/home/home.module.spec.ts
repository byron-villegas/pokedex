import { TestBed } from '@angular/core/testing';
import { HomeModule } from './home.module';

describe('Testeo de Home Module', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HomeModule],
    });
  });

  it('Deberia crear el Home Module', () => {
    const module = TestBed.inject(HomeModule);
    expect(module).toBeTruthy();
  });
});