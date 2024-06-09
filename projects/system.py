from threading import Thread

from flask import Flask, jsonify


class TokenBucket:
    def __init__(self, size, refill_rate) -> None:
        self.size = size
        self.refill_rate = refill_rate
        self.count = size

    def refill(self):
        self.count = self.size

    def take(self):
        if self.count == 0:
            return False

        self.count -= 1
        return True


class LeakingBucket:
    def __init__(self, size) -> None:
        from collections import deque

        self.size = size
        self.que = deque(size)

    def add(self, req):
        self.que.append(req)

    def get(self):
        return self.que.pop()


def rate_limit(limit):
    def decorator(f):
        def wrapper(*args, **kwargs):
            if limit.take():
                return f(*args, **kwargs)
            else:
                return jsonify({"error": "limit reached"}), 429

        return wrapper

    return decorator


def start_refill_thread(bucket):
    def refill(bucket):
        import time

        while True:
            time.sleep(bucket.refill_rate)
            bucket.refill()

    thread = Thread(target=refill, args=(bucket,))
    thread.start()


bucket = TokenBucket(10, 5)

start_refill_thread(bucket)

app = Flask(__name__)


@app.route("/")
@rate_limit(bucket)
def token():
    return jsonify({"message": "success"}), 200


if __name__ == "__main__":
    app.run(debug=False)
