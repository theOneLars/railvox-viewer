import {ComponentFixture, TestBed} from '@angular/core/testing';
import {RailvoxViewerComponent} from './railvox-viewer.component';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {MatCardModule} from "@angular/material/card";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatSnackBar, MatSnackBarModule} from "@angular/material/snack-bar";

describe('RailvoxParserComponent', () => {
  let component: RailvoxViewerComponent;
  let fixture: ComponentFixture<RailvoxViewerComponent>;

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      imports: [HttpClientModule, MatCardModule, MatProgressSpinnerModule, MatSnackBarModule],
      providers: [HttpClient, MatSnackBar],
      declarations: [RailvoxViewerComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(RailvoxViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
