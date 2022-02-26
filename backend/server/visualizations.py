import pandas as pd

# Import dataframe
df = pd.read_pickle('./model/houses_3M_df.pkl')

def getSalesByHouseType(conditions):
  '''This function takes an object of conditions and returns the matching prices and year built'''
  #print('conditions', conditions)
  matches = df[(df["homeType"] == conditions["homeType"])  & (df["numOfBedrooms"] == conditions["numOfBedrooms"]) & (df["numOfBathrooms"] == conditions["numOfBathrooms"])]
  return matches[["yearBuilt", "price"]].to_json(orient='values') 


def getYearBuiltCount():
  '''This function groups houses by year built and returns its count. It omits counts less than 10'''
  yearBuiltNames = df["yearBuilt"].value_counts().sort_index(ascending=True).loc[lambda x: x > 10].index.tolist()
  countYrBuilt = df["yearBuilt"].value_counts().sort_index(ascending=True).loc[lambda x: x > 10].tolist()
  return list(zip(yearBuiltNames, countYrBuilt))
