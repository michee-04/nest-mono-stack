messageData = {
  source: {
    type: String,
    required: true,
  },
  contentType: {
    type: String,
  },
  subject: {
    type: String,
  },
  correlationId: {
    type: String,
  },
};

messageSchema = {
  data: {
    type: [mongoose.Schema.Types.Mixed],
  },
  messageType: {
    type: String,
    required: true,
  },
  metaData: {
    type: messageData,
  },
  status: {
    type: String,
    enum: ['SUCCESS', 'FAILED', 'SUBMITED'],
    default: 'SUBMITED',
  },
};
