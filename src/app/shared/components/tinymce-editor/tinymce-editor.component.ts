import { Component, Input, EventEmitter, Output, ViewChild, ViewEncapsulation, ElementRef } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Component({
    selector: 'app-tinymce-editor',
    encapsulation: ViewEncapsulation.None,
    template: `
        <editor
            #editor
            [(ngModel)]="inputModel"
            (ngModelChange)="inputModelChange.emit(inputModel)"
            class="tinyEditor"
            style="position:relative; height: {{ height }}"
            apiKey="{{ tinymceApiKey }}"
            [init]="getInit()"
            [inline]="false"
        ></editor>
    `,
    styles: ['.tox.tox-tinymce { height: 100% !important; }'],
})
export class TinymceEditorComponent {
    tinymceApiKey = environment.tinymceApiKey;

    @ViewChild('editor') editor!: ElementRef<HTMLElement>;
    @Input() inputModel!: string;
    @Input() height = '500px';
    @Input() toolbar = `undo redo | formatselect | bold italic backcolor | 
        alignleft aligncenter alignright alignjustify | 
        bullist numlist outdent indent | removeformat | help | media image | 
        paste pastetext | emoticons | link`;
    @Input() menubar = true;
    @Output() inputModelChange = new EventEmitter<string>();

    getInit() {
        return {
            menubar: this.menubar,
            plugins: [
                'advlist autolink lists link image charmap print preview anchor',
                'searchreplace visualblocks code fullscreen',
                'insertdatetime media table paste code help wordcount emoticons',
            ],
            toolbar: this.toolbar,
            automatic_uploads: true,
            file_picker_types: 'image',
            // eslint-disable-next-line  @typescript-eslint/no-explicit-any
            file_picker_callback: function (callback: any) {
                const input = document.createElement('input');
                input.setAttribute('type', 'file');
                input.setAttribute('accept', 'image/*');
                input.onchange = function () {
                    const res = <HTMLInputElement>this;
                    const file: File | undefined = res?.files?.[0];
                    if (file) {
                        const reader: FileReader = new FileReader();
                        reader.onload = function () {
                            const base64 = reader?.result?.toString().split(',')[1];
                            callback('data:image/png;base64,' + base64, { title: file?.name });
                        };
                        reader.readAsDataURL(file);
                    }
                };

                input.click();
            },
        };
    }
}
