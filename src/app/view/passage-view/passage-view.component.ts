import {Component, Input, OnInit} from '@angular/core';
import {Passage} from "../../model/passage";

@Component({
  selector: 'app-passage-view',
  templateUrl: './passage-view.component.html',
  styleUrls: ['./passage-view.component.css']
})
export class PassageViewComponent implements OnInit {

  @Input()
  passage: Passage;

  constructor() { }

  ngOnInit(): void {
  }

  formatAbfahrt(): string {
    return this.passage.abfahrt.substring(0, 5);
  }

}
