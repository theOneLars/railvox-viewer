import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileDetailsTabComponent } from 'src/app/view/railvox-viewer/tab/file-details-tab/file-details-tab.component';

describe('FileDetailsComponent', () => {
  let component: FileDetailsTabComponent;
  let fixture: ComponentFixture<FileDetailsTabComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FileDetailsTabComponent]
    });
    fixture = TestBed.createComponent(FileDetailsTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
