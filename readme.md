# Airbitz Web CLI

This web app allows you to run the Airbitz CLI in your browser. It supports the same commands as the [`airbitz-cli`](https://github.com/Airbitz/airbitz-cli) command-line tool. You can see documentation by running the `help` command.

## Installing

This branch has a hard dependency on `../airbitz-currency-shitcoin`. We need to set that up first:

    cd ..
    git clone https://github.com/Airbitz/airbitz-currency-shitcoin.git
    cd airbitz-currency-shitcoin
    yarn

Now we can build the web CLI itself:

    cd ../airbitz-cli-web
    yarn
    yarn start

Once that's done, just launch `assets/index.js` in your favorite browser.

If you would like to work with a different currency, like Ethereum, just search & replace `shitcoin` in the following files:

* package.json
* src/tx.js

You might want to stick a different private key in to the `tx-make-engine` command in `src/tx.js`.
