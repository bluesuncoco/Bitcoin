var segwit = require('./segwitAddress.js');
const assert = require('assert')


let witAdress = segwit.encodeSegWitFromPub('0279BE667EF9DCBBAC55A06295CE870B07029BFCDB2DCE28D959F2815B16F81798');
assert.equal(witAdress, 'bc1qw508d6qejxtdg4y5r3zarvary0c5xw7kv8f3t4');



let witAdress2 = segwit.encodeSegWitFromPub('03ed713f65841ff96d8a6c1adf1ce3648688157226be5408aba01db2291bf5b053');
console.log(witAdress2);
assert.equal(witAdress2, 'bc1qjm52lgww0sakheqagrg7v7ut9meamtlr4r003n');

let testArray = [{
	pubkey: '0368ae080f27b457866a6d006f3e0b02c48f762f238994bf7ca0101deff5b9f3fc',
	address: 'bc1qdr07n8a3het34fwrs4tarlwmn2p6gw8tfwjm27'
}, {
	pubkey: '037b03fbe5469486aa7e134f6feafa7121210e3733d8ff622e9873aa8daf4cd739',
	address: 'bc1q44y5nad6lqaase5jtkaxwt5vq8t82xwlfxwf5p'
}, {
	pubkey: '023eae2ebc899d204178bcd1696234556aeb5af0af8b09871c03c3dac71d71c049',
	address: 'bc1qcgwdcgt6rgu4ulcs47rluk06677kmsnf43hk0x'
}, {
	pubkey: '02d15a67db8dc3adc70db05433648e90811fb51d9d48129254ac5b5509e797cead',
	address: 'bc1q5e3hwxmyyr9m2r82q0c05wzkl80l7tgq8jjzjh'
}, {
	pubkey: '035c6e387030e75534c8e7350bf0e75fb05a2c76230bc2dcd308f6dfaf9dd2c523',
	address: 'bc1qca2th5d45hzhupnrsvnshhldc8e54at43sk682'
}, {
	pubkey: '03591cb39a9f3d1ad25291d1dc0c77aaa58733276be229f745489b0d4e248c7a46',
	address: 'bc1qcfa50fje9zlaamsyjw38xj74tmdmtvqyhzu7xr'
}, {
	pubkey: '02ebb01bcf3ed75b9eb0dc1d603cdbbce2790855706c31f87d18e4f9c2e81c4399',
	address: 'bc1qp29a903j2sasvx9a7durr5rp9w9wfkacwqljgc'
}, {
	pubkey: '021b6a49b043a8b10ffaef5418f49fe8bb6684073b955de198ee4b895623cac026',
	address: 'bc1qlsrmxkw0dwgy7fra0g9f7hvz0atgx2q4vvpl80'
}, {
	pubkey: '037c73b5d05ace29fa7d8554f6976ac0949fdee3b998d5cd14de1da60f70fb402b',
	address: 'bc1q4374wvck4tr4s2awl0vgfk5zza5kvyd9gjclrt'
}, {
	pubkey: '024e0966b2987f58f1951205d7b8756653b6becd55db6436819dc0fd7987ed9a00',
	address: 'bc1qsx22czw4uf9tn5awyf4tt086u697kru7d5mrve'
}];

for (var i = 0; i < testArray.length; i++) {
	let witAdress = segwit.encodeSegWitFromPub(testArray[i].pubkey);
	assert.equal(witAdress, testArray[i].address);
}
	console.log('test passed!')
