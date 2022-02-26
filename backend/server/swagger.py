from flask_restx import Api, fields
from flask import Flask

# initiate Flask
app = Flask(__name__, static_folder="/static")

# initiate swagger documentation
api = Api(app, doc = '/docs', title='Housing Price API', description="Predicts housing prices for homes in Austin, TX")

# restx - define parameters
address = api.parser()
address.add_argument('street', type=str, help='Takes an address string. Must end with comma', location='form')

graph1 = api.model('Graph 1', {
  'homeType': fields.String(enum=['Single Family', 'Condo']),
  'yearBuilt': fields.Integer,
  'numOfBedrooms': fields.Integer(min=1, max=8),
  'numOfBathrooms': fields. Integer(min=1, max=8)
})

housing_pred = api.model('Prediction', {
  'latitude': fields.Float( description="e.g. 30.354618"),
  'longitude': fields.Float( description="e.g. -97.752696"),
  'zipcode': fields.String( description="e.g. 78731"),
  'homeType': fields.String( description="Single Family, Condo, Townhouse"),
  'parkingSpaces': fields.Integer( min=0, max=8),
  'garageSpaces': fields.Integer( min=0, max=8),
  'numOfBathrooms': fields.Integer( min=1, max=8),
  'numOfBedrooms': fields.Integer( min=0, max=8),
  'numOfStories': fields.Integer( min=1, max=8),
  'lotSizeSqFt': fields.Integer,
  'livingAreaSqFt': fields.Integer,
  'yearBuilt': fields.Integer,
  'hasAssociation': fields.Boolean,
  'hasCooling': fields.Boolean,
  'hasGarage': fields.Boolean,
  'hasSpa': fields.Boolean,
  'hasView': fields.Boolean,
  'hasHeating': fields.Boolean
}) 
