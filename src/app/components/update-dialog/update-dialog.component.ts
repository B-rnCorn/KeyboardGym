import { Component, OnInit } from '@angular/core';
import {NbDialogRef} from "@nebular/theme";

@Component({
  selector: 'app-update-dialog',
  templateUrl: './update-dialog.component.html',
  styleUrls: ['./update-dialog.component.scss']
})
export class UpdateDialogComponent implements OnInit {

  constructor(protected dialogRef: NbDialogRef<any>,) { }

  ngOnInit(): void {
  }
    close() {
        this.dialogRef.close();
    }
}
