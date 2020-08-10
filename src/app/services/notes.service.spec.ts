import { TestBed } from '@angular/core/testing';

import { noteServices } from './notes.service';

describe('noteServices', () => {
  let service: noteServices;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(noteServices);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
