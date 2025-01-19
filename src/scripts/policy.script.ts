import mongoose from 'mongoose';
import fetch from 'node-fetch';
import { generateUniqueUserId } from '@/utils/auth.utils';
import { ROLE, USER_TYPE } from '@/constants/user';

// Database connection string
const DB_CONNECTION_STRING = 'mongodb://localhost:27017/pramaan';

// Admin Details for login and user creation
const admin = {
  user_id: 'user_001',
  first_name: 'Pratik',
  last_name: 'Khulge',
  profile_picture:
    'https://img.freepik.com/free-photo/young-adult-enjoying-virtual-date_23-2149328221.jpg?t=st=1729603371~exp=1729606971~hmac=85f9e8cbd2d0704b92cf4a213b259309ad2898aace468b53d71866c98c5a85e2&w=360',
  password: 'password@123',
  email: 'pratikkhulge@gmail.com',
  role: ROLE.super_admin,
  user_type: USER_TYPE.system,
  is_active: true,
  phone_number: '8888888888',
  last_active: new Date('2024-10-22T12:34:56Z'),
  is_deactivated: false,
};

// User payloads to insert
const users = [
  {
    user_id: generateUniqueUserId(),
    first_name: 'Shreya',
    last_name: 'Sharma',
    profile_picture:
      'https://img.freepik.com/free-photo/young-adult-enjoying-virtual-date_23-2149328221.jpg?t=st=1729603371~exp=1729606971~hmac=85f9e8cbd2d0704b92cf4a213b259309ad2898aace468b53d71866c98c5a85e2&w=360',
    password: 'password@123',
    email: 'shreyasharma@gmail.com',
    role: ROLE.student,
    user_type: USER_TYPE.user,
    phone_number: '8054014351',
    attributes: {
      department: 'Computer Science',
      year: '2nd',
    },
  },
  {
    user_id: generateUniqueUserId(),
    first_name: 'Ravi',
    last_name: 'Verma',
    profile_picture:
      'https://img.freepik.com/free-photo/young-adult-enjoying-virtual-date_23-2149328221.jpg?t=st=1729603371~exp=1729606971~hmac=85f9e8cbd2d0704b92cf4a213b259309ad2898aace468b53d71866c98c5a85e2&w=360',
    password: 'password@123',
    email: 'raviverma@gmail.com',
    role: ROLE.admin,
    user_type: USER_TYPE.user,
    phone_number: '8054014352',
    attributes: {
      department: 'HR',
      year: '1st',
    },
  },
];

// Evaluate API URL
const EVALUATE_API_URL = 'http://localhost:3004/pramaan/api/v1/internal/policy/evaluate';

// Signup API URL
const SIGNUP_API_URL = 'http://localhost:3004/pramaan/api/v1/platform/auth/signup';
const LOGIN_API_URL = 'http://localhost:3004/pramaan/api/v1/platform/auth/login';

// Function to execute API calls
async function signUpAndEvaluate() {
  console.log('=====================================');
  console.log('Script started...');

  try {
    console.log('Attempting to connect to the database...');
    await mongoose.connect(DB_CONNECTION_STRING);
    console.log('Connected to the database.');

    // Create users
    for (const user of users) {
      // Admin creates users
      if (user.role === ROLE.admin) {
        console.log(`Admin ${user.first_name} creating user: ${user.email}`);

        // Simulate admin login to get session token
        const loginResponse = await fetch(LOGIN_API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: admin.email, password: admin.password }),
        });
        const loginData = await loginResponse.json();
        const sessionToken = loginData.sessionToken;

        const signUpResponse = await fetch(SIGNUP_API_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'session-token': sessionToken,
          },
          body: JSON.stringify(user),
        });

        const signUpData = await signUpResponse.json();
        console.log(`User signed up: ${signUpData}`);

        // Call evaluate API to check if admin has the privilege
        const evaluateResponse = await fetch(EVALUATE_API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userId: admin.user_id,
            privilege: 'create_user',
            resource: { user_id: user.user_id },
          }),
        });

        const evaluationResult = await evaluateResponse.json();
        console.log('Evaluation Result for Admin:', evaluationResult);
      } else {
        // Simulate student signup
        const signUpResponse = await fetch(SIGNUP_API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(user),
        });

        const signUpData = await signUpResponse.json();
        console.log(`User signed up: ${signUpData.email}`);

        // Call evaluate API to check if student has the privilege
        const evaluateResponse = await fetch(EVALUATE_API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userId: user.user_id,
            privilege: 'create_user',
            resource: { user_id: user.user_id },
          }),
        });

        const evaluationResult = await evaluateResponse.json();
        console.log('Evaluation Result for Student:', evaluationResult);
      }
    }

    console.log('All users processed.');
  } catch (error) {
    console.error('Error occurred:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from the database.');
    console.log('=====================================');
    console.log('Script ended.');
  }
}

// Execute the script
signUpAndEvaluate();
