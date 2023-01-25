import requests
import pandas as pd
import json
from bs4 import BeautifulSoup
from pymongo import MongoClient
from flask import make_response, jsonify
from flask_restx import Resource, Namespace

client = MongoClient(f"mongodb://localhost:27017")
db = client["scraper"]["coinmarket"]

api = Namespace("scraper", description="scraper API")

@api.route("/", methods=["GET", "POST", "PUT", "DELETE"])
class Scrapper(Resource):
    
    def get(self):
        cursor = db.find()
        data = []
        for doc in cursor:
            doc['_id'] = str(doc['_id'])
            data.append(json.dumps(doc))
        return data
    
    def post(self):
        url = 'https://coinmarketcap.com/'
        response = requests.get(url)
        soup = BeautifulSoup(response.text, 'html.parser')
        result = pd.read_html(str(soup))[0]
        data = []
        db.drop()
        for index, row in result.iterrows():
            record={}
            row_data = row[2:].tolist()
            record["Name"] = row_data[0]
            record["price"] = row_data[1]
            record["1h%"] = row_data[2]
            record["24h%"] = row_data[3]
            record["7d%"]  = row_data[4]
            record["Market Cap"] = row_data[5]
            record["Volume(24h)"] = row_data[6]
            record["Circulating Supply"] = row_data[7]
            data.append(record)
        db.insert_many(data)
        return {"success": "successfully posted data"}, 200
