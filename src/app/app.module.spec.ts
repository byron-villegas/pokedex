import { TestBed } from '@angular/core/testing';
import { AppModule } from './app.module';

describe('Testeo de App Module', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule],
    });
  });

  it('Deberia crear el App Module', () => {

    const module = TestBed.inject(AppModule);
    expect(module).toBeTruthy();
  });
});