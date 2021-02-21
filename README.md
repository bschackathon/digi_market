# digi_market
NFT based marketplace for digital artwork

How to install:
1. Clone this git repostiory 
2. In root folder, run command "npm install"

How to run backend:
1. Create a file in root folder with the name secret.json
2. Enter account mnemonic in this format in the file -
{
    "secret": "mnemonic phrases"
}
3. In root folder, run command "node server.js"
4. Use browser or Postman client to mint token with URL, for example, http://localhost:3000/mint?fromaddress=0x5Bd46de6E8d4e8Ba0fdd76ACC8d543bA07b58dE5&toaddress=0x15a2AD79Cfe458A5BB2b061CCfc99426122Ac46a&tokenid=4

How to run (older version with front end + backend together) :
1. In root folder, run command "npm run dev"
2. Open http://localhost:3000/ in browser
3. Enter an adddress and tokn id to mint NFT token.
