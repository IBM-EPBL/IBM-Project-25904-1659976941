from flask import Flask, render_template, request
import csv, pickle
import pandas as pd
import joblib
import numpy as np

import requests

# NOTE: you must manually set API_KEY below using information retrieved from your IBM Cloud account.
API_KEY = "I6vmW4nmyS35HD92jVtP81M_Ltw4dt5YoSFGBSpTvvSJ"
token_response = requests.post('https://iam.cloud.ibm.com/identity/token', data={"apikey":
 API_KEY, "grant_type": 'urn:ibm:params:oauth:grant-type:apikey'})
mltoken = token_response.json()["access_token"]

header = {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + mltoken}

app = Flask(__name__)

@app.route('/')
def home():
	return render_template('Flightdelay.html')

@app.route('/result', methods = ['POST'])
def predict():
	fl_num = int(request.form.get('fno'))
	month = int(request.form.get('month'))
	dayofmonth = int(request.form.get('daym'))
	dayofweek = int(request.form.get('dayw'))
	sdeptime = request.form.get('sdt')
	adeptime = request.form.get('adt')
	arrtime = int(request.form.get('sat'))
	depdelay = int(adeptime) - int(sdeptime)
	inputs = list()
	inputs.append(fl_num)
	inputs.append(month)
	inputs.append(dayofmonth)
	inputs.append(dayofweek)
	if (depdelay < 15):
		inputs.append(0)
	else:
		inputs.append(1)
	inputs.append(arrtime)
	origin = str(request.form.get("org"))
	dest = str(request.form.get("dest"))
	if(origin=="ATL"):
		a=[1,0,0,0,0]
		inputs.extend(a)
	elif(origin=="DTW"):
		a=[0,1,0,0,0]
		inputs.extend(a)
	elif(origin=="JFK"):
		a=[0,0,1,0,0]
		inputs.extend(a)
	elif(origin=="MSP"):
		a=[0,0,0,1,0]
		inputs.extend(a)
	elif(origin=="SEA"):
		a=[0,0,0,0,1]
		inputs.extend(a)
	
	if(dest=="ATL"):
		b=[1,0,0,0,0]
		inputs.extend(b)
	elif(dest=="DTW"):
		b=[0,1,0,0,0]
		inputs.extend(b)
	elif(dest=="JFK"):
		b=[0,0,1,0,0]
		inputs.extend(b)
	elif(dest=="MSP"):
		b=[0,0,0,1,0]
		inputs.extend(b)
	elif(dest=="SEA"):
		b=[0,0,0,0,1]
		inputs.extend(b)
		
	# NOTE: manually define and pass the array(s) of values to be scored in the next line
	payload_scoring = {"input_data": [{"fields": [['f0', 'f1', 'f2', 'f3', 'f4', 'f5', 'f6', 'f7', 'f8', 'f9', 'f10', 'f11', 'f12', 'f13', 'f14', 'f15']], "values": [inputs]}]}

	response_scoring = requests.post('https://us-south.ml.cloud.ibm.com/ml/v4/deployments/cec48201-70cc-4651-aa5d-7f49f99a586a/predictions?version=2022-11-18', json=payload_scoring, headers={'Authorization': 'Bearer ' + mltoken})
	print("Scoring response")
	predictions = response_scoring.json()
	print(response_scoring.json())

	predict = predictions['predictions'][0]['values'][0][0]

	return render_template('/result.html', prediction = predict)

if __name__ == '__main__':
	app.run(debug=True)