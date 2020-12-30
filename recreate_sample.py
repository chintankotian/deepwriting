import json
import os
import numpy as np

def load_data(json_path):
    # loads tracer data jsons and merges into one array
    data = [] 
    for files in os.listdir(json_path):
        if files.split('.')[-1] == "json":
            temp_json_path = os.path.join(json_path, files)
            with open(temp_json_path) as f:
                temp = json.load(f)
            
            for sample in temp['data']:
                

            

    pass

def scale(sample):
    # scales the data according to the img sixe  --> x/img_width, y/img_height
    pass

def semantic_chunks(sample):
    # converts data into chunks of data with approx len of 300
    pass

def translate_to_origin(sample):
    # pick from preprocess.py of deepwriting
    pass

def relative_representation(sample):
    # pick from preprocess.py -""-
    pass

def standardize(sample):
    # standardize/noemalize x,y data by picking up mean and std from validation data npz
    pass

def stack_data(sample):
    # stacks data in [x, y, pen, char, bow] 
    pass

if __name__ =="main":
    json_path = "./img_text_ext/tracing-webapp/backend/jsons"
    data = load_data(json_path)