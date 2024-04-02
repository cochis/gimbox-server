export class Usuario {
    constructor(
        public name: string,
        public lastname: string,
        public email: string,
        public telefono: string,
        public password: string,
        public img: string,
        public dateBirth: number,
        public role: string,
        public observaciones: string,
        public pays: [any],
        public usuarioCreated: any,
        public activated: boolean,
        public dateCreated: number,
        public lastEdited: number,
        public uid: string
    ) { }
}