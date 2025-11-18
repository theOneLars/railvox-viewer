import {TestBed} from '@angular/core/testing';

import {MessageService} from './message.service';
import {MatIconModule} from "@angular/material/icon";
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';

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
