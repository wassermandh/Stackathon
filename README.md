# Map My Pics:

http://mapmypics.herokuapp.com

Map my pics is a public, map-based photo sharing application. 

## Navigating the site 

The home page is a map with all the currently uploaded photos posted. Users can login or signup with a custom username / password or using OAuth, and upload a picture to the site. Once the upload is complete, the user is redirected to a page where they can add additional information, such as the picture's title, caption, location, date, and device information. If some of this info is available via EXIF data, it will be autofilled in the form. After completing this step, users can click on "home" to view their picture on the map. Users can also navigate to the "see my pics" section to edit or remove their photos. 

## Technologies:

Visualization:<br />
React-map-gl <br />
Material-UI<br />

Data APIs:<br />
Mapbox<br />

Storing/accessing data:<br />
Postgres<br />
Sequelize<br />
Cloudinary<br />
EXIF-Parser<br />

Front-end:<br />
React<br />
React-Redux<br />

## Running the app

Fork and clone the repository

Run npm install

Create two postgres databases: pic_map and pic_map-test

Run _npm test_ to run our unit tests

Run _npm run seed_ followed by _npm run seed-center_ to seed the database

_npm run start-dev_ runs the app in development mode. Open http://localhost:8080 to view it in the browser. Errors will be shown in your browser and code editor

You can view the deployed version of the app on: http://mapmypics.herokuapp.com

Please note that you will need to first configure a new application with Heroku if you would like to launch a clone of this repository.
