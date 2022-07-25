# -*- coding: utf-8 -*-

# Restringe el valor numérico "n" entre "smallest" y "largest"
def clamp(n, smallest, largest): 
    return max(smallest, min(n, largest))
