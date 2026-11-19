# Proyecto 1 · Bastionado de redes — Grupo 3

Bastionado de la red de la gestoría **Mareas Asesores** («La maldición de la gestoría»),
del módulo de Bastionado de Redes y Sistemas. El trabajo (diagnóstico, propuesta, decisiones,
verificación y aprendizaje) está en los ficheros Markdown de este repositorio; la web y las
diapositivas se generan a partir de ellos.

## 🌐 Web del proyecto

**https://fj-po.github.io/Proyecto-1--Bastionado-de-redes-G3/**

(se publica sola con GitHub Actions al hacer push a `main`; ver abajo)

## El trabajo (Markdown)

| Fichero | Qué contiene |
|---|---|
| [`diagnostico.md`](diagnostico.md) | Cómo estaba la red: equipos, direcciones, servidor, puestos y exterior |
| [`propuesta.md`](propuesta.md) | La red nueva (VLANs), las 8 medidas, las molestias y los descartes |
| [`decisiones.md`](decisiones.md) | Decisiones tomadas |
| [`verificacion.md`](verificacion.md) | Comprobación de cada medida (antes/después) |
| [`responsables.md`](responsables.md) | Quién implanta y comprueba cada medida, y su estado |
| [`Inventario rotativo y plan de contingencia.md`](Inventario%20rotativo%20y%20plan%20de%20contingencia.md) | Medida 6 |
| [`aprendizaje.md`](aprendizaje.md) | Lo aprendido |

## La capa de presentación

| Carpeta | Qué es | Cómo se ve en local |
|---|---|---|
| `web/` | La landing (React + Vite): problema, red antes/después, las medidas y el mapa riesgo/molestia | `cd web && npm install && npm run dev` |
| `diapositivas/` | La presentación para la jefa (Beatdeck): un clic = una idea | `cd diapositivas && npm install && npm run dev` |

La landing enlaza a las diapositivas. Al publicarse, las diapositivas quedan en
`…/Proyecto-1--Bastionado-de-redes-G3/diapositivas/`.

> La barra de **Agentation** (para dar indicaciones sobre el diseño) solo aparece en
> `npm run dev`, nunca en la versión publicada.

## Publicar en GitHub Pages

El workflow [`.github/workflows/deploy-pages.yml`](.github/workflows/deploy-pages.yml) compila
la web y las diapositivas y las publica juntas en cada push a `main`.

1. En GitHub: **Settings → Pages → Build and deployment → Source → GitHub Actions**.
2. Haz push a `main`. En la pestaña **Actions** se ve cómo compila y publica.
3. Cuando termine en verde, la web queda en la URL de arriba.

## El equipo

Grupo 3 — Fran, Judit y Paula.
