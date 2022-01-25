import {Component, EventEmitter, Input, Output, TemplateRef, ViewChild} from '@angular/core';
import { NbDialogRef, NbDialogService } from '@nebular/theme';

@Component({
    selector: 'custom-modal',
    styleUrls: ['./modal.scss'],
    templateUrl: './modal.html',
})
export class CustomModalComponent {
    @ViewChild('openModalDialog', {static: false}) modal: TemplateRef<any>;

    dialog: NbDialogRef<any> = null;
    data = null;
    error = null;
    @Input() baModalConfig = {
        title: 'Title',
        body: 'body',
        buttonOkey: 'Aceptar',
        buttonOkeyColor: 'btn-success',
        buttonOkeyIcon: 'ion-checkmark-round',
    };
    @Input() disabled = false;
    @Output() onOkey = new EventEmitter<any>();
    @Output() onCancel = new EventEmitter<any>();

    constructor(private dialogService: NbDialogService) {
    }

    public okey(): void {
        this.onOkey.emit(this.data);
    }

    public cancel(): void {
        this.close();
        this.error = null;
        this.onCancel.emit(this.data);
    }

    public setError(string): void {
        console.log('getError: ' + string);
        this.error = string;
    }

    public show(data): void {
        this.error = null;
        this.data = data;
        this.dialog = this.dialogService.open(this.modal, {context: data});
    }

    public close(): void {
        this.data = null;
        this.error = null;
        this.dialog.close();
    }
}
