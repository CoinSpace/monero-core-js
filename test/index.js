/* eslint-disable max-len */
'use strict';
const assert = require('assert');
const initMoneroCoreJs = require('../index.js');
const [standard, subaddress, integrated] = require('./fixtures/data.json');
WebAssembly.instantiateStreaming = false;

describe('index', () => {

  describe('createTx (wasm)', () => {
    it('should work (standard address)', async () => {
      const moneroCoreJs = await initMoneroCoreJs();
      const { rawTx, txKey } = moneroCoreJs.createTx(standard);
      assert.strictEqual(typeof rawTx, 'string');
      assert.ok(rawTx.length > 0);
      assert.strictEqual(typeof txKey, 'string');
      assert.ok(txKey.length > 0);
    });
    it('should work wasm (subaddress address)', async () => {
      const moneroCoreJs = await initMoneroCoreJs();
      const { rawTx, txKey } = moneroCoreJs.createTx(subaddress);
      assert.strictEqual(typeof rawTx, 'string');
      assert.ok(rawTx.length > 0);
      assert.strictEqual(typeof txKey, 'string');
      assert.ok(txKey.length > 0);
    });
    it('should work wasm (integrated address)', async () => {
      const moneroCoreJs = await initMoneroCoreJs();
      const { rawTx, txKey } = moneroCoreJs.createTx(integrated);
      assert.strictEqual(typeof rawTx, 'string');
      assert.ok(rawTx.length > 0);
      assert.strictEqual(typeof txKey, 'string');
      assert.ok(txKey.length > 0);
    });
  });

  describe('createTx (asm)', () => {
    it('should work asm (standard address)', async () => {
      const moneroCoreJs = await initMoneroCoreJs(false, true);
      const { rawTx, txKey } = moneroCoreJs.createTx(standard);
      assert.strictEqual(typeof rawTx, 'string');
      assert.ok(rawTx.length > 0);
      assert.strictEqual(typeof txKey, 'string');
      assert.ok(txKey.length > 0);
    });
    it('should work asm (subaddress address)', async () => {
      const moneroCoreJs = await initMoneroCoreJs(false, true);
      const { rawTx, txKey } = moneroCoreJs.createTx(subaddress);
      assert.strictEqual(typeof rawTx, 'string');
      assert.ok(rawTx.length > 0);
      assert.strictEqual(typeof txKey, 'string');
      assert.ok(txKey.length > 0);
    });
    it('should work asm (integrated address)', async () => {
      const moneroCoreJs = await initMoneroCoreJs(false, true);
      const { rawTx, txKey } = moneroCoreJs.createTx(integrated);
      assert.strictEqual(typeof rawTx, 'string');
      assert.ok(rawTx.length > 0);
      assert.strictEqual(typeof txKey, 'string');
      assert.ok(txKey.length > 0);
    });
  });

});
