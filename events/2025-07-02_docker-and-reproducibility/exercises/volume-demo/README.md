# 📦 Docker Volumes Example

This example shows how to use **Docker volumes** to save a file from inside a container to your host machine.

## 📄 Files

- `Dockerfile` – defines a simple Python environment
- `writer.py` – writes a message to `/data/output.txt`

## ▶️ How to Run

1. Open a terminal and go to this folder.
2. Build the image:

```bash
docker build -t volume-demo .
```

3. Run the container with volume mount:

```bash
docker run -v $(pwd)/data:/data volume-demo
```

## ✅ Result

After running, you will get a message on the terminal:

```
File written to /data/output.txt
```

Check your local data/ folder. It will contain output.txt file with content:

```
Saved from inside the container!
```
