const expect = require('expect');
const request = require('supertest');

const { ObjectID } = require('mongodb');

const { app } = require('./../server');
const { Todo } = require('./../models/todo');
const { User } = require('./../models/user');

const { dummyTodoData, populateTodos, dummyUsersData, populateUsers } = require('./seed/seed');

// Call routines to wope and create two documents un users and todos
beforeEach(populateUsers);
beforeEach(populateTodos);

describe('POSTS /todos', () => {

  it('should create a new todo', (done) => {
    var text = 'Test todo text';

    request(app)
      .post('/todos')
      .send({ text })
      .expect(200)
      .expect((res) => {
        expect(res.body.text).toBe(text);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Todo.find({ text }).then((todos) => {
          expect(todos.length).toBe(1);
          expect(todos[0].text).toBe(text);
          done();
        }).catch((error) => done(error));
      });
  });

  it('should not create todo with invalid body data', (done) => {
    request(app)
      .post('/todos')
      .send({})
      .expect(400)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        Todo.find().then((todos) => {
          expect(todos.length).toBe(2);
          done();
        }).catch((error) => done(error));
      });
  });

});

describe('GET /todos', () => {
  it('should get all todos', (done) => {
    request(app)
      .get('/todos')
      .expect(200)
      .expect((res) => {
        expect(res.body.todos.length).toBe(2);
      })
      .end(done);

  })
});


describe('Get todos/ID tests', () => {
  it('should return todo doc', (done) => {
    request(app)
      .get(`/todos/${dummyTodoData[0]._id.toHexString()}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.todo.text).toBe(dummyTodoData[0].text);
      })
      .end(done);
  });

  it('should return 404 if todo not found', (done) => {

    var dummyNewID = new ObjectID();
    request(app)
      .get(`/todos/${dummyNewID.toHexString()}`)
      .expect(404)
      .end(done);
  });

  it('should return 404 for non-object ids', (done) => {
    request(app)
      .get(`/todos/123`)
      .expect(404)
      .end(done);
  });
});

describe('DELETE /todos/:id', () => {

  it('should remove a todo', (done) => {

    // Get the ID of the second document in the collection
    var hexId = dummyTodoData[1]._id.toHexString();
    request(app)
      .delete(`/todos/${hexId}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.todo._id).toBe(hexId);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        // Query the database to check the doc was actually deleted using findById
        Todo.findById(hexId).then((todo) => {
          expect(todo).toBeFalsy();
          done();
        }).catch((error) => done(error));

      })

  });

  it('should return a 404 if todo not found', (done) => {
    var dummyNewID = new ObjectID();
    request(app)
      .get(`/todos/${dummyNewID.toHexString()}`)
      .expect(404)
      .end(done);
  });

  it('should return 404 if object id is invalid', (done) => {
    request(app)
      .get(`/todos/123`)
      .expect(404)
      .end(done);
  });

});

describe('PATCH /todos/:id', () => {

  it('should update the todo', (done) => {

    var hexId = dummyTodoData[0]._id.toHexString();
    var text = 'This should be the new text from Mocha';

    request(app)
      .patch(`/todos/${hexId}`)
      .send({
        completed: true,
        text
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.todo.text).toBe(text);
        expect(res.body.todo.completed).toBe(true);
        expect(typeof res.body.todo.completedAt).toBe('number');
      })
      .end(done);
  });

  it('should clear completedAt when todo is not completed', (done) => {
    var hexId = dummyTodoData[1]._id.toHexString();
    var text = 'This is the second doc updated in Mocha';

    request(app)
      .patch(`/todos/${hexId}`)
      .send({
        completed: true,
        text
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.todo.text).toBe(text);
        expect(res.body.todo.completed).toBe(true);
        expect(res.body.todo.completedAt).toBeTruthy();
      })
      .end(done);
  });
});

describe('GET /users/me', () => {

  it('should return a user if authenticated', (done) => {
    request(app)
      .get('/users/me')
      .set('x-auth', dummyUsersData[0].tokens[0].token)    // Set Header
      .expect(200)
      .expect((res) => {
        expect(res.body._id).toBe(dummyUsersData[0]._id.toHexString());
        expect(res.body.email).toBe(dummyUsersData[0].email);
      })
      .end(done);
  });


  it('should return 401 if not authenticated', (done) => {
    request(app)
      .get('/users/me')
      .expect(401)
      .expect((res) => {
        expect(res.body).toEqual({});
      })
      .end(done);

  });
});


describe('POST /users', () => {

  it('should create a user', (done) => {

    var email = 'example@example.com';
    var password = '123123mmm!'
    request(app)
      .post('/users')
      .send({ email, password })
      .expect(200)
      .expect((res) => {
        expect(res.headers['x-auth']).toBeTruthy();
        expect(res.body._id).toBeTruthy();
        expect(res.body.email).toBe(email);
      })
      .end((error) => {
        if (error) {
          return done(error);
        }

        User.findOne({ email }).then((user) => {
          expect(user).toBeTruthy();
          expect(user.password).toNotBe(password);
          done();
        }).catch((error) => done(error));
      });


  });

  it('should return validation errors if request invalid', (done) => {
    request(app)
      .post('/users')
      .send({
        email: 'dd',
        password: '2'
      })
      .expect(400)
      .end(done);
  });

  it('should not create user if email is in use', (done) => {
    request(app)
      .post('/users')
      .send({
        email: dummyUsersData[0].email,
        password: 'ASDASDASD'
      })
      .expect(400)
      .end(done);
  });
});


describe('POST users/login', () => {
  it('should login user and return auth token', (done) => {

    request(app)
      .post('/users/login')
      .send({
        email: dummyUsersData[1].email,
        password: dummyUsersData[1].password
      })
      .expect(200)
      .expect((res) => {
        expect(res.headers['x-auth']).toExist();
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        User.findById(dummyUsersData[1]._id).then((user) => {
          expect(user.tokens[0]).toInclude({
            access: 'auth',
            token: res.headers['x-auth']
          });
          done();
        }).catch((error) => done(error));

      })

  });

  it('should reject invalid login', (done) => {
    request(app)
      .post('/users/login')
      .send({
        email: dummyUsersData[1].email,
        password: 'the wrong password'
      })
      .expect(400)
      .expect((res) => {
        expect(res.headers['x-auth']).toNotExist();
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        User.findById(dummyUsersData[1]._id).then((user) => {
          expect(user.tokens.length).toBe(0);
          done();
        }).catch((error) => done(error));

      })
  });
});

describe('DELETE /users/me/token', () => {
  it('should remove auth token on logout', (done) => {

    request(app)
      .delete('/users/me/token')
      .set('x-auth', dummyUsersData[0].tokens[0].token)
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        User.findById(dummyUsersData[0]._id).then((user) => {
          expect(user.tokens.length).toBe(0);
          done()
        }).catch((error) => done(error));
      });
  });
});