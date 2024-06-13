import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { GatosService } from '../../services/gatos.service';
import { GatosModel } from '../../models/gatos.model';
import { ImagesModel } from '../../models/imagenes.models';

@Component({
  selector: 'app-gatos',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './gatos.component.html',
  styleUrl: './gatos.component.scss',
})
export class GatosComponent {
  selectbreed = new FormControl();
  searchInput = new FormControl();
  gatos: GatosModel[] | undefined;
  newgatos: GatosModel[] | undefined;
  imagenes: ImagesModel[] | undefined;
  breed_id: string | undefined;
  limit: number = 10;
  breed: any;
  validaImagen: boolean = false;

  constructor(private gatosService: GatosService) {}
  ngOnInit() {
    this.getBreeds();
  }

  //Consulta las razas de gato
  getBreeds() {
    this.gatosService.getAllBreeds().subscribe({
      next: (resp: any) => {
        this.gatos = resp.data;
        this.newgatos = this.gatos;
      },
      error: (error: any) => {
        if (error.status === 400) {
          console.log('No existen razas de gatos');
        } else {
          console.log(error);
        }
      },
    });
  }
  //Consulta images por id_raza
  getImagesByBreed() {
    this.breed_id = this.selectbreed.value;
    this.gatosService.getImagesByBreed(this.breed_id, this.limit).subscribe({
      next: (resp: any) => {
        this.imagenes = resp.data;
        this.validaImagen = true;
        this.filterBreed();
      },
      error: (error: any) => {
        if (error.status === 400) {
          console.log('No existen razas de gatos');
        } else {
          console.log(error);
        }
      },
    });
  }

  //Filtra la raza seleccionada
  filterBreed() {
    this.breed = this.gatos?.filter((gato) => gato.id == this.breed_id);
  }

  //Busca por coincidencia
  findBreed() {
    let valor = this.searchInput.value;
    this.newgatos = this.gatos?.filter((gato) =>
      gato.name?.toLowerCase().includes(valor.toLowerCase())
    );
  }
}
