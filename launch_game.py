import os
import threading
import time
import webbrowser
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer

PORT = 8000


def main():
    script_dir = os.path.dirname(os.path.abspath(__file__))
    os.chdir(script_dir)

    server = ThreadingHTTPServer(("localhost", PORT), SimpleHTTPRequestHandler)
    thread = threading.Thread(target=server.serve_forever, daemon=True)
    thread.start()

    url = f"http://localhost:{PORT}/index.html"
    # Give the server a moment to start up before opening the browser
    time.sleep(1)
    webbrowser.open(url)

    print(f"Serving CveCrwlr on {url}\nPress Ctrl+C to stop the server.")
    try:
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        print("\nShutting down server...")
    finally:
        server.shutdown()


if __name__ == "__main__":
    main()
