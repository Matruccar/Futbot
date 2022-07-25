# HACK(Richo): Python is such a mess that doing something as simple 
# as keeping the tests separate from the source involves some weird
# hacks. In this case, I took the code from the following answer:
# https://stackoverflow.com/a/59732673
import os
import sys
PROJECT_PATH = os.getcwd()
SOURCE_PATH = os.path.join(
    PROJECT_PATH,"src"
)
sys.path.append(SOURCE_PATH)