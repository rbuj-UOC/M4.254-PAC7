# Exercici 1 – Preguntes teòriques (3 punts)

## Què és i com funciona l'element `<RouterLink>` en Angular?

La directiva [RouterLink](https://angular.dev/api/router/RouterLink) fa que l'element tingui un enllaç a la navegació, carregant un o més components en una o més ubicacions `<router-outlet>`.

Exemple:
```TypeScript
<h1>{{title}}</h1>
<nav>
  <a routerLink="/dashboard">Dashboard</a>
  <a routerLink="/heroes">Heroes</a>
</nav>
<router-outlet></router-outlet>
```

## Explica la diferència entre `routerLink` i `routerLinkActive`. Quines altres directives es poden utilitzar amb el `router` en Angular?

La directiva `routerLink` defineix el destí de l'enllaç, mentre que la directiva `routerLinkActive` permet definir una regla CSS si actualment estem a la ruta del `routerLink`.

Exemple:
```html
<a routerLink="/user/bob" routerLinkActive="active-link">Bob</a>
```
Quan la URL sigui '/user' o '/user/bob', la classe `active-link` serà afegida a l'etiqueta `a`. Si la URL canvia, s'eliminarà la classe.

Si només es vol afegir la classe quan coincideixi exactament amb la URL es pot passar el paràmetre `exact` igual a `true` a la directiva `routerLinkActive`:
```html
<a routerLink="/user/bob" routerLinkActive="active-link" [routerLinkActiveOptions]="{exact:true}">Bob</a>
```

Es poden utilitzar diverses classe CSS:
```html
<a routerLink="/user/bob" routerLinkActive="class1 class2">Bob</a>
<a routerLink="/user/bob" [routerLinkActive]="['class1', 'class2']">Bob</a>
```

Es pot assignar la instància `RouterLinkActive` a una variable de plantilla i comprovar directament l'estat `isActive`.
```html
<a routerLink="/user/bob" routerLinkActive #rla="routerLinkActive">
  Bob {{ rla.isActive ? '(already open)' : ''}}
</a>

```

Es pot utilitzar la directiva `RouterLinkActive` a un ancestre de `RouterLink`. En l'exemple de sota, s'establirà la classe `active-link` a l'etiqueta `div` si la URL és '/user/jim' o '/user/bob'.


```html
<div routerLinkActive="active-link" [routerLinkActiveOptions]="{exact: true}">
  <a routerLink="/user/jim">Jim</a>
  <a routerLink="/user/bob">Bob</a>
</div>
```

## Descriu el servei `ActivatedRouteSnapshot`. Com s'utilitza i en quins casos és útil?

`ActivatedRouteSnapshot` conté la informació quant a una ruta associada a un component carregat en un outlet en un moment determinat.

```TypeScript
class ActivatedRouteSnapshot {
  routeConfig: Route | null
  title: string | undefined
  url: UrlSegment[]
  params: Params
  queryParams: Params
  fragment: string | null
  data: Data
  outlet: string
  component: Type<any> | null
  root: ActivatedRouteSnapshot
  parent: ActivatedRouteSnapshot | null
  firstChild: ActivatedRouteSnapshot | null
  children: ActivatedRouteSnapshot[]
  pathFromRoot: ActivatedRouteSnapshot[]
  paramMap: ParamMap
  queryParamMap: ParamMap
  toString(): string
}
```

En el següent exemple s'inicialitza un components amb informació de la ruta extreta de la instantània del node arrel en el moment de la creació.

```TypeScript
@Component({templateUrl:'./my-component.html'})
class MyComponent {
  constructor(route: ActivatedRoute) {
    const id: string = route.snapshot.params.id;
    const url: string = route.snapshot.url.join('');
    const user = route.snapshot.data.user;
  }
}
```
Per exemple si mostrem el detall d'un producte utilitzant l'identificador per seleccionar el producte. L'encaminador reutilitza un component i no crea una `ActivatedRoute` nova, hi haurà dues versions d'`ActivatedRouteSnapshot` per a la mateixa `ActivatedRoute`.

Per exemple, si tenim la configuració d'encaminament:
```TypeScript
path: 'detail/:id',
component: MyComponent
```

Si naveguem a:
```
/detall/1
```

Tindrem el paràmetre a `activatedRoute.snapshot.params.id` a `1`

Si naveguem a:
```
/detall/2
```

Tindrem el paràmetre a `activatedRoute.snapshot.params.id` a `2`

```TypeScript
export class MyComponent {
  constructor(r: ActivatedRoute) {    
    r.url.subscribe((u) => {
      console.log(r.snapshot.params.id);
  });
...
}
```

## Què és la càrrega `Lazy` dels mòduls d'Angular? Com es configura en Angular la càrrega Lazy?

La càrrega mandrosa de mòduls consisteix en carregar el mínim a l'inici i ajornar la càrrega de tota la resta quan sigui necessari. S'aconsegueix mitjançant l'encaminament amb rutes secundàries:

1. En comptes de definir totes les rutes en un sol lloc, dividim l'aplicació en mòduls més petits, cadascun amb les seves rutes definides dins d'unitats autònomes.

2. Els components respectius ara es registren només al nivell d'aquests submòduls, i no al mòdul principal de l'aplicació.

3. Enregistrem totes aquestes rutes com a rutes secundàries en cada mòdul de forma individual.

4. A nivell d'aplicació, es canvia l'encaminament per apuntar a certes subrutes del mòdul nou, en comptes de les rutes individuals.

## Compara les diferències entre `CanDeactivate` i `CanActivate` guards en Angular. Proporciona exemples de quan s’utilitzaria cadascuna

`CanActivate` protegeix les rutes abans d'accedir-hi. Exemple: `CanActivate` és útil per establir que una pàgina requereix autenticació per accedir-hi. 

`CanDeactivate` protegeix les rutes quan l'usuari intenta abandonar-les. Exemple: `CanDeactivate` és útil quan es vol evitar que l'usuari perdi dades accidentalment o que faci alguna acció abans de deixar la pàgina.

## Què és/per a què són útils els `middlewares` en el context d'Angular? On estàs utilitzant `middlewares` en la nostra aplicació?

A Angular, els interceptors són com `middlewares` que permeten interceptar i modificar sol·licituds o respostes HTTP abans que s'enviïn o rebin des del servidor.

- `AuthInterceptor` s'utilitza per enviar el testimoni d'autenticació si existeix amb cada sol·licitud.