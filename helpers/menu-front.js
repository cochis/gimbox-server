export const getMenuFront = () => {
  const menu = [
    {
      titulo: "Dashboard",
      icon: "mdi mdi-gauge",
      roles: ["ADMIN_ROLE"],
      submenu: [
        { titulo: "Main", url: "/" },
        { titulo: "ProgressBar", url: "progress" },
        { titulo: "Graficas", url: "grafica1" },
        { titulo: "Promesas", url: "promesas" },
        { titulo: "Rxjs", url: "rxjs" },
      ],
    },
    {
      titulo: "ADMIN",
      icon: "mdi mdi-folder-lock-open",
      roles: ["ADMIN_ROLE"],
      submenu: [
        { titulo: "Usuarios", url: "usuarios" },
        { titulo: "Alumnos", url: "alumnos" },
        { titulo: "Maestros", url: "maestros" },
        { titulo: "Cursos", url: "cursos" },
        { titulo: "Padres", url: "padres" },
      ],
    },
    {
      titulo: "Catalogos",
      icon: "mdi mdi-folder-lock-open",
      roles: ["ADMIN_ROLE"],
      submenu: [{ titulo: "Ver catalogos", url: "catalogos" }],
    },
    {
      titulo: "STD",
      icon: "mdi mdi-folder-lock-open",
      roles: ["STD_ROLE"],
      submenu: [
        { titulo: "Usuarios", url: "usuarios" },
        { titulo: "Alumnos", url: "alumnos" },
        { titulo: "cursos", url: "cursos" },
      ],
    },
    {
      titulo: "MST",
      icon: "mdi mdi-folder-lock-open",
      roles: ["MST_ROLE"],
      submenu: [
        { titulo: "Usuarios", url: "usuarios" },
        { titulo: "Alumnos", url: "alumnos" },
        { titulo: "cursos", url: "cursos" },
      ],
    },
  ];
};
