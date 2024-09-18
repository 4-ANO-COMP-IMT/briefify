import amqp from 'amqplib';

export class Publisher {
  private channel: amqp.Channel | null = null;

  constructor(private queue: string) {}

  async connect() {
    try {
      const connection = await amqp.connect('amqp://localhost');
      this.channel = await connection.createChannel();
      await this.channel.assertQueue(this.queue, { durable: true });
    } catch (error) {
      console.error('Error connecting to RabbitMQ:', error);
    }
  }

  async publish(message: string) {
    if (!this.channel) {
      console.error('RabbitMQ channel is not initialized');
      return;
    }
    try {
      this.channel.sendToQueue(this.queue, Buffer.from(message), { persistent: true });
      console.log(`Message sent to queue ${this.queue}: ${message}`);
    } catch (error) {
      console.error('Error publishing message:', error);
    }
  }
}
