import { Hono } from 'hono';
import { serve } from '@hono/node-server';
import { cors } from 'hono/cors';

import * as authController from './controllers/authController';
import * as iotDeviceController from './controllers/iotDeviceController';
import * as userController from './controllers/UserController';
import { findUserByUsername } from './repository/userRepository'; // Import the function

const app = new Hono();

app.use(
  '*',
  cors({
    origin: 'http://localhost:5173',
  })
);

// Example backend logic for /login
app.post('/login', async (c) => {
  const { username, password } = await c.req.json();
  const user = findUserByUsername(username);

  if (user && user.password === password) {
    return c.json({ username: user.username }); // Ensure this response is returned
  } else {
    return c.json({ error: 'Invalid credentials' }, 401);
  }
});

app.post('/register', authController.register);

app.get('/IotEnheter', iotDeviceController.getAllDevices);
app.get('/IotEnheter/:id', iotDeviceController.getDeviceById);
app.post('/IotEnheter', iotDeviceController.createDevice);
app.put('/IotEnheter/:id', iotDeviceController.updateDevice);
app.delete('/IotEnheter/:id', iotDeviceController.deleteDevice);

app.get('/users', userController.getAllUsers);
app.post('/users', userController.createUser);

const port = 6969;

serve({
  fetch: app.fetch,
  port: port,
});

console.log(`Server is running on port ${port}`);
