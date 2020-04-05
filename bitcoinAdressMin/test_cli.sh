
curl -X POST \
  http://localhost:8009/hdWallet/segwit-address \
  -H 'Content-Type: application/json' \
  -H 'Postman-Token: f4fc1c09-4503-4583-a1b2-a558282bac68' \
  -H 'cache-control: no-cache' \
  -d '{
  "seed": "fffcf9f6f3f0edeae7e4e1dedbd8d5d2cfccc9c6c3c0bdbab7b4b1aeaba8a5a29f9c999693908d8a8784817e7b7875726f6c696663605d5a5754514e4b484542",
  "path": "/m/0/2147483647'\''/1/2147483646'\''/2"
}'

echo ''
# bc1qycfjlkl8h7yuh3jvlrd050ul3zuxvc3qphdmd3

curl -X POST \
  http://localhost:8009/hdWallet/segwit-address \
  -H 'Content-Type: application/json' \
  -H 'Postman-Token: ad8a79f1-4f43-4f8d-a67f-91c7ad505c66' \
  -H 'cache-control: no-cache' \
  -d '{
  "seed": "000102030405060708090a0b0c0d0e0f",
  "path": "/m/0'\''/1/2'\''/2/1000000000"
}'
echo ''

# bc1q66d2zq39tlkhgduz0rrczfcpafjplhejmtgugz
curl -X POST \
  http://localhost:8009/btc-address/multisig-address \
  -H 'Content-Type: application/json' \
  -H 'Postman-Token: 3c763ffb-f1c3-4ed5-96ae-54d50e19cc29' \
  -H 'cache-control: no-cache' \
  -d '{
  "m": 1,
  "n": 4,
  "pubkeys":["035A784662A4A20A65BF6AAB9AE98A6C068A81C52E4B032C0FB5400C706CFCCC56","02783FF15881379F4BA64FD883572E2E750C90B79B9317067EAB36188D19189FF0","02B04A7D9956B020297C5449F59CD6206304A77BEE047D97681620C7E703578073","024CFFEA626FA0C47ABCB97250D7093E335278D92337C140FD50658080A3B0686B"]
}'
echo ''

# 3G3Mnx8BajbB3cPeoDVk1ofmbm3g7536PC

curl -X POST \
  http://localhost:8009/btc-address/multisig-address \
  -H 'Content-Type: application/json' \
  -H 'Postman-Token: 3c763ffb-f1c3-4ed5-96ae-54d50e19cc29' \
  -H 'cache-control: no-cache' \
  -d '{
  "m": 4,
  "n": 4,
  "pubkeys":["035A784662A4A20A65BF6AAB9AE98A6C068A81C52E4B032C0FB5400C706CFCCC56","02783FF15881379F4BA64FD883572E2E750C90B79B9317067EAB36188D19189FF0","02B04A7D9956B020297C5449F59CD6206304A77BEE047D97681620C7E703578073","024CFFEA626FA0C47ABCB97250D7093E335278D92337C140FD50658080A3B0686B"]
}'
echo ''

# 3GFXcXmNzbX8sDn3nLsLHu3V8UR8rDdcm6
