export const RMQ_PATTERNS = {
  USER: {
    REGISTERED: 'user.registered',
    DELETED: 'user.deleted',
  },
  COURSE: {
    PUBLISHED: 'course.published',
    LESSON_ADDED: 'lesson.added',
  },
  PAYMENT: {
    SUCCEEDED: 'payment.succeeded',
    FAILED: 'payment.failed',
  },
  VIDEO: {
    TRANSCODED: 'video.transcoded',
    UPLOADED: 'video.uploaded',
  },
} as const;

export const RMQ_QUEUES = {
  IDENTITY: 'identity.queue',
  COURSE: 'course.queue',
  PAYMENT: 'payment.queue',
  MEDIA: 'media.queue',
  LEARNING: 'learning.queue',
  NOTIFICATION: 'notification.queue',
} as const;
