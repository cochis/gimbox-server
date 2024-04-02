import { Component, Input, OnInit } from '@angular/core';

import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { CatalogService } from 'src/app/core/service/catalog.service';
import { UsuariosService } from 'src/app/core/service/usuarios.service';
import { Usuario } from 'src/app/layout/models/usuario.model';
import { FunctionServiceService } from 'src/app/layout/service/function-service.service';


@Component({
    templateUrl: './usuarios.component.html',
    providers: [MessageService, CatalogService],
    selector: 'app-usuarios',
})
export class UsuariosComponent implements OnInit {
    @Input() array: any = [];
    today: Number = Number(this.functionsService.getToday())
    usuarioDialog: boolean = false;

    deleteUsuarioDialog: boolean = false;

    deleteUsuariosDialog: boolean = false;

    usuarios: Usuario[] = [];
    usuariosTemp: Usuario[] = [];

    usuario: Usuario = {
        name: '',
        lastname: '',
        email: '',
        telefono: '',
        password: '',
        img: '',
        dateBirth: 0,
        role: '',
        observaciones: '',
        pays: [""],
        usuarioCreated: undefined,
        activated: false,
        dateCreated: 0,
        lastEdited: 0,
        uid: ''
    };

    selectedUsuarios: Usuario[] = [];

    submitted: boolean = false;

    cols: any[] = [];

    statuses: any[] = [];

    rowsPerPageOptions = [5, 10, 20];
    catalogos = []
    constructor(
        private usuarioService: UsuariosService,
        private messageService: MessageService,
        private functionsService: FunctionServiceService,
        private catalogService: CatalogService
    ) { }
    cargarCatalogos() {
        this.catalogService.cargarCatalogsByType('ROLE').subscribe(resp => {
            console.log('resp::: ', resp);
            this.catalogos = resp.catalogos


        })
    }


    ngOnInit() {
        this.cargarCatalogos()

        this.cargarUsuarios()
        console.log('this.usuarios ::: ', this.usuarios);
        this.cols = [
            { field: 'name', header: 'Nombre' },
            { field: 'lastname', header: 'Apellidos' },
            { field: 'email', header: 'Correo electrónico' },
            { field: 'dateBirth', header: 'Fecha de nacimiento' },
            { field: 'area', header: 'Area' }
        ];

        this.statuses = [
            { label: 'INSTOCK', value: 'instock' },
            { label: 'LOWSTOCK', value: 'lowstock' },
            { label: 'OUTOFSTOCK', value: 'outofstock' }
        ];

    }

    openNew() {
        this.usuario = {
            name: '',
            lastname: '',
            email: '',
            telefono: '',
            password: '',
            img: '',
            dateBirth: 0,
            role: '',
            observaciones: '',
            pays: [""],
            usuarioCreated: undefined,
            activated: false,
            dateCreated: 0,
            lastEdited: 0,
            uid: ''
        };
        this.submitted = false;
        this.usuarioDialog = true;
    }

    deleteSelectedUsuarios() {
        this.deleteUsuariosDialog = true;
    }

    editUsuario(usuario: Usuario) {
        this.usuario = { ...usuario };
        this.usuarioDialog = true;
    }

    deleteUsuario(usuario: Usuario) {
        this.deleteUsuarioDialog = true;
        this.usuario = { ...usuario };
    }

    confirmDeleteSelected() {
        this.deleteUsuariosDialog = false;
        this.usuarios = this.usuarios.filter(val => !this.selectedUsuarios.includes(val));
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Usuarios Deleted', life: 3000 });
        this.selectedUsuarios = [];
    }

    confirmDelete() {
        this.deleteUsuarioDialog = false;
        this.usuarios = this.usuarios.filter(val => val.uid !== this.usuario.uid);
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Usuario Deleted', life: 3000 });
        this.usuario = undefined;
    }

    hideDialog() {
        this.usuarioDialog = false;
        this.submitted = false;
    }

    saveUsuario() {
        console.log('this.usuariosTemp::: ', this.usuariosTemp);
        this.submitted = true;

        if (this.usuario.name?.trim()) {
            if (this.usuario.uid) {
                // @ts-ignore
                this.usuario.inventoryStatus = this.usuario.inventoryStatus.value ? this.usuario.inventoryStatus.value : this.usuario.inventoryStatus;
                this.usuarios[this.findIndexById(this.usuario.uid)] = this.usuario;
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Usuario Updated', life: 3000 });
            } else {
                let dateBirth = new Date(this.usuario.dateBirth)
                this.usuario.dateCreated = Number(this.today)
                this.usuario.lastEdited = Number(this.today)
                this.usuario.dateBirth = Number(dateBirth)
                this.usuario.role = "66062c6f2a81fed40264c13f"
                this.usuarioService.crearUsuario(this.usuario).subscribe((respUSer) => {
                    console.log('respUSer::: ', respUSer);


                    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Usuario Created', life: 3000 });
                    this.cargarUsuarios()

                })
            }
            this.usuario = {
                name: '',
                lastname: '',
                email: '',
                telefono: '',
                password: '',
                img: '',
                dateBirth: 0,
                role: '',
                observaciones: '',
                pays: [""],
                usuarioCreated: undefined,
                activated: false,
                dateCreated: 0,
                lastEdited: 0,
                uid: ''
            }

            this.usuarioDialog = false;


        }
    }
    cargarUsuarios() {
        this.usuarios = undefined
        console.log('  this.usuarios::: ', this.usuarios);
        this.usuarioService.cargarUsuarios().subscribe(resp => {
            this.array = resp.usuarios
            this.usuarios = [...resp.usuarios]
        })
    }
    findIndexById(id: string): number {
        let index = -1;
        for (let i = 0; i < this.usuarios.length; i++) {
            if (this.usuarios[i].uid === id) {
                index = i;
                break;
            }
        }

        return index;
    }

    createId(): string {
        let id = '';
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < 5; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return id;
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    isActived(usuario: Usuario) {

        this.usuarioService.isActivedUsuario(usuario).subscribe((resp: any) => {
            this.cargarUsuarios()
            this.messageService.add({ severity: 'Actualizacion', summary: 'Successful', detail: 'Usuario Actualizado', life: 3000 });

        },
            (error: any) => {
                this.messageService.add({ severity: 'Error', summary: 'error', detail: 'Error', life: 3000 });


            })
    }
    getEdad(date: number) {


        let res = Number(this.today) - date

        res = ((((res / 1000) / 60) / 60) / 24) / 365
        return Math.trunc(res)
    }
}
