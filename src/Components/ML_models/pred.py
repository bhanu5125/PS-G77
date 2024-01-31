from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import numpy as np

app = Flask(__name__)
CORS(app, resources={r"/apredict": {"origins": "http://localhost:3000"}}) 

model = joblib.load('ml')

@app.route('/apredict', methods=['POST'])
def submit_survey():
    data = request.json
    answers = data.get('answers')
    features = [np.array(answers)]
    prediction = predicter(features)

    return jsonify({'prediction': prediction})

def predicter(features):

    prediction = model.predict(features)
    return prediction[0]

if __name__ == '__main__':
    app.run(debug=True)