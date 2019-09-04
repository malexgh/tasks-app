const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URL,
    { useNewUrlParser: true, useCreateIndex: true }
);

// const me = new User({ name: 'Marcio', age: 48 });
// me.save().then(() => {
//     console.log(me);
// }).catch((error) => {
//     console.log('Error:', error);
// });

// const me = new User({
//     name: '  Marcio  ',
//     email: '  marcio@dev.io  ',
//     password: '1234567'
// });
// me.save().then(() => {
//     console.log(me);
// }).catch((error) => {
//     console.log('Error:', error);
// });

// const task = new Task({ description: 'Watch section 11', completed: false });
// task.save().then(() => {
//     console.log(task);
// }).catch((error) => {
//     console.log('Error:', error);
// });

// const task = new Task({ description: ' Watch section 11 ' });
// task.save().then(() => {
//     console.log(task);
// }).catch((error) => {
//     console.log('Error:', error);
// });
