import { TestBed } from '@angular/core/testing';

import { AceconnexService } from './aceconnex.service';

describe('AceconnexService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AceconnexService = TestBed.get(AceconnexService);
    expect(service).toBeTruthy();
  });
});
