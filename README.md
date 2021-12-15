# Techo

A continuación se detallan algunas especificaciones técnicas desde la aplicación Angular, para su configuración y correcto funcionamiento.

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.1.1.

# Dependecias/Librerías

Las siguientes dependencias/librerías utilizadas son:
-> Bootstrapp : v 5.0.2 `npm install bootstrap`
-> Angular Material `ng add @angular/material`
-> Firebase v 7.0 || v 8.0  `npm install firebase`
-> Angular Fire `ng add @angular/fire` documentación (https://github.com/angular/angularfire)
-> Fonts de Google `Import {MatIconModule} de Angular Material` documentación (https://material.angular.io/components/icon/api)

# Instalación
1° Tener instalado `Node.js`, para correr y descargas las dependencias. (https://nodejs.org/es/)
2° Tener instalado `Angular CLI`. (https://angular.io/guide/setup-local)
3° Clonamos el repositorio al local, y abrimos el código en el editor de código
4° Abrimos consola, y escribimos `npm install` para descargar todas las dependecias.ng serve

# Firebase

Para poder acceder al sistema como administrador o socio, se deberá generar las credenciales de autenticación de Firebase.
1° Se deberá crear una cuenta de Firebase de Google (https://firebase.google.com/)
2° Una vez realizado el login, se tiene que crear un proyecto siguiendo los pasos: 
    a) Ingresando el nombre del proyecto a "Techo"
    b) Puedes agregar Google Analytics (opcional)
    c) (opcional si se agrego Google Analytics) Elegir la cuenta "Default Account for Firebase"
    d) Por último "Crear Proyecto"
3° Abrimos el proyecto, y creamos una `APP WEB` 
    a) Registramos nuestra app con el nombre de "Techo"
    b) Agregamos el SDK de Firebase
        I) Instalamos la dependencia `npm install firebase`
        II) Guardar el SDK en los enviroments, la estructura debería ser la siguiente:
                const firebaseConfig = {
                        apiKey: "",
                        authDomain: "",
                        projectId: "",
                        storageBucket: "",
                        messagingSenderId: "",
                        appId: "",
                        measurementId: ""
                };

Documentación (https://firebase.google.com/docs/web/setup?authuser=0)

4° Configuramos las autenticaciones de firebase: Nos vamos a la pestaña de `Authentication` => `Sing-in method`, vamos a ver los proveedores de acceso que 
podemos llegar a tener en nuestra app. Abrimos `Correo electrónico/contraseña` y activamos la opción de `Correo electrónico/contraseña` y damos en `Guardar`.
Posterior seguimos con `Dominios Autorizados`, y agregamos el dominio de la url de la API del backend, y damos en `Agregar`, esto es para que la API pueda tener acceso a la app en firebase.
5° Reestablecimiento de contraseña: En la misma pestaña de `Authentication` nos vamos a `Templates` => `Restablecer contraseña`.
Para cambiar la información que recibirá el/la socio/a como correo de "cambiar contraseña", editamos los siguientes campos;
    a) "Nombre del remitente": "TECHO".
    b) "De": Pueden dejar por defecto el correo que les proporciona firebase, o personalizar el dominio de un correo institucional de Techo.
    c) "Responder a": No es necesario que responda a nadie porque firebase gestiona el cambio de la contraseña. Por defecto queda en `noreply`.
    d) "Asunto": reemplazamos por ` "Cambio de contraseña de %APP_NAME%" `, el "%APP_NAME%" hace referencia al nombre de la app de firebase.
    e) "Mensaje": Aquí le inyectamos html y css al mensaje para que tenga cuerpo el correo, el siguiente código es;
        <div style="background-color: #1599dd;width: 300px;height: 100px;box-shadow: 1px 4px 10px rgba(0, 0, 0, 0.45);border-radius: 30px 30px 0px 0px;">
            <img src="https://pbs.twimg.com/profile_images/811572223681110016/Ll9Notfq.jpg" style="width: 120px;height: 100px;box-shadow: 1px 4px 10px rgba(0, 0, 0, 0.45);border-radius: 30px 30px 0px 0px;display: flex;justify-content: center;align-items: center;margin-left: 90px;" />
        </div>
        <div style="width: 312px; margin-top:10px; margin-left:5px;">
            <h2 style="color:#3B3B3B;">Recuperá tu contraseña</h2>
            <h2 style="color:#3B3B3B;">¡Hola, Socio/a! de TECHO!</h2> 
            <h3 style="color: #3B3B3B;">Recibiste este correo porque solicitaste recuperar la contraseña de tu cuenta
                                        de Socio/a TECHO</h3>
            <h3 style="color: #3B3B3B;">Tocá el siguiente botón para restablecer contraseña</h3>
            <a href="%LINK%">
                <button style="background-color: #0092DD;
                color: white; height: 50px; border-radius: 100px; width: 225px;">Restablecer Contraseña</button>
            </a>
            <h4 style="color: #868686;">Si no lo pediste, podés ignorar este correo</h4>
        </div>
    f) Damos en `Guardar`. También podemos configurar el idioma de las plantillas.

# Enviroment

1° En nuestro proyecto Angular en la carpeta "enviroments", cambiamos los valores en los archivos `enviroments.ts`, y `enviroments.prod.ts`, y agregamos 
los SDK que guardamos en firebase debajo de `production: boolean`.

2° Cuando se obtenga la url de la api del backend y este en producción, agregamos en los archivos "enviroment", otra propiedad llamada 
`apiEndpoint: "https://{{urlDeLaApi}}.com"`

# Administradores

Para setear administradores y poder tener acceso a los permisos, se tendrá que hacerse de forma manual, proceda con los siguientes pasos:

1° Debe ir a Firebase en  `Authentication` => `Users`, y dar en `"Agregar usuario"`. Colocar el correo electónico del administrador y su contraseña.
2° Se le proporcionará un `UID de usuario`, que será el identificador único. Copie ese "UID".
3° A continuación nos conectaremos a la API del backend, para esto se recomienda usar "Postman"; Primero debe tener los endpoints desplegados para usarlos.
usaremos el siguiente endpoint `{{ApiUrl}}/users/setclaims/:uid` con el método de API REST `PUT`, en los `Params` usaremos los `Path Variables`, el campo "KEY" escribimos "uid", y en "VALUE" pegamos el `UID de usuario`. En la parte de `Body` seleccionamos "raw" y en formato JSON vamos a enviar lo siguiente;
"` {"admin": true} ` "
4° Cuando se crea un nuevo usuario, por defecto se le asigna un `claims` vacío, por lo tanto podrá acceder al flujo de socio. Realizando el paso anterior se le asignará los permisos de administrador pudiendo ver el flujo de administrador.
5° Si desean agregar más administradores, simplemente en "Alta" agregan un nuevo "socio/a", y con el mismo procedimiento en Postman con el `UID de usuario` se le asigna el claims de 'admin'.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
