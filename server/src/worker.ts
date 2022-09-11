import amqplib from "amqplib";

(async () => {
  const queue = "tasks";
  const conn = await amqplib.connect("amqp://localhost");

  const ch1 = await conn.createChannel();
  await ch1.assertQueue(queue);

  // Listener
  ch1.consume(queue, (msg) => {
    if (msg !== null) {
      console.log("Recieved:", msg.content.toString());
      ch1.ack(msg);
    } else {
      console.log("Consumer cancelled by server");
    }
  });
})();
