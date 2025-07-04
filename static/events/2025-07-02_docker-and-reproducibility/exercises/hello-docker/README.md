# 🐳 Hello from Docker

This is a simple example to demonstrate how to use a **Dockerfile** to run a basic Python script inside a container.

## 📄 Files

- `Dockerfile` – defines the container environment
- `app.py` – a simple script that prints a message

## ▶️ How to Run

1. Open a terminal and go to this folder.
2. Build the image:

   ```bash
   docker build -t hello-docker .
   ```

3. Run the container:
   `bash
    docker run hello-docker
    `
   The output would be:

```
Hello from inside a Docker container!
```
