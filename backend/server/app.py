from flask_restx import Resource
from flask_cors import CORS
from flask.json import jsonify
from flask import send_from_directory

import dataForm 
import visualizations 
from swagger import api, address, graph1, housing_pred, app

from dotenv import load_dotenv
import os
import numpy as np
import pickle5 as pickle
import requests
import urllib.parse
import json

load_dotenv()

# Get pickled ml model
model = pickle.load(open('./model/austin_91k.pkl', 'rb'))

# Set CORS
if(os.getenv('FLASK_ENV') =='dev'):
  CORS(app, origins=[os.getenv('CLIENT_URL')])
else:
  CORS(app)

# API Routes
@api.route('/api')
class Home(Resource):
  def get(self):
    return "Welcome to the Housing Price Predicting ML API"


@api.route('/api/latlong',  methods=['POST'])
class Latitude_Longitude(Resource):
  @api.expect(address)
  def post(self):
    '''Takes an address string as input and queries 3rd party api to obtain latitude and longitude'''
    # get payload from request or swagger
    street_address = api.payload if api.payload else address.parse_args()
    params = urllib.parse.urlencode({
    'access_key': os.getenv('API_KEY'),
    'query': street_address['street'],
    'region': os.getenv('REGION'),
    'limit': 1,
    })

    try:
      url = f"{os.getenv('GEO_URL')}{params}"
      #some addresses are returning a zipcode way different from the original address
      data = requests.get(url)
      json_data = json.loads(data.text)
      if "error" in json_data:
        return jsonify({
        "status": False,
        "error": json_data['error']['context']['query']['type']
      })
      response = {
         "latitude": json_data['data'][0]['latitude'],
          "longitude": json_data['data'][0]['longitude'],
          "zipcode":json_data['data'][0]['postal_code'],
          "label": json_data['data'][0]['label'],
      }
      return jsonify({ 
        "status": True,
        "data": response
      })
        
    except Exception as error:
      return jsonify({
        "status": False,
        "error": str(error)
      })
   

@api.route('/api/predict', methods=['POST'])
class Predict_Housing(Resource):
  @api.expect(housing_pred)
  def post(self):
    '''Takes attributes for the machine learning model to compute the prediction'''
    try:
      parsed = dataForm.parseData(api.payload)
      pred = model.predict(parsed)
      response = jsonify({ 
        "statusCode": 200,
        "status": True,
        "result": int(np.ceil(pred[0]))
      })
      return response
    
    except Exception as error:
      return jsonify({
        "statusCode": 500,
        "status": "Error making prediction",
        "result": str(error)
      })

@api.route('/api/graph/yearbuilt', methods=['POST', 'GET'])
class Year_Built(Resource):
  def get(self):
    '''Returns a list of data points for graph 1'''
    try:
      data = visualizations.getYearBuiltCount()
      response = jsonify({ 
        "statusCode": 200,
        "status": True,
        "result": data
      })
      return response

    except Exception as error:
      return jsonify({
        "statusCode": 500,
        "status": "Error making prediction",
        "result": str(error)
      })

  @api.expect(graph1)
  def post(self):
    '''Returns a list of data points for graph 2'''
    try:
      # pass args from swagger or request body
      data = visualizations.getSalesByHouseType(api.payload)
      response = jsonify({ 
        "statusCode": 200,
        "status": True,
        "result": data
      })
      return response
    
    except Exception as error:
      return jsonify({
        "statusCode": 500,
        "status": "Error making prediction",
        "result": str(error)
      })

if __name__ == '__main__':
    print("Starting Python Flask Server For Home Price Prediction...")
    app.run()
