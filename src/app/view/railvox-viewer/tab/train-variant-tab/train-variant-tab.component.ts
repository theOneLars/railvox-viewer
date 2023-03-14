import {Component, Input, OnInit} from '@angular/core';
import {TimetableData} from "../../../../business/timetable-data";
import {Zug} from "../../../../model/zug";
import {Verkehrsperiode} from "../../../../model/verkehrsperiode";
import {TabNavigationService} from "../../../../service/tab-navigation.service";
import {OperatingPeriodViewService} from "../../../../service/operating-period-view.service";
import {OperatingPeriodTabFilterConfig} from "../../../../model/operating-period-tab-filter-config";
import {TrainTabFilterConfig} from "../../../../model/train-tab-filter-config";
import {TrainTabService} from "../../../../service/train-tab.service";

@Component({
  selector: 'train-variant-tab',
  templateUrl: './train-variant-tab.component.html',
  styleUrls: ['./train-variant-tab.component.css']
})
export class TrainVariantTabComponent implements OnInit {

  @Input()
  timetableData: TimetableData;

  viewModel = new TrainVariantTabViewModel();

  constructor(private tabNavigationService: TabNavigationService,
              private operatingPeriodViewService: OperatingPeriodViewService,
              private trainTabService: TrainTabService) {
  }

  ngOnInit(): void {
    this.viewModel = new TrainVariantTabViewModel();
    let tagesLeistungen = this.timetableData.tagesLeistungen;
    tagesLeistungen
      .map(tl => tl.zuege)
      .flatMap(trainArr => trainArr)
      .forEach(train => {
        let trains = this.viewModel.trainsById.get(train.zugnummer);
        if (trains instanceof Array<Zug>) {
          trains.push(train);
        } else {
          this.viewModel.trainsById.set(train.zugnummer, [train]);
        }
      });
    this.viewModel.trainNumbers = Array.from(this.viewModel.trainsById.keys()).sort();
  }

  updateVariantsToDisplay() {
    this.viewModel.updateVariantsBySelection();
  }

  navigateToVPTab(verkehrsperiode: Verkehrsperiode) {
    let config = new OperatingPeriodTabFilterConfig();
    config.current = verkehrsperiode;
    this.operatingPeriodViewService.emitFilterConfig(config);
    this.tabNavigationService.navigateToVPTab();
  }

  navigateToTrainsTab(train: Zug) {
    let config = new TrainTabFilterConfig();
    config.trainNumber = train.zugnummer;
    config.selectedDate = train.verkehrsperiode.getFirstValidDay();
    this.trainTabService.emitFilterConfig(config);
    this.tabNavigationService.navigateToTrainTab();
  }
}

export class TrainVariantTabViewModel {

  trainsById: Map<string, Array<Zug>> = new Map();
  selectedTrainNumber: string;
  trainNumbers: Array<string> = [];
  variants: Array<Zug> = [];

  public updateVariantsBySelection() {
    let variants = this.trainsById.get(this.selectedTrainNumber);
    this.variants = variants ? variants : [];
    console.log(this.variants);
  }

}
