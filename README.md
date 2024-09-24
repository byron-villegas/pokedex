# Pokedex

Proyecto Pokedex + Angular v14 + Bootstrap v5.2.3 + JQuery v3.6.3 + Font Awesome v4.7.0 + Express v4.18.1 + Test Unitarios (mocha) + Tests E2E (cypress) + Reporte de tests e2e (mochawesome)

## Comenzando 🚀

_Estas instrucciones te permitirán obtener una copia del proyecto en funcionamiento en tu máquina local para propósitos de desarrollo y pruebas._

**Clonar mediante SSH**
```shell
git clone git@github.com:byron-villegas/pokedex.git
```
**Clonar mediante HTTPS**
```shell
git clone https://github.com/byron-villegas/pokedex.git
```

Mira Deployment para conocer como desplegar el proyecto.

### Pre-requisitos 📋

_Que cosas necesitas para instalar el software y como instalarlas_

| Software | Versión  |
|----------|----------|
| node     | v16.14.2 |
| npm      | 8.5.0    |

#### Instalar Node

Para instalar Node debemos ir a la siguiente pagina: https://nodejs.org/en/download/ descargar el instalador, ejecutarlo y seguir los pasos para la instalación.

### Instalación 🔧

_Una serie de ejemplos paso a paso que te dice lo que debes ejecutar para tener un entorno de desarrollo ejecutandose_

Instalar las dependencias declaradas en el **package.json** mediante el siguiente comando:

```shell
npm install
```
**NOTA:** Node instalara todas las depedencias necesarias incluyendo las de desarrollo (test unitarios, test de automatizacion, etc).

Instalación de dependencias finalizada mostrando el siguiente resultado en consola:

```shell
added 1121 packages, and audited 1122 packages in 25s

145 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities
```

_Finaliza con un ejemplo de cómo obtener datos del sistema o como usarlos para una pequeña demo_

