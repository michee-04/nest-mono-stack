ownerRequest = {
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  city: {
    type: String,
  },
  details: {
    type: String,
  },
  deletedAt: Date,
  deletedBy: userId,
  createdBy: userId,
  updatedBy: userId,
  createdAt: Date,
  updatedAt: Date,
};
