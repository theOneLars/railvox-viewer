import {Component, Input, OnInit} from '@angular/core';
import {Zug} from "../../../../../model/zug";
import {Verkehrsperiode} from "../../../../../model/verkehrsperiode";
import {OperatingPeriodViewService} from "../../../../../service/operating-period-view.service";
import {OperatingPeriodTabFilterConfig} from "../../../../../model/operating-period-tab-filter-config";
import {TabNavigationService} from "../../../../../service/tab-navigation.service";

@Component({
  selector: 'zug-view',
  templateUrl: './zug-view.component.html',
  styleUrls: ['./zug-view.component.css']
})
export class ZugViewComponent implements OnInit {

  @Input()
  zug: Zug;

  constructor(private operatingPeriodTabService: OperatingPeriodViewService,
              private tabNavigationService: TabNavigationService) { }

  ngOnInit(): void {
  }

  navigateToVPTab(verkehrsperiode: Verkehrsperiode) {
    let vpFilterConfig: OperatingPeriodTabFilterConfig = new OperatingPeriodTabFilterConfig();
    vpFilterConfig.current = verkehrsperiode;
    this.operatingPeriodTabService.emitFilterConfig(vpFilterConfig);
    this.tabNavigationService.navigateToVPTab();
  }
}
