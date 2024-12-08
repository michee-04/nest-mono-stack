userSchema = {
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  birthOfDate: {
    type: Date,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
  country: {
    type: String,
  },
  city: {
    type: String,
  },
  address: {
    type: String,
  },
  access: {
    groups: {
      type: String,
      enum: ['admins', 'managers'],
    },
    roles: {
      type: String,
      enum: ['admin', 'managers', 'editor', 'User', 'Designer', 'TeamLeader'],
      default: 'User',
    },
  },
  verified: {
    type: Boolean,
    default: false,
  },
  status: {
    type: Boolean,
    default: false,
  },
  deletedAt: Date,
  deletedBy: userId,
  createdBy: userId,
  updatedBy: userId,
  createdAt: Date,
  updatedAt: Date,
};
