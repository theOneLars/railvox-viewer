import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RailvoxParserComponent } from './railvox-parser.component';
import {HttpClient, HttpClientModule} from "@angular/common/http";

describe('RailvoxParserComponent', () => {
  let component: RailvoxParserComponent;
  let fixture: ComponentFixture<RailvoxParserComponent>;

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [HttpClient],
      declarations: [ RailvoxParserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RailvoxParserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
