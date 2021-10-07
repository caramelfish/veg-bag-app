# Veg-Bag-App

Veg Bag App is a fullstack web application for the basic administration duties of a local business. This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app) for the front-end with a Django Rest Framework API serving for the back-end. The application provides full CRUD operations (Create, Read, Update, Delete) for customers, products, subscriptions and orders, as well as the ability to generate orders.

## Live Deployment

The application is currently hosted a Heroku, a free cloud based platform-as-a-service which provides a 'Dyno' (container) for running applications. It can be found [here](https://veg-bag.herokuapp.com/), or visit the link yourself: https://veg-bag.herokuapp.com/.

## Local Deployment

To run the application in a localised development environment to have full control over functionality and administrative functions, the following actions are required.

### Dependencies:

It is recommended to perform the following installations in a virtual environment so your local machine is not cluttered with dependencies. All commands should be invoked in the root application directory.

#### If the pipenv package is installed and a virtual environment is not yet active:

#### `pipenv install`

Activates a virtual environment and installs dependencies from the Pipfile.

#### If the pipenv package is installed and a virtual environment is already activated:

#### `pipenv sync`

Installs dependencies from the Pipfile.

#### If the pipenv package is not installed:

#### `pip install -r requirements.txt`

Installs dependencies from requirements.txt.

### To invoke the front-end view:

With a terminal open in the root application directory, run the following command:

### `npm start`

This runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will auto-reload if you make edits to the code.

### To invoke the back-end API:

With a terminal open in the root project directory, perform the following:

#### To ensure the database is initiated:

#### 1. `python manage.py makemigrations`

#### 2. `python manage.py migrate`

#### To create an admin account (required):

#### 3. `python manage.py createsuperuser`

Follow the prompts for username and password.

#### Begin the server:

#### 4. `python manage.py runserver`

This runs the back-end in development mode. \
Open [http://127.0.0.1:8000/admin](http://127.0.0.1:8000/admin) and login with the admin account you have created to explore the API in more detail.

## Directories

The directory is structured as follows:

- **api**: the Django application which provides functionality for HTTP interactions, CRUD operations, models, serializers, etc.
- **backend**: the Django default directory which stores settings, URL routing, wsgi, etc.
- **node_modules**: JavaScript (and React) dependencies.
- **public**: the default view for the front-end with index.html.
- **src**: the React code which is injected into index.html, containing components and views and logic for interacting with the API.
- **staticfiles**: in production this is populated with all of the static files generated from `npm build`. In development this is not required so is left empty.
