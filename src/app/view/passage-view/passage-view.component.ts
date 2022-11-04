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

  formatTime(): string {
    if (this.passage.abfahrt && this.passage.abfahrt.length >= 6) {
      return this.passage.abfahrt.substring(0, 5);
    }
    if (this.passage.ankunft && this.passage.ankunft.length >= 6) {
      return this.passage.ankunft.substring(0, 5);
    }
    return '';
  }

}