[Ver Demo ↗️](https://pokedex-5999.onrender.com/pokedex/)

Para desplegar la aplicación tenemos las siguientes formas:

Por defecto
```shell
ng serve
```

La aplicación se desplegará exitosamente mostrando el siguiente resultado en consola:

```shell
✔ Browser application bundle generation complete.

Initial Chunk Files   | Names         |  Raw Size
vendor.js             | vendor        |   2.19 MB |
styles.css, styles.js | styles        | 441.41 kB |
polyfills.js          | polyfills     | 315.78 kB |
scripts.js            | scripts       | 146.72 kB |
main.js               | main          | 122.75 kB |
runtime.js            | runtime       |   6.51 kB |

                      | Initial Total |   3.20 MB

Build at: 2023-03-22T04:56:53.583Z - Hash: 428c760a5e28d775 - Time: 4699ms

** Angular Live Development Server is listening on localhost:4200, open your browser on http://localhost:4200/pokedex **


√ Compiled successfully.
```

Con express:

```shell
npm start
```
**NOTA:** Si se realiza un cambio a la aplicación no se reiniciará automáticamente.

La aplicación se desplegará exitosamente mostrando el siguiente resultado en consola:

```shell
Server is listening on http://localhost:4200/pokedex
```

## Ejecutando las pruebas ⚙️

_Explica como ejecutar las pruebas automatizadas para este sistema_

### Pruebas unitarias 📑

_Explica que verifican estas pruebas y por qué_

Los test unitarios son para comprobar que un fragmento de código determinado está funcionando de manera correcta, cabe destacar que si modificamos una funcionalidad toda prueba unitaria asociada a esa funcionalidad fallará si no es refactorizada debidamente.

#### Configuración

##### karma

_Herramienta utilizada para ejecutar los tests unitarios._

Para configurar karma utilizaremos el siguiente archivo:

###### karma.conf.js

```javascript
module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('@chiragrupani/karma-chromium-edge-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-sabarivka-reporter'),
      require('karma-coverage'),
      require('@angular-devkit/build-angular/plugins/karma')
    ],
    client: {
      jasmine: {},
      clearContext: false
    },
    jasmineHtmlReporter: {
      suppressAll: true
    },
    coverageReporter: {
      dir: require('path').join(__dirname, './coverage/'),
      subdir: '.',
      include: [
        'src/**/*.(ts|js)',
        '!src/**/*.spec.*',
        '!src/**/*main.ts',
        '!src/**/*test.ts',
        '!src/**/*environment.**'
      ],
      reporters: [
        { type: 'html' },
        { type: 'text-summary' }
      ],
      check: {
        global: {
          statements: 60,
          branches: 40,
          functions: 60,
          lines: 60
        }
      }
    },
    reporters: ['progress', 'kjhtml', 'sabarivka'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['ChromeHeadless', 'EdgeHeadless'],
    customLaunchers: {
      headless: {
        base: 'ChromeHeadless',
        flags: [
          '--no-sandbox',
          '--disable-setuid-sandbox'
        ]
      }
    },
    singleRun: true,
    restartOnFileChange: true
  });
};
```

###### Parametros a destacar

- plugins: Son plugins extra que podemos agregar para imprimir coverage en consola, otros navegadores, etc
- coverageReporter: Es toda la configuración referente al reporte de coverage por defecto angular solo mostrará la cobertura de los archivos que posean un test **.spec.ts**
- coverageReporter.check: nos permite definir los porcentajes de cobertura que queremos por:
  - statements
  - branches
  - functions
  - lines
- reporters: Son las herramientas de reportes
- browsers: Listado de navegadores que admitimos para la ejecución de los tests
- customLaunchers: Permite sobreescribir la configuracion del navegador de la ejecución de los tests, en este ejemplo configuraciones chrome headless ¿qué quiere decir esto? que se ejecutarán los tests de manera oculta
- singleRun: Permite realizar una única ejecución para todos los tests

#### Ejecución

Para ejecutar los test unitarios debemos utilizar el siguiente comando:

```shell
npm test
```
**NOTA:** Se ejecutarán todos los tests (**spec**) declarados en el directorio **/src/**.

Los tests unitarios se ejecutarán exitosamente mostrando el siguiente resultado en consola:

```shell
> pokedex@1.0.0 test
> ng test --browsers=headless --no-watch

✔ Browser application bundle generation complete.
18 03 2023 17:22:13.401:INFO [karma-server]: Karma v6.4.1 server started at http://localhost:9876/
18 03 2023 17:22:13.404:INFO [launcher]: Launching browsers headless with concurrency unlimited
18 03 2023 17:22:13.415:INFO [launcher]: Starting browser Edge Headless
18 03 2023 17:22:15.073:INFO [Edge 108.0.1462.46 (Windows 10)]: Connected on socket zQmlmwsGvkIt4rV_AAAB with id 87843697
Edge 108.0.1462.46 (Windows 10): Executed 9 of 27 SUCCESS (0 secs / 0.403 secs)
Edge 108.0.1462.46 (Windows 10): Executed 27 of 27 SUCCESS (0.51 secs / 0.452 secs)
TOTAL: 27 SUCCESS

=============================== Coverage summary ===============================
Statements   : 63.86% ( 175/274 )
Branches     : 40.18% ( 43/107 )
Functions    : 67.04% ( 59/88 )
Lines        : 68.04% ( 164/241 )
================================================================================
```
**NOTA:** Como resultado de los test unitarios se mostrará por consola el resumen de cubertura y además se generará un reporte de coverage en el directorio **/coverage** en un archivo **index.html**.

##### Reporte de cobertura de los tests unitarios

![-----------------------------](/docs/img01.png)
**NOTA:** Como podemos ver estan los porcentajes correspondientes para las siguientes categorías: statements, branches, functions y lines

### Pruebas End to End ✅

_Explica que verifican estas pruebas y por qué_

Las pruebas end-to-end se pueden definir simplemente como un procedimiento que se ejecuta para productos complejos. Este tipo de pruebas confirman que la aplicación funciona tal como se espera analizando todos sus componentes. Por ende, se simula la experiencia del usuario de principio a fin.

#### Configuración

##### cypress

_Cypress es una herramienta Javascript de end-to-end testing. En otras palabras, permite comprobar que la performance de un producto de software recién desarrollado sea buena y corresponda con los requerimientos iniciales, utilizando la automatización._

_Cabe destacar que mediante mochawesome podemos generar un reporte de los tests ejecutados._

Para configurar cucumber utilizaremos el siguiente archivo:

###### cyrpress.config.ts

```javascript
import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:4200'
  },
  reporter: 'mochawesome',
  reporterOptions: {
    reportDir: 'cypress/results',
    charts: true,
    overwrite: false,
    html: false,
    json: true
  },
  modifyObstructiveCode: false,
  userAgent: 'Robot Chromium'
});
```

###### Parametros

- e2e.baseUrl: Url base para la ejecución de los tests
- reporter: Herramienta de generación de reportes
- reporterOptions: Configuración de las opciones del reporte
- reporterOptions.reportDir: Permite configurar la ruta donde se guardará el reporte
- modifyObstructiveCode: Es una configuración para temas de rendimiendo del uso de apis externas
- userAgent: Permite sobreescribir el userAgent del navegador del test

#### Ejecución

Para ejecutar los test de aceptación debemos utilizar el siguiente comando:

```shell
npm run e2e
```
**NOTA:** Se desplegará automaticamente la aplicación, posteriormente cypress ejecutará todos los **spec** definidos en la carpeta **cypress/e2e**

Los tests de aceptación se ejecutarán exitosamente mostrando el siguiente resultado en consola:

```shell
> pokedex@1.0.0 cypress:run
> cypress run

====================================================================================================

  (Run Starting)

  ┌────────────────────────────────────────────────────────────────────────────────────────────────┐
  │ Cypress:        10.11.0                                                                        │
  │ Browser:        Electron 106 (headless)                                                        │
  │ Node Version:   v16.10.0 (C:\Program Files\nodejs\node.exe)                                    │
  │ Specs:          7 found (dark-theme.spec.cy.ts, order-pokemon-by-type.spec.cy.ts, order-pokemo │
  │                 n.spec.cy.ts, principal-page.spec.cy.ts, search-pokemon-with-bad-characters.sp │
  │                 ec.cy.ts, search-pokemon.spec.cy.ts, shiny.spec.cy.ts)                         │
  │ Searched:       cypress/e2e/**/*.cy.{js,jsx,ts,tsx}                                            │
  └────────────────────────────────────────────────────────────────────────────────────────────────┘


────────────────────────────────────────────────────────────────────────────────────────────────────

  Running:  dark-theme.spec.cy.ts                                                           (1 of 7)


  Activar el Dark Theme
    √ Validar que se active el Dark Theme (6894ms)

  Desactivar el Dark Theme
    √ Validar que se desactive el Dark Theme (9017ms)


  2 passing (16s)

[mochawesome] Report JSON saved to \pokedex\cypress\results\mochawesome_007.json


  (Results)

  ┌────────────────────────────────────────────────────────────────────────────────────────────────┐
  │ Tests:        2                                                                                │
  │ Passing:      2                                                                                │
  │ Failing:      0                                                                                │
  │ Pending:      0                                                                                │
  │ Skipped:      0                                                                                │
  │ Screenshots:  0                                                                                │
  │ Video:        true                                                                             │
  │ Duration:     15 seconds                                                                       │
  │ Spec Ran:     dark-theme.spec.cy.ts                                                            │
  └────────────────────────────────────────────────────────────────────────────────────────────────┘


  (Video)

  -  Started processing:  Compressing to 32 CRF
  -  Finished processing: \pokedex\cypress\videos     (1 second)
                          \dark-theme.spec.cy.ts.mp4


────────────────────────────────────────────────────────────────────────────────────────────────────

  Running:  order-pokemon-by-type.spec.cy.ts                                                (2 of 7)


  Ordenar listado de pokemones por tipo
    √ Ordenar por tipo fuego (12136ms)
    √ Ordenar por tipo planta (12058ms)
    √ Ordenar por tipo desconocido (11759ms)


  3 passing (36s)

[mochawesome] Report JSON saved to \pokedex\cypress\results\mochawesome_008.json


  (Results)

  ┌────────────────────────────────────────────────────────────────────────────────────────────────┐
  │ Tests:        3                                                                                │
  │ Passing:      3                                                                                │
  │ Failing:      0                                                                                │
  │ Pending:      0                                                                                │
  │ Skipped:      0                                                                                │
  │ Screenshots:  0                                                                                │
  │ Video:        true                                                                             │
  │ Duration:     36 seconds                                                                       │
  │ Spec Ran:     order-pokemon-by-type.spec.cy.ts                                                 │
  └────────────────────────────────────────────────────────────────────────────────────────────────┘


  (Video)

  -  Started processing:  Compressing to 32 CRF
  -  Finished processing: \pokedex\cypress\videos    (3 seconds)
                          \order-pokemon-by-type.spec.cy.ts.mp4


────────────────────────────────────────────────────────────────────────────────────────────────────

  Running:  order-pokemon.spec.cy.ts                                                        (3 of 7)


  Ordenar listado de pokemones
    √ Ordenar Menor a Mayor (9908ms)
    √ Ordenar Mayor a Menor (10257ms)
    √ Ordenar A - Z (9618ms)
    √ Ordenar Z - A (9775ms)


  4 passing (40s)

[mochawesome] Report JSON saved to \pokedex\cypress\results\mochawesome_009.json


  (Results)

  ┌────────────────────────────────────────────────────────────────────────────────────────────────┐
  │ Tests:        4                                                                                │
  │ Passing:      4                                                                                │
  │ Failing:      0                                                                                │
  │ Pending:      0                                                                                │
  │ Skipped:      0                                                                                │
  │ Screenshots:  0                                                                                │
  │ Video:        true                                                                             │
  │ Duration:     39 seconds                                                                       │
  │ Spec Ran:     order-pokemon.spec.cy.ts                                                         │
  └────────────────────────────────────────────────────────────────────────────────────────────────┘


  (Video)

  -  Started processing:  Compressing to 32 CRF
  -  Finished processing: \pokedex\cypress\videos    (3 seconds)
                          \order-pokemon.spec.cy.ts.mp4


────────────────────────────────────────────────────────────────────────────────────────────────────

  Running:  principal-page.spec.cy.ts                                                       (4 of 7)


  Entrar en la pagina principal
    √ Validar que el titulo sea Pokedex


  1 passing (5s)

[mochawesome] Report JSON saved to \pokedex\cypress\results\mochawesome_010.json


  (Results)

  ┌────────────────────────────────────────────────────────────────────────────────────────────────┐
  │ Tests:        1                                                                                │
  │ Passing:      1                                                                                │
  │ Failing:      0                                                                                │
  │ Pending:      0                                                                                │
  │ Skipped:      0                                                                                │
  │ Screenshots:  0                                                                                │
  │ Video:        true                                                                             │
  │ Duration:     4 seconds                                                                        │
  │ Spec Ran:     principal-page.spec.cy.ts                                                        │
  └────────────────────────────────────────────────────────────────────────────────────────────────┘


  (Video)

  -  Started processing:  Compressing to 32 CRF
  -  Finished processing: \pokedex\cypress\videos    (0 seconds)
                          \principal-page.spec.cy.ts.mp4


────────────────────────────────────────────────────────────────────────────────────────────────────

  Running:  search-pokemon-with-bad-characters.spec.cy.ts                                   (5 of 7)


  Utilizar la barra de busqueda de pokemon con caracteres extranos
    √ Validar que al escribir caracteres extranos solo reciba caracteres normales
    √ Validar que al pegar caracteres extranos solo reciba caracteres normales


  2 passing (9s)

[mochawesome] Report JSON saved to \pokedex\cypress\results\mochawesome_011.json


  (Results)

  ┌────────────────────────────────────────────────────────────────────────────────────────────────┐
  │ Tests:        2                                                                                │
  │ Passing:      2                                                                                │
  │ Failing:      0                                                                                │
  │ Pending:      0                                                                                │
  │ Skipped:      0                                                                                │
  │ Screenshots:  0                                                                                │
  │ Video:        true                                                                             │
  │ Duration:     9 seconds                                                                        │
  │ Spec Ran:     search-pokemon-with-bad-characters.spec.cy.ts                                    │
  └────────────────────────────────────────────────────────────────────────────────────────────────┘


  (Video)

  -  Started processing:  Compressing to 32 CRF
  -  Finished processing: \pokedex\cypress\videos     (1 second)
                          \search-pokemon-with-bad-characters.spec.cy.ts.mp4


────────────────────────────────────────────────────────────────────────────────────────────────────

  Running:  search-pokemon.spec.cy.ts                                                       (6 of 7)


  Buscar un pokemon en la barra de busqueda de pokemon
    √ Validar que se filtre el pokemon buscado (10010ms)
    √ Validar que sea seleccionado el pokemon buscado (43392ms)


  2 passing (53s)

[mochawesome] Report JSON saved to \pokedex\cypress\results\mochawesome_012.json


  (Results)

  ┌────────────────────────────────────────────────────────────────────────────────────────────────┐
  │ Tests:        2                                                                                │
  │ Passing:      2                                                                                │
  │ Failing:      0                                                                                │
  │ Pending:      0                                                                                │
  │ Skipped:      0                                                                                │
  │ Screenshots:  0                                                                                │
  │ Video:        true                                                                             │
  │ Duration:     53 seconds                                                                       │
  │ Spec Ran:     search-pokemon.spec.cy.ts                                                        │
  └────────────────────────────────────────────────────────────────────────────────────────────────┘


  (Video)

  -  Started processing:  Compressing to 32 CRF
  -  Finished processing: \pokedex\cypress\videos    (4 seconds)
                          \search-pokemon.spec.cy.ts.mp4


────────────────────────────────────────────────────────────────────────────────────────────────────

  Running:  shiny.spec.cy.ts                                                                (7 of 7)


  Activar el Sprite Shiny
    √ Validar que se active el Sprite Shiny (6818ms)
    √ Validar que se active el Sprite Shiny en el primer pokemon (12048ms)

  Desactivar el Sprite Shiny
    √ Validar que se desactive el Sprite Shiny (8640ms)
    √ Validar que se desactive el Sprite Shiny en el primer pokemon (13662ms)


  4 passing (41s)

[mochawesome] Report JSON saved to \pokedex\cypress\results\mochawesome_013.json


  (Results)

  ┌────────────────────────────────────────────────────────────────────────────────────────────────┐
  │ Tests:        4                                                                                │
  │ Passing:      4                                                                                │
  │ Failing:      0                                                                                │
  │ Pending:      0                                                                                │
  │ Skipped:      0                                                                                │
  │ Screenshots:  0                                                                                │
  │ Video:        true                                                                             │
  │ Duration:     41 seconds                                                                       │
  │ Spec Ran:     shiny.spec.cy.ts                                                                 │
  └────────────────────────────────────────────────────────────────────────────────────────────────┘


  (Video)

  -  Started processing:  Compressing to 32 CRF
  -  Finished processing: \pokedex\cypress\videos    (4 seconds)
                          \shiny.spec.cy.ts.mp4


====================================================================================================

  (Run Finished)


       Spec                                              Tests  Passing  Failing  Pending  Skipped  
  ┌────────────────────────────────────────────────────────────────────────────────────────────────┐
  │ √  dark-theme.spec.cy.ts                    00:15        2        2        -        -        - │
  ├────────────────────────────────────────────────────────────────────────────────────────────────┤
  │ √  order-pokemon-by-type.spec.cy.ts         00:36        3        3        -        -        - │
  ├────────────────────────────────────────────────────────────────────────────────────────────────┤
  │ √  order-pokemon.spec.cy.ts                 00:39        4        4        -        -        - │
  ├────────────────────────────────────────────────────────────────────────────────────────────────┤
  │ √  principal-page.spec.cy.ts                00:04        1        1        -        -        - │
  ├────────────────────────────────────────────────────────────────────────────────────────────────┤
  │ √  search-pokemon-with-bad-characters.      00:09        2        2        -        -        - │
  │    spec.cy.ts                                                                                  │
  ├────────────────────────────────────────────────────────────────────────────────────────────────┤
  │ √  search-pokemon.spec.cy.ts                00:53        2        2        -        -        - │
  ├────────────────────────────────────────────────────────────────────────────────────────────────┤
  │ √  shiny.spec.cy.ts                         00:41        4        4        -        -        - │
  └────────────────────────────────────────────────────────────────────────────────────────────────┘
    √  All specs passed!                        03:20       18       18        -        -        -  

```
**NOTA:** Como resultado de los test end to end se generarán videos en la carpeta **cypress/videos**

##### Videos de los tests End to End

![-----------------------------](/docs/img02.png)

**NOTA:** Como podemos ver estan los videos de cada **spec** de cypress.

**Ejemplo visual de video:**
![-----------------------------](/docs/img03.png)
**NOTA:** Como pueden ver está el titulo del spec, los escenarios y las acciones que va ejecutando.


## Despliegue 📦

_Agrega notas adicionales sobre como hacer deploy_

Para desplegar la aplicación tenemos las siguientes formas:

Por defecto
```shell
ng serve
```

La aplicación se desplegará exitosamente mostrando el siguiente resultado en consola:

```shell
✔ Browser application bundle generation complete.

Initial Chunk Files   | Names         |  Raw Size
vendor.js             | vendor        |   2.19 MB |
styles.css, styles.js | styles        | 441.41 kB |
polyfills.js          | polyfills     | 315.78 kB |
scripts.js            | scripts       | 146.72 kB |
main.js               | main          | 122.75 kB |
runtime.js            | runtime       |   6.51 kB |

                      | Initial Total |   3.20 MB

Build at: 2023-03-22T04:56:53.583Z - Hash: 428c760a5e28d775 - Time: 4699ms

** Angular Live Development Server is listening on localhost:4200, open your browser on http://localhost:4200/pokedex **


√ Compiled successfully.
```

Con express:

```shell
npm start
```
**NOTA:** Si se realiza un cambio a la aplicación no se reiniciará automáticamente.

La aplicación se desplegará exitosamente mostrando el siguiente resultado en consola:

```shell
Server is listening on http://localhost:4200/pokedex
```

## Construido con 🛠️

_Menciona las herramientas que utilizaste para crear tu proyecto_

### Dependecias 🗃️

| Paquete                           | Versión | Página NPM                                                      | Página Documentación                                            |
|-----------------------------------|---------|-----------------------------------------------------------------|-----------------------------------------------------------------|
| @angular/animations               | ^14.1.0 | https://www.npmjs.com/package/@angular/animations               |                                                                 |
| @angular/common                   | ^14.1.0 | https://www.npmjs.com/package/@angular/common                   |                                                                 |
| @angular/compiler                 | ^14.1.0 | https://www.npmjs.com/package/@angular/compiler                 |                                                                 |
| @angular/core                     | ^14.1.0 | https://www.npmjs.com/package/@angular/core                     |                                                                 |
| @angular/forms                    | ^14.1.0 | https://www.npmjs.com/package/@angular/forms                    |                                                                 |
| @angular/platform-browser         | ^14.1.0 | https://www.npmjs.com/package/@angular/platform-browser         |                                                                 |
| @angular/platform-browser-dynamic | ^14.1.0 | https://www.npmjs.com/package/@angular/platform-browser-dynamic |                                                                 |
| @angular/router                   | ^14.1.0 | https://www.npmjs.com/package/@angular/router                   |                                                                 |
| bootstrap                         | ^5.2.3  | https://www.npmjs.com/package/bootstrap                         | https://getbootstrap.com/docs/5.0/getting-started/introduction/ |
| express                           | ^4.18.1 | https://www.npmjs.com/package/express                           | https://expressjs.com/                                          |
| font-awesome                      | ^4.7.0  | https://www.npmjs.com/package/font-awesome                      | https://fontawesome.com/v4/                                     |
| jquery                            | ^3.6.3  | https://www.npmjs.com/package/jquery                            | https://api.jquery.com/                                         |
| path                              | ^0.12.7 | https://www.npmjs.com/package/path                              |                                                                 |
| rxjs                              | ~6.6.0  | https://www.npmjs.com/package/rxjs                              | https://rxjs.dev/api                                            |
| tslib                             | ^2.3.0  | https://www.npmjs.com/package/tslib                             |                                                                 |
| zone.js                           | ~0.11.4 | https://www.npmjs.com/package/zone.js                           |                                                                 |

### Depedencias de desarrollo 🗃️

| Paquete                       | Versión   | Página NPM                                                  | Página Documentación                                                        |
|-------------------------------|-----------|-------------------------------------------------------------|-----------------------------------------------------------------------------|
| @angular-devkit/build-angular | ^14.1.2   | https://www.npmjs.com/package/@angular-devkit/build-angular |                                                                             |
| @angular/cli                  | ~14.1.2   | https://www.npmjs.com/package/@angular/cli                  |                                                                             |
| @angular/compiler-cli         | ^14.1.0   | https://www.npmjs.com/package/@angular/compiler-cli         |                                                                             |
| @cypress/schematic            | ^2.0.2    | https://www.npmjs.com/package/@cypress/schematic            |                                                                             |
| @types/jasmine                | ~4.0.0    | https://www.npmjs.com/package/@types/jasmine                |                                                                             |
| cypress                       | ^10.8.0   | https://www.npmjs.com/package/cypress                       | https://www.cypress.io/                                                     |
| jasmine-core                  | ~4.2.0    | https://www.npmjs.com/package/jasmine-core                  |                                                                             |
| karma                         | ~6.4.0    | https://www.npmjs.com/package/karma                         |                                                                             |
| karma-chrome-launcher         | ~3.1.0    | https://www.npmjs.com/package/karma-chrome-launcher         |                                                                             |
| karma-coverage                | ~2.2.0    | https://www.npmjs.com/package/karma-coverage                |                                                                             |
| karma-jasmine                 | ~5.1.0    | https://www.npmjs.com/package/karma-jasmine                 |                                                                             |
| karma-jasmine-html-reporter   | ~2.0.0    | https://www.npmjs.com/package/karma-jasmine-html-reporter   |                                                                             |
| karma-sabarivka-reporter      | ^3.3.1    | https://www.npmjs.com/package/karma-sabarivka-reporter      |                                                                             |
| mocha                         | ^10.0.0   | https://www.npmjs.com/package/mocha                         |                                                                             |
| mochawesome                   | ^7.1.3    | https://www.npmjs.com/package/mochawesome                   |                                                                             |
| mochawesome-merge             | ^4.2.1    | https://www.npmjs.com/package/mochawesome-merge             |                                                                             |
| mochawesome-report-generator  | ^6.2.0    | https://www.npmjs.com/package/mochawesome-report-generator  |                                                                             |
| typescript                    | ~4.7.2    | https://www.npmjs.com/package/typescript                    |                                                                             |

## Contribuyendo 🤝

Por favor lee el [CONTRIBUTING](CONTRIBUTING.md) para detalles de nuestro código de conducta, y el proceso para enviarnos pull requests.

## Wiki 📖

Puedes encontrar mucho más de cómo utilizar este proyecto en nuestra [Wiki](https://github.com/byron-villegas/pokedex/wiki)

## Medallas 🥇

Usamos [Shields](https://shields.io/) para la generación de las medallas.

## Versionado 📌

Usamos [SemVer](https://semver.org/) para el versionado. Para todas las versiones disponibles, mira los [tags en este repositorio](https://github.com/byron-villegas/pokedex/tags).

## Autores ✒️

_Menciona a todos aquellos que ayudaron a levantar el proyecto desde sus inicios_

- **Byron Villegas Moya** - *Desarrollador* - [byron-villegas](https://github.com/byron-villegas)

También puedes mirar la lista de todos los [contribuyentes](https://github.com/byron-villegas/pokedex/graphs/contributors) quíenes han participado en este proyecto. 

## Licencia 📄

Este proyecto está bajo la Licencia (MIT) - mira el archivo [LICENSE](LICENSE) para detalles
