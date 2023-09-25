import { Component, OnInit } from '@angular/core';
import { AdolescentService } from '../adolescent.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-adolescent-list',
  templateUrl: './adolescent-list.component.html',
  styleUrls: ['./adolescent-list.component.scss']
})
export class AdolescentListComponent implements OnInit {
  adolescents: any[] = [];
  filteredAdolescents: any[] = [];
  showEditForm = false;
  editedAdolescent: any = {};
  filterByStatus: string = 'A';
  isDeleteButton: boolean = true;
  nameFilter: string = '';


  constructor(private adolescentService: AdolescentService, private router: Router) { }

  ngOnInit(): void {
    this.adolescentService.getAdolescentList().subscribe(
      (data) => {
        this.adolescents = data;
        this.filteredAdolescents = data; // Agrega esta línea
      },
      (error) => {
        console.error('Error al obtener la lista de adolescentes:', error);
      }
    );
  }

  loadAdolescents(): void {
    if (this.filterByStatus === 'A') {
      this.adolescentService.getAdolescentList().subscribe(data => {
        this.adolescents = data;
        this.filteredAdolescents = data;
      });
    } else if (this.filterByStatus === 'I') {
      this.adolescentService.getInactiveAdolescentList().subscribe(data => { // Asegúrate de usar getInactivePersonList()
        this.adolescents = data;
        this.filteredAdolescents = data;
      });
    } else {
      this.adolescentService.getAdolescentList().subscribe(data => {
        this.adolescents = data;
        this.filteredAdolescents = data;
      });
    }
  }

  openEditForm(adolescent: any): void {
    this.editedAdolescent = { ...adolescent };
    this.showEditForm = true;
  }

  closeEditForm(): void {
    this.showEditForm = false;
    this.editedAdolescent = {}; // Limpiar los datos editados
  }

  saveEditedAdolescent(): void {
    this.adolescentService.updateAdolescent(this.editedAdolescent.id, this.editedAdolescent).subscribe(() => {
      this.showEditForm = false;
      this.editedAdolescent = {};
      this.adolescentService.getAdolescentList().subscribe(data => {
         this.adolescents = data;
       });
    });
  }

  deleteAdolescent(id: number): void {
    const confirmDelete = confirm('¿Estás seguro de que deseas eliminar este adolescente?');
    if (confirmDelete) {
      this.adolescentService.deleteAdolescent(id).subscribe(() => {
        this.adolescentService.getAdolescentList().subscribe(data => {
        this.adolescents = data;
        });
      });
    }
  }

  restoreAdolescent(id: number): void {
    const confirmRestore = confirm('¿Estás seguro de que deseas restaurar este adolescente?');
    if (confirmRestore) {
      this.adolescentService.restoreAdolescent(id).subscribe(() => {
        this.loadAdolescents(); // Vuelve a cargar la lista después de restaurar
      });
    }
  }



  filterAdolescentsByStatus(): void {
    if (this.filterByStatus === 'A') {
      this.filteredAdolescents = this.adolescents.filter(adolescent => adolescent.active === 'yes');
      this.isDeleteButton = true; // Cuando se filtra por Activos, el botón debe ser "Eliminar"
    } else if (this.filterByStatus === 'I') {
      this.filteredAdolescents = this.adolescents.filter(adolescent => adolescent.active === 'no');
      this.isDeleteButton = false; // Cuando se filtra por Inactivos, el botón debe ser "Restaurar"
    }
    this.loadAdolescents();
  }

  filterAdolescentsByName(): void {
    console.log('Filtrando por nombre:', this.nameFilter);

    this.filteredAdolescents = this.adolescents.filter(adolescent =>
      adolescent.name.toLowerCase() === this.nameFilter.toLowerCase()
    );
  }




}


