# rsproxy (Python version)

## Instructions

To execute the project you have to specify the server port as an argument:

    $ python src/main.py <port>

### Running in Webots (without the UDP socket)

If you want to run your strategy directly in webots you need to copy all the files from `src` into the corresponding controller folder (inside `controllers` in the webots folder structure). Then, rename the `main.py` file so that it matches the controller's name, otherwise webots won't find it.

### Running the tests

To run the unit tests:

    $ python -m unittest