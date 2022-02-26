# Responsive Austin Real Estate Price Predictor

***

## Introduction

15,175 listings from the Austin, TX area were sourced from a data science platform, then cleaned, evaluated, and preprocessed to build a machine learning model which predicts the value of the property. The dataset was then trained and fitted to a model which was next integrated to the backend of the web application.

A listing can have an excessive amount of detail unnecessary for the model. These were removed while nulls, duplicates, and outliers were also evaluated. Real estate prices were also appreciated to the current time scale to give a more accurate prediction.

Once the dataset is ready, an 80/20 training split was applied and a standard logistic regression model was used for the prediction.

## Project Description

The data frame form of the dataset was exported as a pickle file and the predictive model was built using Python's sci-kit learn library. 4 API endpoints were built with Python, one of which queries a third-party geolocation API to obtain the street address's latitude, longitude, and zipcode. The second API accepts the characteristics of the property and the third and fourth API returns the data for the UI visualization.

For deployment, Nginx was used as a reverse proxy and uWSGI as the application server in AWS EC2.

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

1.The app accepts an address string and validates the address with geolocation API integration. It uses the validated zipcode in its computation

<img width="535" alt="Screen Shot 2022-02-26 at 1 58 37 AM" src="https://user-images.githubusercontent.com/53372490/155838836-aefcb08d-3d8f-4f4e-aa2c-5fd8f21e581a.png">

Here are starter addresses that can be used:

- 7905 Bannock Ln
- 11905 Glenda Ct

(The app uses the geocoding API of positionstack.com)

2. Uses a multi-step form process to collect details about the property with input validation checks along the way.

![screen](https://user-images.githubusercontent.com/53372490/155858257-a9b7d25e-3a15-4f02-84bf-3cca5c168bfa.jpg)

![screen](https://user-images.githubusercontent.com/53372490/155858177-c77db82b-3912-450e-9f8e-d648afb7084a.jpg)

3. The collected data runs through the model and computes a prediction.

![screen](https://user-images.githubusercontent.com/53372490/155858474-4f13cc37-9029-43ed-89cb-a8ab9aaa88ec.jpg)

