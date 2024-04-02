import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment'


import { map } from 'rxjs';
import { Usuario } from 'src/app/layout/models/usuario.model';
import { CargarUsuario, CargarUsuarios } from 'src/app/layout/interfaces/cargar-interfaces.interfaces';

const base_url = environment.base_url
@Injectable({
    providedIn: 'root'
})
export class UsuariosService {

    constructor(private http: HttpClient,) { }
    get token(): string {
        return localStorage.getItem('token') || ''
    }
    get headers() {
        return {
            headers: {
                'x-token': this.token,
            },
        }
    }
    cargarUsuarios() {
        const url = `${base_url}/usuarios`
        return this.http.get<CargarUsuarios>(url, this.headers).pipe(
            map((resp) => {

                const usuarios = resp.usuarios.map(
                    (user) =>
                        new Usuario(
                            user.name,
                            user.lastname,
                            user.email,
                            user.telefono,
                            user.password,
                            user.img,
                            user.dateBirth,
                            user.role,
                            user.observaciones,
                            user.pays,
                            user.usuarioCreated,
                            user.activated,
                            user.dateCreated,
                            user.lastEdited,
                            user.uid,

                        ),
                )
                return {
                    total: usuarios.length,
                    usuarios,
                }
            }),
        )
    }

    crearUsuario(usuario: Usuario) {
        return this.http.post<CargarUsuario>(`${base_url}/usuarios`, usuario, this.headers)
    }
    isActivedUsuario(usuario: Usuario) {
        const url = `${base_url}/usuarios/isActive/${usuario.uid}`

        const data = {
            ...usuario,
            lastEdited: Date.now(),
        }


        return this.http.put(url, data, this.headers)
    }
}
