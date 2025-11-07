import {TestBed} from '@angular/core/testing';

import {MessageService} from './message.service';
import {MatLegacySnackBar as MatSnackBar, MatLegacySnackBarModule as MatSnackBarModule} from "@angular/material/legacy-snack-bar";
import {MatIconModule} from "@angular/material/icon";

describe('MessageService', () => {
  let service: MessageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MatSnackBarModule, MatIconModule],
      providers: [MatSnackBar]
    })
      .compileComponents();
    service = TestBed.inject(MessageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
