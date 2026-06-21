#!/usr/bin/env python3
"""Servidor local simples para pré-visualizar a landing page."""

from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path

HOST = "127.0.0.1"
PORT = 8000

class Handler(SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header("Cache-Control", "no-store")
        super().end_headers()

if __name__ == "__main__":
    root = Path(__file__).resolve().parent
    print(f"Servidor iniciado em http://{HOST}:{PORT}")
    print(f"Pasta: {root}")
    httpd = ThreadingHTTPServer((HOST, PORT), Handler)
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nServidor encerrado.")
