import {Component, Input, OnInit} from '@angular/core';
import {Trigger} from "../../model/trigger";

@Component({
  selector: 'trigger-view',
  templateUrl: './trigger-view.component.html',
  styleUrls: ['./trigger-view.component.css']
})
export class TriggerViewComponent implements OnInit {

  @Input()
  trigger: Trigger;

  constructor() { }

  ngOnInit(): void {
  }
}
