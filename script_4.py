# Now create the complete app.js by combining all parts
with open('app_part1.js', 'r') as f:
    part1 = f.read()
with open('app_part2.js', 'r') as f:
    part2 = f.read()
with open('app_part3.js', 'r') as f:
    part3 = f.read()
with open('app_part4.js', 'r') as f:
    part4 = f.read()

# Combine all parts into complete app.js
complete_app_js = part1 + '\n\n' + part2 + '\n\n' + part3 + '\n\n' + part4

with open('app.js', 'w') as f:
    f.write(complete_app_js)

print("✅ Created complete app.js file with all enhanced features")
print("📁 Total lines of JavaScript:", len(complete_app_js.splitlines()))