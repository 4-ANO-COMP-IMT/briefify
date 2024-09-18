import amqp from 'amqplib';

export class Subscriber {
  private channel: amqp.Channel | null = null;

  constructor(private queue: string, private onMessage: (msg: string) => void) {}

  async connect() {
    try {
      const connection = await amqp.connect('amqp://localhost');
      this.channel = await connection.createChannel();
      await this.channel.assertQueue(this.queue, { durable: true });
      this.consumeMessages();
    } catch (error) {
      console.error('Error connecting to RabbitMQ:', error);
    }
  }

  private consumeMessages() {
    if (!this.channel) {
      console.error('RabbitMQ channel is not initialized');
      return;
    }
    this.channel.consume(this.queue, (message) => {
      if (message !== null) {
        const messageContent = message.content.toString();
        console.log(`Message received from queue ${this.queue}: ${messageContent}`);
        this.onMessage(messageContent);
        this.channel?.ack(message);
      }
    }, { noAck: false });
  }
}
