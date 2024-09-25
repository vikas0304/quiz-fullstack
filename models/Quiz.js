import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema({
  id: { type: String, required: true },
  question: { type: String, required: true },
  options: { type: [String], required: true },
  correctAnswer: { type: String, required: true },
  difficulty: { type: String, enum: ['easy', 'medium', 'hard'], required: true }
});

questionSchema.set('toJSON' ,{
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })

const quizSchema = new mongoose.Schema({
  id: { type: String, required: true },
  title: { type: String, required: true },
  category: { type: String, required: true },
  questions: { type: [questionSchema], required: true }
});


quizSchema.set('toJSON' ,{
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })

const Quiz = mongoose.model('Quiz', quizSchema);

export default Quiz;
