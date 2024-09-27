import mongoose from 'mongoose';

const OptionSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  isCorrect: {
    type: Boolean,
    required: true,
  },
});

const QuizSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  options: [OptionSchema],
  categories: {
    type: [String],
    required: true,
  },
  difficulty: {
    type: String,
    enum: ['easy', 'medium', 'hard'],
    required: true,
  },
}, {
  timestamps: true,
  toJSON: {
    transform: (doc, ret) => {
      delete ret.__v; // Remove the __v field
      return ret;
    },
  },
});

const Quiz = mongoose.model('Quiz', QuizSchema);

export default Quiz;
