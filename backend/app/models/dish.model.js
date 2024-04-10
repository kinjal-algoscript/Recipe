const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');

const Schema = mongoose.Schema;

const dishSchema = new mongoose.Schema(
  {
      name: {
          type: String,
          required: true,
      },
      ingredients: {
          type: Schema.Types.Mixed,
          trim: true,
      },
      instructions: {
          type: Schema.Types.Mixed,
          trim: true,
      },
      duration: {
        type: String,
      },
      category: {
        type: String,
        enum: ['Breakfast', 'Lunch', 'Dinner'],
      },
      images: [
          {
              type: String
          }
      ],
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'users',
      required: true,
    },
    updatedBy: {
      type: Schema.Types.ObjectId,
      ref: 'users',
      required: false,
    },
    deletedBy: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true, usePushEach: true }, // UTC format
);

dishSchema.plugin(mongooseDelete, { overrideMethods: true, deletedAt: true });

dishSchema.methods = {
  toJSON() {
    return {
      id: this._id,
      name: this.name,
      ingredients: this.ingredients,
      instructions: this.instructions,
      duration: this.duration,
      category: this.category,
      images: this.images,
      createdBy: this.createdBy,
      createdAt: this.createdAt,
    };
  },
};
module.exports = mongoose.model('dish', dishSchema);
