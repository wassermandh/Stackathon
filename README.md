# Map My Pics:

http://mapmypics.herokuapp.com

Map my pics is a public, map-based photo sharing application. Users can login with a custom username / password or using OAuth, and upload a picture to the site. Once the upload is complete, the user is redirected to a page where they can add additional information, such as the title, caption, location, date taken, and device information. If some of this info is available via EXIF data, it will be autofilled in the form. After completing this step, users can click on "home" to view their picture on a map. Users can also navigate to the "see my pics" section to edit or remove their photos. 

## Technologies:

Visualization:
React-map-gl
Material-UI

Data APIs:
Mapbox

Storing/accessing data:
Postgres
Sequelize
Cloudinary
EXIF-Parser

Front-end:
React
React-Redux

## Running the app

Fork and clone the repository

Run npm install

Create two postgres databases: pic_map and pic_map-test

Run _npm test_ to run our unit tests

Run _npm run seed_ followed by _npm run seed-center_ to seed the database

_npm run start-dev_ runs the app in development mode. Open http://localhost:8080 to view it in the browser. Errors will be shown in your browser and code editor

You can view the deployed version of the app on: http://mapmypics.herokuapp.com

Please note that you will need to first configure a new application with Heroku if you would like to launch a clone of this repository.
