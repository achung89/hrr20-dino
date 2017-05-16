# hrr20-dino

## Getting started

### Running in development mode:

* Navigate to the root of the project.
* Run `npm install`.
* Run `gulp`.

In this mode, nodemon runs the server while browsersync runs the browser.  Changes to client-side files including stylesheets triggers both a rebuild and a refresh of the browser.  Changes to server side files triggers a nodemon refresh. 

### Building for production:

* `gulp production` *or* run `gulp` while `NODE_ENV` is set to `production`.
* `npm start` to launch the server.

Production builds include minified app and vendor JavaScript along with minified CSS.  Reference names to these dependencies change automatically in index.html.

### Testing

* run `gulp test`

## Architecture overview

See [the Dino project wiki](https://github.com/hrr20-dino/hrr20-dino/wiki) for more detailed information.

* [React SPA](https://facebook.github.io/react/)
* [React Router](https://github.com/ReactTraining/react-router)
* [Material UI](http://www.material-ui.com/#/)
* [Sass stylesheets](http://sass-lang.com/)
* [Axios](https://www.npmjs.com/package/axios)
* [Flux state manager](https://facebook.github.io/flux/docs/overview.html#content)
* [Postgres database](https://www.postgresql.org/)
* [Sequelize](http://docs.sequelizejs.com/en/v3/)
* [Express server](http://expressjs.com/)

## Opportunities for extension

* Users can share routines.
* Easy integration with Moment.js because our database is structured to be smart about time.
* Users can provide encouragement or feedback to other users.
* Live feed and status view.
* React Router makes it easy for a SPA to use browser locations, history and the back button.
* The client-side datastore is easy to customize when making data schema changes.
* Support for connection to other services like Facebook, Twitter, Instagram.
* We've created hooks to easily incorporate authentication.

## Application Structure Reference:

### Component Hierarchy
- MyRoutines
    - MyRoutinesNav
- CreateRoutine
    - CreateRoutineNav
- Routine
    - RoutineNav
- CreateTask
    - CreateTaskNav
- Task
    - TaskNav

### Flux components:

**Stores:**

- UserStore 
- RoutineStore 
- TaskStore 

**Actions:**

- UserActions
    - `.get([params])`
    - `.add([params])`
    - `.remove(id)`
    - `.update(id, data)`
- RoutineActions
    - `.get([params])`
    - `.add([params])`
    - `.remove(id)`
    - `.update(id, data)`
- TaskActions
    - `.get([params])`
    - `.add([params])`
    - `.remove(id)`
    - `.update(id, data)`
