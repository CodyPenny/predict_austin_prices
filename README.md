# Austin Real Estate Price Predictor

***

## Introduction

15,175 listings from the Austin, TX area were sourced from a data science platform, cleaned, evaluated, and preprocessed to build a machine learning model that predicts the value of the property. The dataset is then trained and fitted to a model which is integrated to the backend of the web application.

A listing can have an excessive amount of detail unnecessary for the model. These are removed while any nulls, duplicates, and outliers are also evaluated. Real estate prices are also appreciated to the current time scale.

Once the dataset is ready, an 80/20 training split is applied and a standard logistic regression model is used for the prediction.

## Project Description

The data frame form of the dataset is exported as a pickle file and the predictive model is built using Python's sci-kit learn library. 4 API endpoints are built with Python one of which queries a third-party geolocation API to obtain the street address's latitude and longitude. The second API accepts the characteristics of the property and the third and fourth API returns data for the UI data visualization.

For deployment, Nginx is used as a reverse proxy and uWSGI as the application server in AWS EC2.

## Technologies

- Python's sci-kit learn
- Flask
- Geolocation
- Swagger
- React
- Semantic UI
- Styled Components
- D3
- AWS
- Nginx
- uWSGI

## Backend Setup

To run this project, use the configuration file requirements.txt or the Pipfile to install specified packages with the specified version.

    pipenv install --dev


Pipenv uses pip and virtualenv underneath. Activate the virtual environment:

    pipenv run python server/app.py

## Frontend Setup

Install specified packages

    npm i

Run the project

    npm run dev-server

## Features
