[![Netlify Status](https://api.netlify.com/api/v1/badges/16a6495a-f68b-491a-95f4-7bd683ca6206/deploy-status)](https://app.netlify.com/sites/pedantic-beaver-72768a/deploys)

# Edinburgh Tailored Tours

Includes:

- Lints and transpiles javascript with Babel and Webpack
- Compiles sass
- Compresses images
- Hot reloads
- Nunjucks templating, passing in dynamic data specified in the `content.yml` file

## Getting started

Clone the repo, run `npm install` and then use one of the following commands:

- `npm run dev` to start a hot reload server and watch all files for changes
- `npm run build` to create a production build in the `/dist` folder
- `npm run lint` to just check for JS style guide violations

## Putting it on the web

Comes with a `netlify.toml` file for faster CI/CD deployment to [Netlify](http://netlify.com).
