# rsexample (ClojureScript version)

We're currently using [shadow-cljs](https://github.com/thheller/shadow-cljs) for development.

    $ npx shadow-cljs server

Wait until the server starts. Then, on a different terminal:

    $ npx shadow-cljs watch app

Now wait until the build is completed. 

Then start the node process by executing the produced script in another terminal (if the compilation is succesful it should be in `out/rsteam/main.js`).

    $ node out/rsteam/main.js <port>

Connect to the nrepl server as usual.

## Testing

In order to run the tests on every change you should do the above and then

    $ npx shadow-cljs watch test

Now whenever the code changes the tests will run on the first terminal (the one running the shadow-cljs server)
