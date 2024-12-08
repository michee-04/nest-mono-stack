dependenciesService = {
  name: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  status: {
    type: String,
    enum: ['draft', 'active', 'archived', 'deprecated'],
    default: 'draft',
  },
  category: {
    type: String,
    enum: ['papier', 'citoyen', 'particulier'],
    default: 'papier',
  },
  subCategory: {
    type: String,
    enum: ['XPortal', 'Sandbox'],
    default: 'XPortal',
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
  target: {
    type: String,
    enum: ['compte', 'mixte', 'particulier', 'professionnel'],
    default: 'mixte',
  },
  version: {
    type: Number,
  },
  deletedAt: Date,
  deletedBy: userId,
  createdBy: userId,
  updatedBy: userId,
  createdAt: Date,
  updatedAt: Date,
};

serviceSchema = {
  name: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  status: {
    type: String,
    enum: ['draft', 'active', 'archived', 'deprecated'],
    default: 'draft',
  },
  category: {
    type: String,
    enum: ['papier', 'citoyen', 'particulier'],
    default: 'papier',
  },
  subCategory: {
    type: String,
    enum: ['XPortal', 'Sandbox'],
    default: 'XPortal',
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
  target: {
    type: String,
    enum: ['compte', 'mixte', 'particulier', 'professionnel'],
    default: 'mixte',
  },
  version: {
    type: Number,
  },
  dependencies: {
    type: dependenciesService,
  },
  deletedAt: Date,
  deletedBy: userId,
  createdBy: userId,
  updatedBy: userId,
  createdAt: Date,
  updatedAt: Date,
};
