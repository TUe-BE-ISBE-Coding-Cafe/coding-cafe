with open("/data/output.txt", "w") as f:
    f.write("Saved from inside the container!\n")

print("File written to /data/output.txt")
