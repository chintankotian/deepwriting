# converts a list of path elements of a SVG file to simple line drawing commands
# requires svg.path, install it like this: pip3 install svg.path
from svg.path import parse_path
from svg.path.path import Line
from xml.dom import minidom
import numpy as np
import matplotlib.pyplot as plt
import matplotlib.animation as animation
import cv2
fig = plt.figure()
# read the SVG file
doc = minidom.parse('sketch-black-potrace.svg')
path_strings = [path.getAttribute('d') for path
                in doc.getElementsByTagName('path')]

height = int(doc.getElementsByTagName("svg")[0].getAttribute('height').split('.')[0])
width = int(doc.getElementsByTagName("svg")[0].getAttribute('width').split('.')[0])

# img = np.zeros((width, height))
img = np.ones((height, width)) * 255
imgs = []
line_thickness = 2

doc.unlink()

# print the line draw commands
for path_string in path_strings:
    path = parse_path(path_string)
    for e in path:
        if isinstance(e, Line):
            x0 = e.start.real
            y0 = e.start.imag
            x1 = e.end.real
            y1 = e.end.imag
            img = cv2.line(img, (int(x0),int(y0)), (int(x1),int(y1)), (0,255,0), thickness = line_thickness)
            imgs.append([plt.imshow(img, animated = True)])
            print("(%.2f, %.2f) - (%.2f, %.2f)" % (x0, y0, x1, y1))
            
ani = animation.ArtistAnimation(fig, imgs,  interval=50, blit=True,
                                repeat_delay=1000)

plt.show()