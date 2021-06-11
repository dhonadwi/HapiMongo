# HapiMongo
MongoDb using Hapi

*get list All movies
https://odonmovie.herokuapp.com/

*get movie by Id
https://odonmovie.herokuapp.com/movie/{id}

*Add movie
https://odonmovie.herokuapp.com/movie
Payload (JSON):

{
   "title": "Fast & Furious 9",
   "plot": "Dom Toretto is living the quiet life off the grid with Letty and his son, but they know that danger always lurks just over the peaceful horizon",
   "cast" : ["Vin Diesel.", "Jhon Cena", "Michelle Rodriguez"],
   "year": 2021
}

*Update Movie
https://odonmovie.herokuapp.com/movie/{id}
Payload (JSON):
{
   "year": 1988
}

*Delete Movie
https://odonmovie.herokuapp.com/movie/{id}

*Search Movie
https://odonmovie.herokuapp.com/search?title=[value]

headers [Authorization] : dhonadwi

