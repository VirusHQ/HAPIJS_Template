'use strict';

const Lab = require('@hapi/lab');
const { expect } = require('@hapi/code');
const { afterEach, beforeEach, describe, it } = exports.lab = Lab.script();
const { init } = require('../server');

describe('Initialize Server', () => {
  let server;

  beforeEach(async () => {
    server = await init();
  });

  afterEach(async () => {
    await server.stop();
  });

  it('Get server time.', async () => {
    const res = await server.inject({
      method: 'GET',
      url: '/'
    });
    expect(res.result.epochtime).not.null;
  });
});