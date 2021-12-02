from enum import Enum

class Direction(str, Enum): 
  down = "down"
  up = "up"
  forward = "forward"

f = open('tests/input.in', "r")

horizontal = 0
depth = 0

for x in f: 
  split = x.split(" ")
  incNum = int(split[1].replace("\n", ""))
  motion = split[0]
  if(motion == Direction.up):
    depth = depth - incNum
  if(motion == Direction.down): 
    depth = depth + incNum
  if(motion == Direction.forward):
    horizontal = horizontal + incNum

print("Horizontal: " + str(horizontal))
print("Depth: " + str(depth))
print("Part 1 answer: " + str(horizontal*depth))