from  pytesseract import  *
import pandas as pd
try:
    from PIL import Image
except ImportError:
    import Image

import cv2
img = cv2.imread('test13.jpeg', cv2.IMREAD_GRAYSCALE)
# img = cv2.imread('test11.jpeg')
# img = 255 - img
d = pytesseract.image_to_data(img, output_type=Output.DICT)
n_boxes = len(d['level'])
for i in range(n_boxes):
    # if int(d['conf'][i]) > 30:
    (x, y, w, h) = (d['left'][i], d['top'][i], d['width'][i], d['height'][i])
    print(x,y,w,h)
    cv2.rectangle(img, (x, y), (x + w, y + h), (0, 255, 0), 2)
    # cv2.putText(img, d['text'], (x, y-10), cv2.FONT_HERSHEY_SIMPLEX, 0.9, (36,255,12), 2)
    print(" ".join(d['text'][i]))

cv2.imshow('img', img)
cv2.waitKey(0)