/* eslint-disable max-len */
'use strict';
const assert = require('assert');
const initMoneroCoreJs = require('../index.js');
let moneroCoreJs;

describe('index', () => {

  before(async() => {
    moneroCoreJs = await initMoneroCoreJs();
  });

  it('should work', async () => {
    const message = moneroCoreJs.hello('world');
    assert.strictEqual(message, 'world');
  });

});
