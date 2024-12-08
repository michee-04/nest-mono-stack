authSchema = {
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active',
  },
  verified: {
    type: Boolean,
  },
  resetPasswordToken: {
    type: String,
  },
  resetPasswordExpires: {
    type: Date,
  },
  deletedAt: Date,
  deletedBy: userId,
  createdBy: userId,
  updatedBy: userId,
  createdAt: Date,
  updatedAt: Date,
};
