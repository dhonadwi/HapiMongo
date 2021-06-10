const Joi = require('@hapi/joi');
const {
  addMovie, getAllMovies, getMovieById, updateMovie, deleteMovie, searchMovie,
} = require('./handler');
Joi.objectId = require('joi-objectid')(Joi);

const routes = [
  {
    method: 'GET',
    path: '/',
    handler: getAllMovies,
  },
  {
    method: '*',
    path: '/',
    handler: (request, h) => 'Halaman tidak dapat diakses dengan metode tersebut',
  },
  {
    method: 'GET',
    path: '/about',
    handler: (request, h) => 'About Page',
  },
  {
    method: '*',
    path: '/about',
    handler: (request, h) => 'Halaman tidak dapat diakses dengan method tersebut',
  },
  {
    method: 'POST',
    path: '/movie',
    handler: addMovie,
  },
  {
    method: 'GET',
    path: '/movie/{id}',
    handler: getMovieById,
  },
  {
    method: 'PUT',
    path: '/movie/{id}',
    options: {
      validate: {
        params: Joi.object({
          id: Joi.objectId(),
        }),
      },
    },
    handler: updateMovie,
  },
  {
    method: 'DELETE',
    path: '/movie/{id}',
    options: {
      validate: {
        params: Joi.object({
          id: Joi.objectId(),
        }),
      },
    },
    handler: deleteMovie,
  },
  {
    method: 'GET',
    path: '/search',
    handler: searchMovie,
  },
  {
    method: '*',
    path: '/{any*}',
    handler: (request, h) => 'Halaman tidak ditemukan',
  },
];
module.exports = routes;
