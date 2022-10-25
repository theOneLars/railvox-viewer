import {Component, Input, OnInit} from '@angular/core';
import {Tagesleistung} from "../../model/tagesleistung";

@Component({
  selector: 'tagesleistung-view',
  templateUrl: './tagesleistung-view.component.html',
  styleUrls: ['./tagesleistung-view.component.css']
})
export class TagesleistungViewComponent implements OnInit {

  @Input()
  tagesleistung: Tagesleistung;

  constructor() { }

  ngOnInit(): void {
  }

}
