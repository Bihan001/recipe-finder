import argparse
import csv
import json
import os
import requests


def add_recipes(recipeName, ownerName, numberOfServes, prepTime, cookTime, description, rating, tags, image, video, ingredients, ingredientDetails, steps, calorie, carbohydrate, fat, protein, cholesterol, vitamin, mineral):
    # print(recipeName, ownerName, numberOfServes, prepTime, cookTime, description, tags, images, videos,
    #     ingredients, ingredientDetails, steps, calorie, carbohydrate, fat, protein, cholesterol, vitamin, mineral)
    data = {'recipeName': recipeName, 'ownerName': ownerName, 'numberOfServes': numberOfServes, 'prepTime': prepTime, 'cookTime': cookTime, 'description': description, 'rating': rating, 'tags': tags, 'image': image, 'video': video,
            'ingredients': ingredients, 'ingredientDetails': ingredientDetails, 'steps': steps, 'calorie': calorie, 'carbohydrate': carbohydrate, 'fat': fat, 'protein': protein, 'cholesterol': cholesterol, 'vitamin': vitamin, 'mineral': mineral}
    r = requests.post('http://localhost:5000/createRecipe',
                      headers={'Content-Type': 'application/json'}, json=data, timeout=5)
    print(r.json())


ap = argparse.ArgumentParser()

ap.add_argument("-csv", "--add_csv", nargs=1, metavar=('input_csv'),
                required=True, help="Adds recipes from csv file to database")


args = vars(ap.parse_args())

if args['add_csv']:
    csv_file = args['add_csv'][0]
    csv_file = os.path.abspath(csv_file)
    with open(csv_file, 'r') as csv_file:
        csv_reader = csv.reader(csv_file, delimiter='|')
        next(csv_reader)
        for line in csv_reader:
            add_recipes(line[0], line[1], line[2], line[3], line[4], line[5], line[6], line[7], line[8], line[9],
                        line[10], line[11], line[12], line[13], line[14], line[15], line[16], line[17], line[18], line[19])


# my_sheet = 'Sheet1'  # change it to your sheet name
# file_name = 'recipe_chart.xlsx'  # change it to the name of your excel file
# df = read_excel(file_name, sheet_name=my_sheet)
# df = df.replace('\s', ' ', regex=True)
# print(df.keys())
# for key in df.keys():
#     print(df[key][2])
