import {ComponentFixture, TestBed} from '@angular/core/testing';
import {RailvoxParserComponent} from './railvox-parser.component';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {MatCardModule} from "@angular/material/card";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatSnackBar, MatSnackBarModule} from "@angular/material/snack-bar";

describe('RailvoxParserComponent', () => {
  let component: RailvoxParserComponent;
  let fixture: ComponentFixture<RailvoxParserComponent>;

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      imports: [HttpClientModule, MatCardModule, MatProgressSpinnerModule, MatSnackBarModule],
      providers: [HttpClient, MatSnackBar],
      declarations: [RailvoxParserComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(RailvoxParserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
