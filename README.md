# Gulp static web starter kit

Jaye's personal starter kit for gulp/webpack-powered static web projects.

Includes:

- Lints and transpiles javascript with Babel and Webpack
- Compiles sass
- Compresses images
- Hot reloads

## Getting started

Clone the repo, run `npm install` and then use one of the following commands:

- `npm run dev` to start a hot reload server and watch all files for changes
- `npm run build` to create a production build in the `/dist` folder
- `npm run lint` to just check for JS style guide violations

## Putting it on the web

Comes with a `netlify.toml` file for faster CI/CD deployment to [Netlify](http://netlify.com).