import {Component, EventEmitter, Input, Output} from '@angular/core';
import * as Events from "events";

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent {
  @Input() message: string
  @Output() close = new EventEmitter

  onClose(e){
    if (e.target.classList.contains('backdrop') || e.target.classList.contains('btn') ){
      this.close.emit()
    }
  }
}
