import { Component } from '@angular/core';
import { FileService } from '../../services/file.service';

@Component({
  selector: 'app-file-manager',
  templateUrl: './file-manager.component.html',
  styleUrls: ['./file-manager.component.scss']
})

export class FileManagerComponent {
  files: any[] = [];
  selectedFile: File | null = null;
  userUrl: string = '';

  constructor(private fileService: FileService) {}

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  uploadFile() {
    if (!this.selectedFile) return;

    const formData = new FormData();
    formData.append('file', this.selectedFile);

    this.fileService.uploadFile(formData).subscribe(() => {
      alert('File was sent successfully');
      this.loadFiles();
    });
  }

  loadFiles() {
    if(!this.userUrl) {
      alert('Insert the path where your file is being saved')
    }

    this.fileService.downloadFile(this.userUrl).subscribe((fileBlob) => {
      const blob = new Blob([fileBlob], { type: fileBlob.type });
      const url = window.URL.createObjectURL(blob)

      window.open(url)
    });
  }

  downloadFile(fileId: number) {
    console.log('File downloaded:', fileId);
  }
}
