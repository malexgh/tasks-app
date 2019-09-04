const request = require('supertest');
const app = require('../src/app');
const User = require('../src/models/user');
const { userOne, setupDatabase } = require('./fixtures/db')

beforeEach(setupDatabase);

// Should not signup user with invalid name/email/password
// Should not update user if unauthenticated
// Should not update user with invalid name/email/password
// Should not delete user if unauthenticated

test('Should signup a new user', async () => {
    const response = await request(app).post('/users').send({
        name: 'Marcio',
        email: 'marcio@example.com',
        password: 'MyPass666!'
    }).expect(201);
    const user = await User.findById(response.body.user._id);
    expect(user).not.toBeNull();
    expect(response.body).toMatchObject({
        user: {
            name: 'Marcio',
            email: 'marcio@example.com'
        },
        token: user.tokens[0].token
    });
    expect(user.password).not.toBe('MyPass666!');
});

test('Should not signup a new user', async () => {
    await request(app).post('/users').send({
        name: 'Marcio',
        email: 'marcio@example.com',
        password: 'abc'
    }).expect(400);
});

test('Should login a existing user', async () => {
    const response = await request(app).post('/users/login').send({
        email: userOne.email,
        password: userOne.password
    }).expect(200);
    const user = await User.findById(userOne._id);
    expect(user).not.toBeNull();
    expect(response.body.token).toBe(user.tokens[1].token);
});

test('Should not login nonexisting user', async () => {
    await request(app).post('/users/login').send({
        email: 'anyemail',
        password: 'anypassword'
    }).expect(400);
});

test('Should get profile for user', async () => {
    await request(app)
        .get('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200);
});

test('Should not get profile for unauthenticated user', async () => {
    await request(app)
        .get('/users/me')
        .send()
        .expect(401);
});

test('Should delete profile for user', async () => {
    await request(app)
        .delete('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200);
    const user = await User.findById(userOne._id);
    expect(user).toBeNull();
});

test('Should not delete profile for unauthenticated user', async () => {
    await request(app)
        .delete('/users/me')
        .send()
        .expect(401);
});

test('Should upload avatar image', async () => {
    await request(app)
        .post('/users/me/avatar')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .attach('avatar', 'test/fixtures/profile-pic.jpg')
        .expect(200);
    const user = await User.findById(userOne._id);
    expect(user.avatar).toEqual(expect.any(Buffer));
});

test('Should update valid user fields', async () => {
    await request(app).patch('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({ name: 'Roberto' })
        .expect(200);
    const user = await User.findById(userOne._id);
    expect(user.name).toBe('Roberto');
});

test('Should not update invalid user fields', async () => {
    await request(app).patch('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({ location: 'anywhere' })
        .expect(400);
});
