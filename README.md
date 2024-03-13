# Run project

npm install
ng serve -o

## 1 - Nuevo control flow de Angular 17

Nueva forma de estructuración de los templates

- Se discrimina el lenguaje de angular del HTML, ya no está basado en directivas.
- Mejora la perfornmance.
- Bundles más pequeños.
- Mejor type safty.
- Sencillo de visualizar.

## 2 - Signals

Nueva reactividad de angular. Angular Signals es un sistema que rastrea de forma granular cómo y dónde se usa el estado en una aplicación, lo que permite que el marco optimice las actualizaciones de renderizado.

- La actualización de las variables de estado ya no dependen de zone.js
- Mayor perfonmance.
- Se accede a las variables como getters.
- Puntos de contacto con el useState de React.
- Los valores de las variables no se asignan de forma directa sino a través de métodos (set, update)
- Oyente o detector de cambios:

  - effect(): Es ejecutado cuando uno o más valores de un signal han cambiado.
    Es eliminado cuando el componente es eliminado,
  - computed(): Un computed signal es un deribado de otro signal, por ejemplo, para obtener un signal resultado del cálculo con otro.

## 3 - NGRX Signals

Biblioteca que permite el manejo glboal del estado de una aplicación utilizando las signals nativas de angular.
NGRX Signals es más claro, declarativo, simple y flexible que NGRX Store.

Principales caractertísticas:

- Simple e intuitivo.
- Liviano y eficiente.
- Declarativo.
- Modular, extensible y escalable.
- Dictaminado, pero flexible.
- Seguridad de tipos.
