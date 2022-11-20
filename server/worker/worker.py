"""
Worker
"""
import pika
from .file2pdf import to_pdf

HOST = "localhost"


def callback(ch, method, properties, body):
    """
    consume callback
    """
    print("Receive", body)

    path = body.decode('UTF-8')

    print("Convert File to PDF")
    to_pdf("txt", f"./uploads/{path}", path)


def main():
    """
    main
    """
    connection = pika.BlockingConnection(pika.ConnectionParameters(host=HOST))

    channel = connection.channel()

    channel.queue_declare(queue='tasks', durable=True)

    channel.basic_consume(queue='tasks', on_message_callback=callback)

    print("Waiting for messages. To exit press CTRL+C")
    channel.start_consuming()


if __name__ == "__main__":
    main()
