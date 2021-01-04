import json
import os
import numpy as np

from sklearn.preprocessing import LabelEncoder, OneHotEncoder

alphabet = list("0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.,-()/") # %:;&#
alphabet.insert(0, chr(0)) # '\x00' character, i.e., ord(0) to label concatenations.
char_encoder = LabelEncoder()
char_encoder.fit(alphabet)

int_alphabet = np.expand_dims(np.array(range(len(alphabet))), axis=1)

one_hot_encoder = OneHotEncoder(sparse=False)
one_hot_encoder.fit(int_alphabet)


def text_to_one_hot(text):
    integer_labels = char_encoder.transform(list(text))
    return one_hot_encoder.transform(np.expand_dims(integer_labels, axis=1))


def load_data(json_path, semantic_len = 300):
    # loads tracer data jsons and merges into one array
    coord_data = np.empty((0,3), "float")
    label_data = np.empty((0,4), "float")
    char_one_ht_data = np.empty((0,70), "float")
    # char_one_ht_data

    for files in os.listdir(json_path):
        if files.split('.')[-1] == "json":
            temp_json_path = os.path.join(json_path, files)
            print("Processing  "+files)
            with open(temp_json_path) as f:
                temp = json.load(f)

            temp_cood = []
            temp_label = []
            temp_char = []
            for sample in temp['data']:
                temp_cood.append([sample['x1'], sample['y1'], sample['pen']])
                temp_label.append([sample['bow_label'], sample['eoc_label'],temp['width'], temp['height']])
                temp_char.append(text_to_one_hot(sample['char_label'])[0])
                
            
            coord_data = np.append(coord_data,scale(temp_cood, temp['width'], temp['height']), axis = 1)
            label_data = np.append(label_data,temp_label, axis = 1)
            char_one_ht_data = np.append(char_one_ht_data,temp_char, axis = 1)

    
    print(coord_data.shape)
def scale(sample, width, height):
    # scales the data according to the img sixe  --> x/img_width, y/img_height
    sample = np.array(sample)
    sample[:, 0] = sample[:, 0]/width
    sample[:, 1] = sample[:, 1]/height

    return sample


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

if __name__ =="__main__":
    json_path = "./img_text_ext/tracing-webapp/backend/static/jsons"
    data = load_data(json_path)