import sys
import os

# Ensure root directory is in sys.path for Vercel Serverless Function imports
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from fastdesk.main import app as fastapi_app


class VercelPathMiddleware:
    def __init__(self, app):
        self.app = app

    async def __call__(self, scope, receive, send):
        if scope["type"] in ("http", "websocket"):
            headers = dict(scope.get("headers", []))
            matched_path = headers.get(b"x-matched-path", b"").decode("utf-8")
            forwarded_uri = headers.get(b"x-forwarded-uri", b"").decode("utf-8")

            if matched_path and matched_path != "/api/index":
                scope["path"] = matched_path.split("?")[0]
            elif forwarded_uri and not forwarded_uri.startswith("/api/index"):
                scope["path"] = forwarded_uri.split("?")[0]
            else:
                path = scope.get("path", "")
                for prefix in ("/api/index.py", "/api/index", "/api"):
                    if path == prefix:
                        scope["path"] = "/"
                        break
                    elif path.startswith(prefix + "/"):
                        scope["path"] = path[len(prefix):]
                        break
        await self.app(scope, receive, send)


app = VercelPathMiddleware(fastapi_app)
