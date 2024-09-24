import { TestBed } from '@angular/core/testing';
import { SharedModule } from './shared.module';

describe('Testeo de Shared Module', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule],
    });
  });

  it('Deberia crear el Shared Module', () => {
    const module = TestBed.inject(SharedModule);
    expect(module).toBeTruthy();
  });
});