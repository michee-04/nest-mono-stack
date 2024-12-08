formSchema = {
  title: {
    type: String,
    required: true,
  },
  label: {
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
  components: {
    type: [mongoose.Schema.Types.Mixed],
    default: [],
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
  version: {
    type: Number,
    required: true,
  },
  deletedAt: Date,
  deletedBy: userId,
  createdBy: userId,
  updatedBy: userId,
  createdAt: Date,
  updatedAt: Date,
};
