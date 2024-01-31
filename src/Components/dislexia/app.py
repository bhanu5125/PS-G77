import numpy as np
from flask import Flask, request, render_template, session,url_for, redirect, jsonify
import joblib
from flask_cors import CORS

app = Flask(__name__, template_folder='templets')

CORS(app, resources={r"/quizz": {"origins": "http://localhost:3000"}, r"/survey": {"origins": "http://localhost:3000"}, r"/dpredict": {"origins": "http://localhost:3000"}})

app.config['SESSION_TYPE'] = 'filesystem'
app.config['SECRET_KEY'] = 'ffc7d34aab51af9fcf5eccc2b716383c'

model = joblib.load("src\Components\dislexia\model_joblib")
sc = joblib.load("src\Components\dislexia\sc_model")
@app.route('/')
def home():
    return render_template("home.html")

@app.route('/quizz', methods=["GET", "POST"])
def quizz():
    if request.method == "POST":
        final=[]
        print("quizz start ->",final)
        data = request.json
        answers = data.get('answers')
        score = answers
        print(score)
        Language_vocab = round((score[0]+score[1]+score[2]+score[3]+score[4]+score[5]+score[7])/28,1)
        Memory = round((score[1]+score[8])/8,1)
        #Speed = Calculated on the basis of time taken to complete the quiz(for now lets take some value)
        speed = 0.5
        Visual_discrimination = round((score[0]+score[2]+score[3]+score[5])/16,1)
        Audio_Discrimination = round((score[6]+score[9])/8,1)
        final = [Language_vocab,Memory,speed,Visual_discrimination,Audio_Discrimination]
        print("after quiz -> ",final)
    return jsonify({'scr': final})

@app.route('/survey', methods=["GET", "POST"])
def survey():
    if request.method == "POST":
        data = request.json
        answers = data.get('answers')
        score = answers
        f2 = data.get('vals')
        print("Survey start -> ",f2)
        print(score)
        survey_score = round((sum(score))/80,1)
        f2.append(survey_score)
        print(f2)
        print("survey score -> ",survey_score)
        session['pred']=f2
    return jsonify({'scr': f2})

@app.route('/dpredict', methods=["GET", "POST"])
def predict():
    data = request.json
    score = data.get('vals')
    print("pred start -> ",score)
    prediction = model.predict(sc.transform([score]))
    print("prediction1 -> ",prediction[0])
    output = int(prediction[0])
    print("fprediction -> ",output)
    if output==2:
        prediction=f"Your chance of having dylexia is LOW....."
        result = "You are Good.."
    elif output==1:
        prediction=f"Your chance of having dylexia is MODERATE....."
        result="If you have any doubt consult a doctor..."
    else:
        prediction=f"Your chance of having dylexia is HIGH....."
        result="Consult a doctor..."
    
    return jsonify({'prediction': prediction, 'result': result, 'output': output})
    
if __name__ == '__main__':
    app.run(debug=True, port=5001)

