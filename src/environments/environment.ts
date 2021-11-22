// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  // base: 'https://sisaprama-api.herokuapp.com/api',
  // base_auth: 'https://sisaprama-api.herokuapp.com/api',
  base_auth: 'http://localhost:8000/api/auth',
  base: 'http://localhost:8000/api',
  base_img: 'http://localhost:8000/img/',
  YOUR_GOOGLE_MAPS_API_KEY:'AIzaSyCcUogyIWrlCy1HlQTVMKe3j0Yr7l-gHD4'
};
