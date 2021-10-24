import {Component, ViewChild, Input, Output, ElementRef, EventEmitter} from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { NbDialogService } from '@nebular/theme';
import { CustomModalDialogComponent } from './dialog/dialog.component';

import 'style-loader!./modal.scss';

@Component({
  selector: 'custom-modal',
  templateUrl: './modal.html'
})
export class CustomModalComponent {
  //@ViewChild('customModal', {static: false}) customModal: ModalDirective;
  data:null;
  error:null;
  @Input() baModalConfig={title : "Title", body:"body", buttonOkey: "Aceptar", buttonOkeyColor: "btn-success", buttonOkeyIcon: "ion-checkmark-round"};
  @Input() disabled=false;
  @Output() onOkey = new EventEmitter<any>();
  @Output() onCancel = new EventEmitter<any>();

  constructor (private dialogService: NbDialogService) {
  }

  public okey(): void{
    this.onOkey.emit(this.data);
  }

  public cancel(): void{
    this.hide();
    this.onCancel.emit(this.data);
  }

  public setError(string): void{
    console.log("getError: "+ string);
    this.error = string;
  }

  public show(data): void {
    this.dialogService.open(CustomModalDialogComponent, { context: 'this is some additional data passed to dialog' });
    this.data = data;
    //this.customModal.show();
  }

  public hide(): void {
    this.error = null;
    this.data = null;
    //this.customModal.hide();
  }
}
