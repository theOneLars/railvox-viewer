import {ComponentFixture, TestBed} from '@angular/core/testing';

import {FileDetailsTabComponent} from 'src/app/view/railvox-viewer/tab/file-details-tab/file-details-tab.component';
import {TimetableData} from 'src/app/business/timetable-data';
import {Stammdaten} from 'src/app/model/stammdaten';
import {Fahrplan} from 'src/app/model/fahrplan';

describe('FileDetailsComponent', () => {
  let component: FileDetailsTabComponent;
  let fixture: ComponentFixture<FileDetailsTabComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FileDetailsTabComponent]
    });
    fixture = TestBed.createComponent(FileDetailsTabComponent);
    component = fixture.componentInstance;
    component.timetableData = createTimetableMock()
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  function createTimetableMock(): TimetableData {
    let timetableData = new TimetableData()
    timetableData.stammdaten = new Stammdaten(
      'Fahrplan 2022',
      'FIS Datenaufbereitung für KIS im Zug',
      '2022-08-24T11:47:28.616+02:00',
      'RailvoxRTZ',
      '1.0')
    timetableData.fahrplan = new Fahrplan('2021-12-12T00:00:00.000+01:00', '2022-12-10T23:59:59.000+01:00')
    return timetableData
  }
});
