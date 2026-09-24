import { TestBed } from '@angular/core/testing';
import { DutyManagement } from './duty-management';

describe('DutyManagement', () => {
  let service: DutyManagement;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DutyManagement);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
