movementRight = int(input("Enter how many moves right: "))
movementDown = int(input("Enter how many moves down: "))

with open("input.txt") as file: 
    v = [x for x in file.read().split("\n")[::movementDown]]

treesEncountered = 0
columnCounter = 0
width = len(v[0])
for y in v:
    treesEncountered = treesEncountered + (y[columnCounter % width] == "#")
    columnCounter += movementRight

print("number of trees: " + str(treesEncountered))


# 3,1 195 trees
# 1,1 84 trees
# 5,1 70 trees
# 7,1 70 trees
# 1,2 47 trees
print("Number of trees on five slopes: " + str(195*84*70*70*47))