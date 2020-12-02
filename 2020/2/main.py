f = open("input.txt", "r")

validCount = 0
validCount2 = 0

for x in f: 
    split1 = x.split(":")
    pw = split1[1].replace("\n", "")
    split2 = split1[0].split("-")
    minNum = int(split2[0])
    split3 = split2[1].split(" ")
    maxNum = int(split3[0])
    ruleLetter = split3[1]
    ruleLetterOccurence = 0
    for letter in pw: 
        if letter == ruleLetter: 
            ruleLetterOccurence = ruleLetterOccurence + 1
    
    if ruleLetterOccurence >= minNum and ruleLetterOccurence <= maxNum: 
        validCount = validCount + 1


## Part 2 
    splitPassword = [char for char in pw]
    ## Because our pw has a space in front we dont have to deal with index 0 in terms of positioning
    if (ruleLetter == splitPassword[minNum] or ruleLetter == splitPassword[maxNum]) and not (ruleLetter == splitPassword[minNum] and ruleLetter == splitPassword[maxNum]):
        validCount2 = validCount2 + 1
    
print("Part 1 answer: " + str(validCount))
print("Part 2 answer: " + str(validCount2))

