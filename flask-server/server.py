from flask import Flask, jsonify , request
from flask_cors import CORS 
from flask_cors import cross_origin
import openai
import io
import subprocess
import os
from pydub import AudioSegment
AudioSegment.ffmpeg = "C:\\ffmpeg-6.0-essentials_build\\bin\\ffmpeg.exe"
import speech_recognition as sr

app = Flask(__name__)

CORS(app, resources={r"/api/*": {"origins": "http://localhost:5173"}})
openai.api_key = "Use your api key" # use your api key



@app.route("/api/code",methods=['POST'])
def code():
  data = request.get_json()
  choice = data.get('choice','')
  program = data.get('program','')
  print(choice)
  print(program)
  if not choice or not program:
        return jsonify({"error": "Invalid data sent from the frontend"}), 400

  
  prompt = f"Generate only code for {choice} program to {program}. There should no description strictly "
  if(choice=="java"):
    prompt+=" inside the class Main"

  response = openai.ChatCompletion.create(
  model="gpt-3.5-turbo-16k-0613",
  messages=[
    {
      "role": "user",
      "content": prompt
    }
  ],
  temperature=0.83,
  max_tokens=256,
  top_p=1,
  frequency_penalty=0,
  presence_penalty=0
  )
  resp = response.choices[0].message.content
  list = resp.splitlines()
  for i in range(2):
    index_to_remove = next((i for i, elem in enumerate(list) if "```" in elem), None)

    if index_to_remove is not None:
        if i == 0:
            list = list[index_to_remove + 1 :]
        else:
            list = list[:index_to_remove]
  return jsonify({"code": list})

@app.route("/api/recommend",methods=['POST'])
def recommend():
  
  
  data=request.get_json()
  program=data.get("program","")
  if  not program:
        return jsonify({"error": "Invalid data sent from the frontend for program recommendation"}), 400
  print("Input for recommendation -- ",program)
  prompt = f"As a tutor, suggest unique five programs that only improve the user's problem-solving skills , thinking skills improving understanding of wider range of the concept. Each suggestion should include only strictly in the format  'Topic of the problem'  and 'problem description' .The given program is {program}.  "
  response = openai.ChatCompletion.create(
  model="gpt-3.5-turbo-16k-0613",
  messages=[
    {
      "role": "user",
      "content": prompt
    }
  ],
  temperature=0.83,
  max_tokens=256,
  top_p=1,
  frequency_penalty=0,
  presence_penalty=0
  )
  
  print(response)
  resp = response.choices[0].message.content
  li = resp.split("\n\n")
  """
  resp = Topic of the Problem: G23eographical Data Visualization
Problem Description: Create a program that retrieves the IP address of a website and then uses geolocation data to plot the location of the website's server on a map. Enhance problem-solving skills by working with geospatial data and visualization libraries.

Topic of the Problem: Parallel Processing and Multithreading
Problem Description: Develop a program that can concurrently retrieve IP addresses for multiple website URLs using multithreading or asynchronous programming. This exercise will help improve problem-solving skills related to parallel processing and thread synchronization.

Topic of the Problem: Natural Language Processing (NLP)
Problem Description: Extend the program to extract text content from a website and perform sentiment analysis on the textual data. This will enhance your problem-solving skills in NLP and text sentiment analysis.

Topic of the Problem: Data Privacy and GDPR Compliance
Problem Description: Build a program that checks if a website is compliant with GDPR (General Data Protection Regulation) and its data privacy policies. Understand the legal and technical aspects of data privacy and how they apply to website operations.

Topic of the Problem: Network Security and Penetration Testing
Problem Description: Develop a program that not only retrieves IP addresses but also assesses the security vulnerabilities of a website using ethical hacking techniques. This exercise will improve problem-solving skills in network security and penetration testing, as well as ethical considerations."""
  #li = resp.split("\n\n")
  d = []
  for i in range(len(li)):
      temp = {}
      topic, problem = li[i].split("\n")
      l = topic.split(":")
      temp["topic"] = l[1]
      l = problem.split(":")
      temp["problem"] = l[1]
      d.append(temp)

  print(d)
  return jsonify({"recprog":d})

