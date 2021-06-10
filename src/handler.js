const addMovie = async (request, h) => {
  const { headers } = request;
  const auth = headers['x-auth'];
  if (auth === 'dhonadwi') {
    const { payload } = request;
    const status = await request.mongo.db.collection('notes').insertOne(payload);
    return status;
  }
  const response = h.response({
    status: 'failed',
    message: 'please visit https://github.com/dhonadwi/HapiMongo',
  });
  response.type('application/json');
  response.code(404);
  return response;
};

const getAllMovies = async (request, h) => {
  const offset = Number(request.query.offset) || 0;
  const { headers } = request;
  const auth = headers['x-auth'];
  if (auth === 'dhonadwi') {
    const response = h.response({
      status: 'succes',
      movies: {
        movie: await request.mongo.db.collection('notes').find({}).sort({ metacritic: -1 }).skip(offset)
          .limit(20)
          .toArray(),
      },
    });
    response.type('application/json');
    response.code(200);
    return response;
  }
  const response = h.response({
    status: 'failed',
    message: 'please visit https://github.com/dhonadwi/HapiMongo',
  });
  response.type('application/json');
  response.code(404);
  return response;
};

const getMovieById = async (request, h) => {
  const { headers } = request;
  const auth = headers['x-auth'];
  if (auth === 'dhonadwi') {
    const { id } = request.params;
    const { ObjectID } = request.mongo;
    const movie = await request.mongo.db.collection('notes').findOne({ _id: new ObjectID(id) }, {
      projection: {
        title: 1, plot: 1, cast: 1, year: 1, released: 1,
      },
    });
    return movie;
  }
  const response = h.response({
    status: 'failed',
    message: 'please visit https://github.com/dhonadwi/HapiMongo',
  });
  response.type('application/json');
  response.code(404);
  return response;
};

const updateMovie = async (req, h) => {
  const { headers } = req;
  const auth = headers['x-auth'];
  if (auth === 'dhonadwi') {
    const { id } = req.params;
    const { ObjectID } = req.mongo;
    const { payload } = req;
    const status = await req.mongo.db.collection('notes').updateOne({ _id: ObjectID(id) }, { $set: payload });
    // return status.modifiedCount;
    const response = h.response({
      status: 'success',
      message: 'update a movie succes',
      movie: {
        id,
        status,
      },
    });
    response.type('application/json');
    response.code(200);
    return response;
  }
  const response = h.response({
    status: 'failed',
    message: 'please visit https://github.com/dhonadwi/HapiMongo',
  });
  response.type('application/json');
  response.code(404);
  return response;
};

const deleteMovie = async (req, h) => {
  const { headers } = req;
  const auth = headers['x-auth'];
  if (auth === 'dhonadwi') {
    const { id } = req.params;
    const { ObjectID } = req.mongo;
    const status = await req.mongo.db.collection('notes').deleteOne({ _id: ObjectID(id) });
    const response = h.response({
      status: 'success',
      message: 'delete a movie succes',
      movie: {
        id,
        status,
      },
    });
    response.type('application/json');
    response.code(200);
    return response;
  }
  const response = h.response({
    status: 'failed',
    message: 'please visit https://github.com/dhonadwi/HapiMongo',
  });
  response.type('application/json');
  response.code(404);
  return response;
};

const searchMovie = async (req, h) => {
  const { headers } = req;
  const auth = headers['x-auth'];
  if (auth === 'dhonadwi') {
    const query = req.query.title;

    const results = await await req.mongo.db.collection('notes').find(
      {
        title: { $regex: `${query}` },
      },
    )
      .toArray();

    const response = h.response({
      status: 'success',
      message: `${results.length} movie(s) found`,
      movie: {
        results,
      },
    });
    response.type('application/json');
    response.code(200);
    return response;
  }
  const response = h.response({
    status: 'failed',
    message: 'please visit https://github.com/dhonadwi/HapiMongo',
  });
  response.type('application/json');
  response.code(404);
  return response;
};
module.exports = {
  addMovie, getAllMovies, getMovieById, updateMovie, deleteMovie, searchMovie,
};
