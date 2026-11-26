import type { LogEntry } from '@averyden/logline'

function sample(
  minutesAgo: number,
  entry: Omit<LogEntry, 'timestamp'> & { timestamp?: Date },
): LogEntry {
  return {
    timestamp: new Date(Date.now() - minutesAgo * 60_000),
    ...entry,
  }
}

export const sampleEntries: LogEntry[] = [
  sample(5, {
    level: 'info',
    message: 'Checkout started',
    service: 'checkout-api',
    environment: 'production',
    tags: ['checkout'],
    metadata: { orderId: 'order-123' },
  }),
  sample(4, {
    level: 'debug',
    message: 'Cart validated',
    tags: ['checkout'],
    metadata: { items: 3 },
  }),
  sample(2, {
    level: 'warn',
    message: 'Payment provider response was slow',
    service: 'checkout-api',
    metadata: { latencyMs: 2400 },
  }),
  sample(1, {
    level: 'error',
    message: 'Checkout failed',
    service: 'checkout-api',
    metadata: { orderId: 'order-123' },
    error: {
      name: 'PaymentError',
      message: 'Payment declined by provider',
      stack: [
        'PaymentError: Payment declined by provider',
        '    at processCheckout (src/checkout.ts:42:11)',
        '    at async handleRequest (src/server.ts:18:5)',
      ].join('\n'),
    },
  }),
]

export const discordSample: LogEntry = sample(1, {
  level: 'fatal',
  message: 'Checkout failed',
  service: 'checkout-api',
  environment: 'production',
  tags: ['checkout', 'payment'],
  metadata: { orderId: 'order-123', latencyMs: 2400 },
  error: {
    name: 'PaymentError',
    message: 'Payment declined by provider',
  },
})
