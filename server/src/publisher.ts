import amqplib, { Channel, Connection } from "amqplib";

const HOST_URL = "amqp://localhost";
const QUEUE_NAME = "tasks";

class Publisher {
  conn: Connection | undefined;
  ch: Channel | undefined;

  constructor() {}

  async setChannel() {
    const conn = await amqplib.connect(HOST_URL);

    const ch = await conn.createChannel();
    await ch.assertQueue(QUEUE_NAME);

    this.ch = ch;
  }

  send(message: string) {
    if (!this.ch) {
      throw new Error(`Didn't find channel.`);
    }

    this.ch.sendToQueue(QUEUE_NAME, Buffer.from(message));
  }

  close() {
    if (!this.conn) {
      throw new Error(`Didn't connect.`);
    }

    this.conn.close();
  }
}

export const publisher = new Publisher();
