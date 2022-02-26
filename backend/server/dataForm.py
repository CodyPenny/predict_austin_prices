def parseData(obj):
  '''This function takes the input object and aligns the values to the matching attribute for model consumption'''
  # initiate list
  row = [0] * 20

  # Mimic hot encoder
  if(obj["homeType"] == "Single Family"):
    row[0] = 0
    row[1] = 1
    row[2] = 0
  elif(obj["homeType"] == "Condo"):
    row[0] = 1
    row[1] = 0
    row[2] = 0
  else:
    row[0] = 0
    row[1] = 0
    row[2] = 1

  row[3] = int(obj["zipcode"])
  row[4] = obj["latitude"]
  row[5] = obj["longitude"]
  row[6] = obj["garageSpaces"]
  row[7] = obj["hasAssociation"]
  row[8] = obj["hasCooling"]
  row[9] = obj["hasGarage"]
  row[10] = obj["hasHeating"]
  row[11] = obj["hasSpa"]
  row[12] = obj["hasView"]
  row[13] = obj["parkingSpaces"]
  row[14] = obj["yearBuilt"]
  row[15] = obj["lotSizeSqFt"]
  row[16] = obj["livingAreaSqFt"]
  row[17] = obj["numOfBathrooms"]
  row[18] = obj["numOfBedrooms"]
  row[19] = obj["numOfStories"]
  return [row]