@app.route("/api/generatealgo",methods=['POST'])
def generatealgo():
  #USE YOUR API
  openai.api_key = "API KEY"
  
  data=request.get_json()
  program=data.get("program","")
  if  not program:
        return jsonify({"error": "Invalid data sent from the frontend for program recommendation"}), 400
  print("Input for recommendation -- ",program)
  prompt = f"{program}.Give me a step by step summarized simple algorithm only and  no other explanation  should be there in numbered format only"

  response = openai.ChatCompletion.create(
  model="gpt-3.5-turbo-16k-0613",
  messages=[
    {
      "role": "user",
      "content": prompt
    }
  ],
  temperature=0.83,
  max_tokens=256,
  top_p=1,
  frequency_penalty=0,
  presence_penalty=0
  )
  
  print(response)
  resp = response.choices[0].message.content
  """
  resp = Import the necessary libraries, including requests, socket, and geopy, for retrieving the IP address and geolocation data.

  Prompt the user for the website URL.

  Use the socket library to resolve the website's URL to an IP address.

  Send a request to a geolocation API (e.g., IP Geolocation API) with the retrieved IP address to get the server's geolocation data.

  Parse the JSON response from the geolocation API to extract latitude and longitude information.

  Initialize a mapping library (e.g., Folium) to create a map.

  Add a marker on the map with the server's latitude and longitude coordinates.

  Display the map with the server's location.

  Handle any potential errors, such as invalid URLs or failed API requests.

  Run the program and visualize the server's location on the map.


  """

  li1 = resp.split("\n")
  
  li=[line for line in li1 if line.strip() != ""]
  
  for i in li:
      print(i)
  

  print("Algorithm: ",li)
  return jsonify({"algo":li})

@app.route("/api/transcribe",methods=['POST'])
def transcribe_audio():
  try:
    print("Received POST request to /api/transcribe")
    print("Request Headers:", request.headers)
    data = request.files.get("audioBlob")
    print(data)
    print("got data")
    
    audio = AudioSegment.from_file(data,format='webm')
    conv_audio=audio.export('temp.wav',format='wav')
    print("audio converted")
    
    recognizer = sr.Recognizer()
    print("Recognizer created")
    with sr.AudioFile(conv_audio) as source:
      audio_data=recognizer.record(source)
    print("audio data created")
    
    text_transcribe = "Reached back end"
    
    text_transcribe=recognizer.recognize_google(audio_data)
    
    print("transcribed using google")
    print(text_transcribe)
    return jsonify({"text": text_transcribe})

  except Exception as e:
    print("Error:", str(e))
    return jsonify({"error": str(e)}), 500


@app.route("/api/compile",methods=['POST'])
def compile():
  try:
    print("Received POST request to /api/compile")
    
    
    data=request.get_json()
    language=data.get("language","")
    codee=data.get("codee","")
    inputValue=data.get("inputValue","")
    print(inputValue)

    if  (not language or not codee):
        return jsonify({"error": "Invalid data sent from the frontend for program recommendation"}), 400
    
    
    file_name = "my_code.py"

    # Write the code to a Python file
    with open(file_name, "w") as file:
        file.write(codee)
    
    inp = inputValue
    byte_arr = io.BytesIO()
    byte_arr.write(inp.encode("utf-8"))
    byte_arr.seek(0)
    process = subprocess.run(
        ["python", "my_code.py"], capture_output=True, input=byte_arr.read()
    )
    output = process.stdout.decode("utf-8")
    print(output)
    
    print(type(output))
    os.remove("my_code.py")
             
          
    return jsonify({"output": output})
        
      
  
  
  except Exception as e:
    print("Error:", str(e))
    return jsonify({"error": str(e)}), 500



if __name__ == "__main__":
    app.run(debug=True)
