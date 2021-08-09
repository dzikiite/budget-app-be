import mongoose from 'mongoose';

const connectToDb = () => {
  const { MONGO_URI } = process.env;

  mongoose
    .connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    })
    .then(() => {
      console.log('DB connected succesfully!');
    })
    .catch((err) => {
      console.log(err);
    });
};

export default connectToDb;
