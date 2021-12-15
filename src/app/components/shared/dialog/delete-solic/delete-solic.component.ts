import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { SolicitudesService } from '../../../services/solicitudes/solicitudes.service';

@Component({
  selector: 'app-delete-solic',
  templateUrl: './delete-solic.component.html',
  styleUrls: ['./delete-solic.component.scss']
})
export class DeleteSolicComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }

}
