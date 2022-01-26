const Models = require('../models/index');

module.exports = {
  getVideos: async (request, h) => {
    try {
      const query = request.query;
      const isPrivate = query.isPrivate;
      const timesViewed = query.timesViewed;
      const page = query.page;
      const per_page = query.per_page;

      var pageNo = 0;
      if (page === undefined) pageNo = 1;
      var totalVids = await Models.sequelize.query('SELECT count(*) as total from `videos`', {
        type: Models.sequelize.QueryTypes.SELECT
      });
      totalVids = totalVids[0].total;

      var sql = 'SELECT * FROM `videos`';
      if (isPrivate !== undefined || timesViewed !== undefined) {
        sql = sql + ' WHERE ';
        if (isPrivate !== undefined) {
          sql = sql + ' isPrivate = ' + isPrivate;
        }
        if (timesViewed !== undefined) {
          sql = sql + ' timesViewed >= ' + timesViewed;
        }
      }
      if (page !== undefined || per_page !== undefined) {
        if (per_page === undefined) {
          return h.response({
            error: 'Need a per page count'
          }).code(400);
        }
        if (page !== undefined) {
          pageNo = page;
        }
        var pageStart = (pageNo * per_page) - per_page;
        if (pageStart > totalVids) {
          return h.response({
            error: 'Page out of bounds'
          }).code(400);
        }
        sql = sql + ' LIMIT ' + pageStart + ', ' + per_page;
      }

      const allVids = await Models.sequelize.query(sql, {
        type: Models.sequelize.QueryTypes.SELECT
      });

      return {
        totalVids,
        pageNo,
        allVids
      };
    } catch (err) {
      console.trace(err);
      return h.response({
        error: err
      }).code(400);
    }
  },
  postVideo: async (request, h) => {
    try {
      const query = request.query;
      const name = query.name;
      const url = query.url;
      const thumbnailUrl = query.thumbnailUrl;
      const isPrivate = query.isPrivate;

      await Models.videos.create({
        name: name,
        url: url,
        thumbnailUrl: thumbnailUrl,
        isPrivate: isPrivate,
      });
      return 'Video Added';
    } catch (err) {
      return h.response({
        error: err
      }).code(400);
    }
  },
  putVideo: async (request, h) => {
    try {
      const query = request.query;
      const id = query.id;
      const name = query.name;
      const url = query.url;
      const thumbnailUrl = query.thumbnailUrl;
      const isPrivate = query.isPrivate;
      const timesViewed = query.timesViewed;

      if (name !== undefined) {
        await Models.videos.update({
          name: name,
        }, {
          where: {
            id: id
          }
        });
      }
      if (url !== undefined) {
        await Models.videos.update({
          url: url,
        }, {
          where: {
            id: id
          }
        });
      }
      if (thumbnailUrl !== undefined) {
        await Models.videos.update({
          thumbnailUrl: thumbnailUrl,
        }, {
          where: {
            id: id
          }
        });
      }
      if (isPrivate !== undefined) {
        await Models.videos.update({
          isPrivate: isPrivate,
        }, {
          where: {
            id: id
          }
        });
      }
      if (timesViewed === true) {
        await Models.videos.update({
          timesViewed: Models.sequelize.literal('timesViewed + 1')
        }, {
          where: {
            id: id
          }
        });
      }

      return 'Video Updated';
    } catch (err) {
      return h.response({
        error: err
      }).code(400);
    }
  },
  deleteVideo: async (request, h) => {
    try {
      const query = request.query;
      const id = query.id;

      await Models.videos.destroy({
        where: {
          id: id
        }
      });
      return 'Video Removed';
    } catch (err) {
      return h.response({
        error: err
      }).code(400);
    }
  }
};