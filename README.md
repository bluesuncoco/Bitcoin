# Bitcoin address generator
Bitcoin address utils api server for a little test followed by BIP173,BIP44 and BIP32 protocol.

## enviroment
node v9.9.0

## install
```
cd bitcoinAdressMin 
npm install 
npm start
```
api server listening at 8009 by default

## Usage
http/1.1 restful api  
response format：

```
{
    "message": "failure",or"success"
    "code": 2, non 1 indicates failure
    "content": depends on specific api
}
```

### 1. generate HD wallet native bitcoin segwit address

| name         | value               |
| ------------ | ---------------- |
| URL          | hdWallet/segwit-address |
| Content-Type | application/json |
| HTTP Method  | POST             |



- request parameter

  | name    |type         | required | remark                          |
  | ------- | ------------ | -------- | ----------------------------- |
  | seed     | string       | yes       |hex format of seed better be 32 bytes (do not put prefix of 0x)|
  | path | string | yes       | bit32 bip44 path format start with / |


  example

```
{
  "seed": "000102030405060708090a0b0c0d0e0f",
  "path": "/m/0'/1/2'/2"
}
```

- response

  | name    | type   | remark          |
  | ------- | ------ | ------------- |
  | content | string | bitcoin segwit address |

  example

```json
{
    "message": "success",
    "code": "1",
    "content": "bc1q66d2zq39tlkhgduz0rrczfcpafjplhejmtgugz"
}
```



### 2. generate multisig bitcoin address

| name         | value               |
| ------------ | ---------------- |
| URL          | btc-address/multisig-address |
| Content-Type | application/json |
| HTTP Method  | POST             |



- request parameter

  | name    |type         | required | remark                          |
  | ------- | ------------ | -------- | ----------------------------- |
  | m     | integer       | yes |number of required private key to spend the coin|
  | n | string | yes       | total number of ppl in this address |
| pubkeys | array | yes       | public keys |
| pubkeys->key | string | yes       | valic secp256k1 public key either in compressed or uncompressed format |
  example

```json
{
  "m": 4,
  "n": 4,
  "pubkeys":["035A784662A4A20A65BF6AAB9AE98A6C068A81C52E4B032C0FB5400C706CFCCC56","02783FF15881379F4BA64FD883572E2E750C90B79B9317067EAB36188D19189FF0","02B04A7D9956B020297C5449F59CD6206304A77BEE047D97681620C7E703578073","024CFFEA626FA0C47ABCB97250D7093E335278D92337C140FD50658080A3B0686B"]
}
```

- response

  | name    | type   | remark          |
  | ------- | ------ | ------------- |
  | content | string | bitcoin multisig address |

  example

```json
{
    "message": "success",
    "code": "1",
    "content": "3GFXcXmNzbX8sDn3nLsLHu3V8UR8rDdcm6"
}
```
## command line example
command line example are lying on the test_cli.sh in bitcoinAdressMin.
## Others
The bech32 encoding work is from [sipa](https://github.com/sipa/bech32/tree/master/ref/javascript).

## TODO
1. rewrite the nodejs server to typescript (with help of types).
2. add p2sh version of p2wpkh address.

## License


**bitcoin address** is available under [GNU General Public License v3.0](LICENSE).












