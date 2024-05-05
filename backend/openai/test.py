import openai
import requests
import numpy as np
import cv2
from urllib.request import urlopen, Request
from flask import Flask, jsonify, request, make_response

def mse(img1, img2):
   if len(img1.shape) == 1:
       return -1
   h1, w1 = img1.shape[:2]
   h2, w2 = img2.shape[:2]
   if h1 != h2 or w1 != w2:
       img1 = cv2.resize(img1, (w2, h2))
   diff = cv2.subtract(img1, img2)
   err = np.sum(diff**2)
   mse = err/(float(h2*w2))
   return mse

def compare_images(url1, url2):
    try:
        secu = Request(url1, headers={'User-Agent': 'Mozilla/5.0'})
        req = urlopen(secu).read()
        arr = np.asarray(bytearray(req), dtype=np.uint8)
        image1 = cv2.imdecode(arr, -1)
        secu = Request(url2, headers={'User-Agent': 'Mozilla/5.0'})
        req = urlopen(secu).read()
        arr = np.asarray(bytearray(req), dtype=np.uint8)
        image2 = cv2.imdecode(arr, -1)
    except Exception as e:
        return e
    mse_value = mse(image1, image2)
    return mse_value

print (compare_images("https://media.newyorker.com/photos/590971712179605b11ad7a88/16:9/w_1999,h_1124,c_limit/Jabr-AreCatsDomesticated.jpg", "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Cat03.jpg/1200px-Cat03.jpg"))