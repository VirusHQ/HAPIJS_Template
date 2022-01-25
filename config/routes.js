'use strict';

const Ping = require('../controllers/ping');
const Videos = require('../controllers/videos');
const Joi = require('joi');

module.exports = [{
  method: 'GET',
  path: '/',
  options: {
    handler: Ping.serverInfo,
    auth: false,
    description: 'Get server epochtime.',
    notes: 'Returns server epochtime.',
    tags: []
  }
}, {
  method: 'GET',
  path: '/videos',
  options: {
    handler: Videos.getVideos,
    auth: false,
    description: 'Get all videos',
    notes: 'Gets all the videos in the table, timesViewed is optional and if isPrivate is set to true it will only retrive videos that are set to public',
    tags: ['api'],
    validate: {
      query: Joi.object({
        isPrivate: Joi.boolean(),
        timesViewed: Joi.number(),
        page: Joi.number(),
        per_page: Joi.number()
      })
    }
  }
}, {
  method: 'GET',
  path: '/videos/authCheck',
  options: {
    handler: Videos.getVideos,
    auth: 'jwt',
    description: 'Get list all videos with authentication enabled',
    notes: 'Gets all the videos in the table, timesViewed is optional and if isPrivate is set to true it will only retrive videos that are set to public',
    tags: ['api'],
    validate: {
      query: Joi.object({
        isPrivate: Joi.boolean(),
        timesViewed: Joi.number(),
        page: Joi.number(),
        per_page: Joi.number()
      })
    }
  }
}, {
  method: 'POST',
  path: '/videos',
  options: {
    handler: Videos.postVideo,
    auth: false,
    description: 'Add new video',
    notes: 'Inserts new video in table',
    tags: ['api'],
    validate: {
      query: Joi.object({
        name: Joi.string().required(),
        url: Joi.string().required(),
        thumbnailUrl: Joi.string().required(),
        isPrivate: Joi.boolean().required()
      })
    }
  }
}, {
  method: 'PUT',
  path: '/videos',
  options: {
    handler: Videos.putVideo,
    auth: false,
    description: 'Update existing video',
    notes: 'Updates existing video data in table',
    tags: ['api'],
    validate: {
      query: Joi.object({
        id: Joi.number().required()
      }).keys({
        name: Joi.string().optional(),
        url: Joi.string().optional(),
        thumbnailUrl: Joi.string().optional(),
        isPrivate: Joi.boolean().optional(),
        timesViewed: Joi.boolean().optional()
      }).or('name', 'url', 'thumbnailUrl', 'isPrivate', 'timesViewed').required()
    }
  }
}, {
  method: 'DELETE',
  path: '/videos',
  options: {
    handler: Videos.deleteVideo,
    auth: false,
    description: 'Delete video data',
    notes: 'Deletes existing video from the table',
    tags: ['api'],
    validate: {
      query: Joi.object({
        id: Joi.number().required()
      })
    }
  }
}];