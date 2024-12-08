workflowSchema = {
  title: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  service: {
    type: String,
    required: true,
  },
  schemas: {
    xml: { type: String },
    json: { type: String },
  },
  access: {
    groups: {
      type: String,
      enum: ['admins', 'managers'],
    },
    roles: {
      type: String,
      enum: ['admin', 'editor'],
    },
  },
  active: {
    type: Boolean,
  },
  version: {
    type: Number,
  },
  tag: {
    type: String,
    enum: ['approval', 'finance'],
  },
  status: {
    type: String,
    enum: ['draft', 'active', 'archived', 'deprecated'],
    default: 'draft',
  },
  deletedAt: Date,
  deletedBy: userId,
  createdBy: userId,
  updatedBy: userId,
  createdAt: Date,
  updatedAt: Date,
};
