# Proyecto 1 - Bastionado de redes G3

## Grupo 3
Fran, Paula y Judit

## Descripción
Proyecto de análisis y mejora de la seguridad de la infraestructura de red de una gestoría ficticia.

## 🌐 Web del proyecto

**https://fj-po.github.io/Proyecto-1--Bastionado-de-redes-G3/**

(se publica sola con GitHub Actions al hacer push a `main`; ver "Publicar en GitHub Pages")

## Organización del repositorio

- [diagnostico.md](./diagnostico.md): situación inicial de la empresa (redes, dispositivos, configuraciones...)
- [propuesta.md](./propuesta.md): medidas de seguridad propuestas.
- [responsables.md](./responsables.md): reparto de tareas del grupo.
- [verificacion.md](./verificacion.md): comprobaciones de las medidas.
- [decisiones.md](./decisiones.md): decisiones tomadas durante el proyecto.
- [aprendizaje.md](./aprendizaje.md): aprendizajes y dificultades.
- [Inventario rotativo y plan de contingencia.md](./Inventario%20rotativo%20y%20plan%20de%20contingencia.md): inventario y actuación ante incidencias.

## La capa de presentación

La web y las diapositivas se generan a partir de los Markdown de arriba.

| Carpeta | Qué es | Cómo se ve en local |
|---|---|---|
| `web/` | La landing (React + Vite): problema, red antes/después, las medidas, el mapa riesgo/molestia y los riesgos que quedan abiertos | `cd web && npm install && npm run dev` |
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
