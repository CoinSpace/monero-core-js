/* eslint-disable max-len */
'use strict';
const assert = require('assert');
const initMoneroCoreJs = require('../index.js');
let moneroCoreJs;

describe('index', () => {

  before(async() => {
    moneroCoreJs = await initMoneroCoreJs();
  });

  describe('createTx', () => {
    it('should work', async () => {
      const data = {
        sources:[
          {
            amount: '1000000000000',
            targetKey: '6b8a8b363b7bee55392c4c42ef98b4b8930fa895cc7bb6598b691f0f25499a48',
            outPk: '063a8c5ee7f69bcd6ddf86e4e303c962562a18ce467316b90fb0881d7c7c5313',
            globalIndex: '633',
            index: '2',
            txPubKey: 'e9ec153ec0492c7eeab6636ae67059bee61e429f57627d13ef57809b14e927f9'
          },
        ],
        destinations: [
          { address: '4BCk3ZCUybidPR9yUEnJzy7x7hYuyyWFMfD6rCEW9wAsQ1J4KoXUz9ENMKsfnCjs2hC5kvcy4ZEYeUDPcvuEvU6GPyjk4mQ', amount: '500000000000' },
          { address: '49QgeNWEuoHDJEQXgXntCZWjU1JsHyWYGixSrAfpcX3kj7TD6JgtXd8hx1J2st8G7qUHHx1hzS6PsD7cJQAVDVCzDQjnTdR', amount: '200000000000' },
          { address: '88SSirTNnse71y7dkUaY8ag2ouTZGs2YkeuAzfvrARD5WSPcQz3QjUpBiQgJnoPeJxEsNU5TgAJrF8a3MaCWfbhAFELYwky', amount: '200000000000' },
        ],
        addresses: [
          '49QgeNWEuoHDJEQXgXntCZWjU1JsHyWYGixSrAfpcX3kj7TD6JgtXd8hx1J2st8G7qUHHx1hzS6PsD7cJQAVDVCzDQjnTdR', // root (0,0)
        ],
        secretViewKey: '37fd214e10bcbbae2f32c6d6bf1b43cc32b6419897eb8095d0ed64c47b200302',
        secretSpendKey: '27b5304452587be20911fdd627a72c8ad5e13eb1b54d29210628a40eddfb6f0d',
        mixins: [
           {
              amount: '0',
              outputs: [
                {
                  globalIndex: 57,
                  targetKey: '11edef3e3e579fca2aaf87fe937952248d18eb286c2f9d949d97092468e865a7',
                  outPk: 'f88e75525d8173c1617a13f47f45821fb2e5504d8859c36443c6432b181d4823'
                },
                {
                  globalIndex: 159,
                  targetKey: 'b834dbe6758135695b9f5688e4f5df10252f644b529ea65af21e5517db4512bf',
                  outPk: '3944a7442dd4a930ba2fe0ad9bfdc4e58c020ca39f744dcb5750299a9c75fa17'
                },
                {
                  globalIndex: 210,
                  targetKey: '966869e11bc6869dd44ae91e11e1d533639b2e1e060110e26332caedae8a0d77',
                  outPk: '74f2aff6c6cba523c9fd0e686b5c80e6e7c34734fefcc615b63848d2b58f0125'
                },
                {
                  globalIndex: 244,
                  targetKey: 'a9dfcda839b534eb3ea32e317e70753340ee254e24b51a4b16b62ff204ebe37d',
                  outPk: 'c58729eaf14301f2eaa130368fae4bd7d3e4060dd567c28466071ca93f431b9c'
                },
                {
                  globalIndex: 230,
                  targetKey: '71073c7537dbe9e266334d0d101909d377782ee3bcf59a44a15e953839b00050',
                  outPk: '3d6f254b9419728f15506067a838b91a244a1fc5b35f6b29e97a0c398fa9cdd8'
                },
                {
                  globalIndex: 186,
                  targetKey: 'ea3ff24e9a5da8951449c60b3c796ee2f58fb196610971d29547c21e54eb1be5',
                  outPk: '3ee3790cd8f836de051113ff1fc210039564cf8ce4fc3b547d46d4146e9b0805'
                },
                {
                  globalIndex: 60,
                  targetKey: 'b10c933b09d99a37e92bf20a79fe85c3ec1466b323165a2dfc942f9b8b79b5b7',
                  outPk: '6bf94cf0b5fba40ad009245bf3c96566a0a0af066ba6a75e0dc9772121f7e390'
                },
                {
                  globalIndex: 35,
                  targetKey: '4089a56234287be14f8d4321c41c3cc42d10fe8bd171870e62bc984231213d03',
                  outPk: 'eddaa82b5c533ebd21257a073eafc4c033048c5d38aea582b6bdc9cf9d75ca20'
                },
                {
                  globalIndex: 2,
                  targetKey: '3e25bce2ab5b9bdc94b196b45ccaa09da4d73c75ace265a78bb3ab28517629b8',
                  outPk: '48d7f0b8796720c7edef5e3797135b3e5ad2ae23db1d934bcf6d6bc396b8ed47'
                },
                {
                  globalIndex: 83,
                  targetKey: 'a758961393794016559570f599d6b6f145a0da45958ac4f3d5837e1ea298e234',
                  outPk: '898251bca2476330529516b08c285645e76f1dbe9fbba56d212b64b2b5546e20'
                },
                {
                  globalIndex: 14,
                  targetKey: '8a86ee6642abee0d42d70b98c9ed4b6eae7dbf2da523f22e1a964d2d6169c56e',
                  outPk: 'a0e20ecd8526bd2a640c4df42c187fcf75d05660ba61262c93b19384b8fad49b'
                }
              ],
           },
           {
              amount: '0',
              outputs: [
                {
                  globalIndex: 69,
                  targetKey: '81f8e1dbe0f64db037cf5ee1a9988d2fcd86450830786d4f3b33fb3cabf3ea18',
                  outPk: 'bacbe1e947443d73f42444f4bc8693573fda8346b418b199b64693f95a392987'
                },
                {
                  globalIndex: 169,
                  targetKey: '8d25f377afce2033eddd4ebe3af6e1b89a1f738569749328f3ed451910b11506',
                  outPk: '293083a5cb0237515b1aa2d282de05d1a4b037c90fa5dd57d95376c1f332c8db'
                },
                {
                  globalIndex: 209,
                  targetKey: 'bd52b008c5e279807f652e0c042baa1c2bbb78e7538441a4aba6f5634bd28210',
                  outPk: 'fcf9b293c8ce892db7d6f4d994db5cc4dd1a388b2fd1609a6bcf53fe5816d128'
                },
                {
                  globalIndex: 77,
                  targetKey: '0634d719128b95187b4f1e55011a3b8e91884484d315b1ce7ffb5e5b9d87ba62',
                  outPk: '2825a8f3b0f9c5fdacdbd4028d92d76ca24ac32ec270920e16c80d6d2fe2897e'
                },
                {
                  globalIndex: 83,
                  targetKey: 'a758961393794016559570f599d6b6f145a0da45958ac4f3d5837e1ea298e234',
                  outPk: '898251bca2476330529516b08c285645e76f1dbe9fbba56d212b64b2b5546e20'
                },
                {
                  globalIndex: 155,
                  targetKey: '72be7c4faf1ef0579c4bfb59cdc2bb3b41a3f2d9543143ac9b2305be76d4c65d',
                  outPk: 'ff138fcd604b50ca742f0a8400b90ae8080452c761603a1e7f8d095d27ec383a'
                },
                {
                  globalIndex: 138,
                  targetKey: '4965c12f5ea020ace13a5ccd141263dd39eca144ca4e4cad82aabfe8cd876396',
                  outPk: 'e8e6357b769290f91d0034fd29d3a01680bd51df99efdd4e23780b44041c9080'
                },
                {
                  globalIndex: 2,
                  targetKey: '3e25bce2ab5b9bdc94b196b45ccaa09da4d73c75ace265a78bb3ab28517629b8',
                  outPk: '48d7f0b8796720c7edef5e3797135b3e5ad2ae23db1d934bcf6d6bc396b8ed47'
                },
                {
                  globalIndex: 171,
                  targetKey: '5fefecd52962e1ef50891f488d8a002d04a336be6b5786cda1ea7253119c222f',
                  outPk: '8dd9f27caa67dffcef5aef5267626565a9d08bc0e3eeb739bc9150d8c81c99ac'
                },
                {
                  globalIndex: 85,
                  targetKey: 'e4cfe4b357270b2e444c6f1c95ba29f48a80cca048f3789ba28810f5ee31336a',
                  outPk: '110ffbc7b76b0b1ba7759e2339007ca2463db0ee2aeedce15a27af85436d4614'
                },
                {
                  globalIndex: 55,
                  targetKey: '35ac5ccb6382dc9a2d87c94cf2d10b338f0d215498303a64ea728278b10aa4cc',
                  outPk: 'f05a8afb1984b14df8c4497916072dabfe6069cae8f2edfbfc83d0e0984fa475'
                }
              ],
           }
        ]
      }
      const rawTx = moneroCoreJs.createTx(data);
      assert.strictEqual(typeof rawTx, 'string');
      assert.ok(rawTx.length > 0);
    });
  });

});
