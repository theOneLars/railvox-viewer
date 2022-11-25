import {Component, Input, OnInit} from '@angular/core';
import {Zug} from "../../../model/zug";

@Component({
  selector: 'zug-view',
  templateUrl: './zug-view.component.html',
  styleUrls: ['./zug-view.component.css']
})
export class ZugViewComponent implements OnInit {

  @Input()
  zug: Zug;

  constructor() { }

  ngOnInit(): void {
  }

}
