import {Component, ElementRef, EventEmitter, Input, OnChanges, Output, Renderer2, ViewChild} from '@angular/core';
import {ApiService} from '../../../@core/utils';
import {Dimensions, ImageCroppedEvent, ImageTransform} from 'ngx-image-cropper';
import {NbDialogService} from '@nebular/theme';
import { STORAGE_FILES } from '../../../@core';

@Component({
    selector: 'picture-uploader',
    styleUrls: ['./pictureUploader.scss'],
    templateUrl: './pictureUploader.html',
})
export class PictureUploader implements OnChanges {

    @Input() defaultPicture: string = '/assets/images/placeholder.jpg';
    @Input() linkBroken: string = '/assets/images/link_broken.jpg';
    @Input() picture: any = '';

    @Input() required: boolean = false;
    @Input() disabled: boolean = false;
    @Input() position: string = 'center';
    @Input() urlPath: string = STORAGE_FILES;
    @Input() config: any = {}; // max_width | max_height | hide_loader | hide_message | max_size
    @Input() canDelete: boolean = true;
    @Input() maintainAspectRatio = true;
    @Output() onUpload = new EventEmitter<any>();
    @Output() onUploadCompleted = new EventEmitter<any>();
    @Output() onChangePicture = new EventEmitter<any>();

    @ViewChild('fileUpload', {static: false}) public _fileUpload: ElementRef;

    linkIsBroken = false;

    public selectedPicture: any = '/assets/images/placeholder.jpg';
    public uploadInProgress: boolean;

    // Cropped
    cropDialog: any = null;
    imageChangedEvent: any = '';
    croppedImage: any = '';
    showCropper = false;
    containWithinAspectRatio = false;
    canvasRotation = 0;
    rotation = 0;
    scale = 1;
    transform: ImageTransform = {};

    // end cropped

    constructor(private apiService: ApiService,
        private dialogService: NbDialogService,
        private renderer: Renderer2) {
    }

    ngOnChanges() {
        this.uploadInProgress = true;
        this.linkIsBroken = false;
        this.getPicture().then((image) => {
            this.uploadInProgress = false;
            this.selectedPicture = image;
            this.uploadInProgress = false;
        }, (err) => {
            this.linkIsBroken = true;
            this.selectedPicture = err;
            this.uploadInProgress = false;
        });
    }

    getPicture() {
        return new Promise((resolve, reject) => {
            if (this.picture &&
        this.picture != 'null' &&
        this.picture != 'undefined' &&
        this.picture != '' &&
        typeof this.picture == 'string') {
                const image = (this.picture.indexOf('https://') === 0 || this.picture.indexOf('http://') === 0) ?
                    this.picture : this.urlPath + this.picture;
                this.validatePicture(image).then((data) => {
                    resolve(image);
                }, err => {
                    reject(this.linkBroken);
                });
            } else if (typeof this.picture == 'object' && this.picture.base64_image)
                resolve(this.picture.base64_image);
            else {
                resolve(this.defaultPicture);
            }
        });
    }

    validatePicture(url) {
        return new Promise((resolve: any, reject) => {
            const img = new Image;
            img.onerror = function (res) {
                reject();
            };
            img.onload = function (res) {
                resolve();
            };
            img.src = url;
        });
    }

    removePicture(): boolean {
        this.picture = '';
        this.onChangePicture.emit('');
        return false;
    }

    bringFileSelector(): boolean {
        if (!this.disabled) {
            this._fileUpload.nativeElement.click();
            this.uploadInProgress = false;
            return false;
        }
    }

    changePicture(file, template): void {
        if (!this.uploadInProgress && file) {
            this.uploadInProgress = true;

            const reader = new FileReader();
            const img = new Image;
            const _this = this;

            const files = this._fileUpload.nativeElement.files;
            if (files.length) {
                const the_image = files[0];
                const size = the_image.size / 1000;
                if (_this.config && _this.config.max_size && size > _this.config.max_size) {
                    let maxsize = _this.config.max_size;
                    maxsize = maxsize >= 1000 ? (maxsize / 1000) + 'MB' : maxsize + 'KB';
                    alert('No se puede cargar imagenes mayores a los ' + maxsize);
                } else {
                    img.onload = function () {
                        if (_this.config && (
                            (_this.config.max_width && img.width > _this.config.max_width) ||
              (_this.config.max_height && img.height > _this.config.max_height)
                        )) {
                            _this.uploadInProgress = false;
                            alert('La imagen cargada supera el maximo de tamaño permitido (Tamaño requerido maximo ' +
                _this.config.max_height + 'x' + _this.config.max_width + ')');
                        } else {
                            _this.openDialog(template, file);
                            _this.uploadInProgress = false;
                        }
                    };

                    reader.addEventListener('load', (event: Event) => {
                        img.src = (<any>event.target).result;
                    }, false);
                    reader.readAsDataURL(the_image);
                }
            }
        }
    }

    openDialog(template, file) {
        this.cropDialog = this.dialogService.open(template, {context: file});
        setTimeout(() => {
            this.fileChangeEvent(file);
        }, 1000);
    }

    // _onUpload(data): void {
    //     console.log(data);
    //     if (data['done'] || data['abort'] || data['error']) {
    //         this._onUploadCompleted(data);
    //     } else {
    //         this.onUpload.emit(data);
    //     }
    // }
    //
    // _onUploadCompleted(data): void {
    //     this.uploadInProgress = false;
    //     this.onUploadCompleted.emit(data);
    // }

    /**
   * Functions of Cropper
   */

    fileChangeEvent(event: any): void {
        this.imageChangedEvent = event;
    }

    imageCropped(event: ImageCroppedEvent) {
        this.croppedImage = event.base64;
    }

    imageLoaded() {
        this.showCropper = true;
    }

    cropperReady(sourceImageDimensions: Dimensions) {
    }

    loadImageFailed() {
    }

    rotateLeft() {
        this.canvasRotation--;
        this.flipAfterRotate();
    }

    rotateRight() {
        this.canvasRotation++;
        this.flipAfterRotate();
    }

    private flipAfterRotate() {
        const flippedH = this.transform.flipH;
        const flippedV = this.transform.flipV;
        this.transform = {
            ...this.transform,
            flipH: flippedV,
            flipV: flippedH,
        };
    }


    flipHorizontal() {
        this.transform = {
            ...this.transform,
            flipH: !this.transform.flipH,
        };
    }

    flipVertical() {
        this.transform = {
            ...this.transform,
            flipV: !this.transform.flipV,
        };
    }

    resetImage() {
        this.scale = 1;
        this.rotation = 0;
        this.canvasRotation = 0;
        this.transform = {};
    }

    zoomOut() {
        this.scale -= .1;
        this.transform = {
            ...this.transform,
            scale: this.scale,
        };
    }

    zoomIn() {
        this.scale += .1;
        this.transform = {
            ...this.transform,
            scale: this.scale,
        };
    }

    toggleContainWithinAspectRatio() {
        this.containWithinAspectRatio = !this.containWithinAspectRatio;
    }

    save() {
        if (this.showCropper) {
            this.onChangePicture.emit({
                base64_image: this.croppedImage,
                type: 'png'});
            this.cropDialog.close();
        }
    }
}
