import csv 

with open('data.csv', 'r') as f:
    reader = csv.reader(f)
    tags = reader.next()
    data = zip(*[row for row in reader])
    
    