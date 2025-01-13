import mongoose from 'mongoose';
import fetch from 'node-fetch';
import { generateUniqueUserId } from '@/utils/auth.utils';
import { ROLE, USER_TYPE } from '@/constants/user';

const DB_CONNECTION_STRING = 'mongodb://localhost:27017/pramaan';
const SCHOOL_API_URL = 'http://localhost:3005/pathshala/api/v1/internal/school/create';
const GET_SCHOOL_API_URL = 'http://localhost:3005/pathshala/api/v1/internal/school/';
const SIGNUP_API_URL = 'http://localhost:3004/pramaan/api/v1/platform/auth/signup';
const LOGIN_API_URL = 'http://localhost:3004/pramaan/api/v1/platform/auth/login';

// Admin Details to login
const admin = {
  user_id: 'user_001',
  first_name: 'Pratik',
  last_name: 'Khulge',
  profile_picture:
    'https://img.freepik.com/free-photo/young-adult-enjoying-virtual-date_23-2149328221.jpg?t=st=1729603371~exp=1729606971~hmac=85f9e8cbd2d0704b92cf4a213b259309ad2898aace468b53d71866c98c5a85e2&w=360',
  password: 'Password@123',
  email: 'pratikkhulge@gmail.com',
  role: ROLE.super_admin,
  user_type: USER_TYPE.system,
  is_active: true,
  phone_number: '8888888888',
  last_active: new Date('2024-10-22T12:34:56Z'),
  is_deactivated: false,
};

// School payload
const schoolPayload = {
  name: 'DPS Bangalore',
  address: {
    line1: 'Survey No.43/1B & 45, Sulikunte Village',
    city: 'Bangalore',
    state: 'Karnataka',
    postalCode: '562125',
  },
  boardAffiliation: 'CBSE',
  boardAffiliationNumber: '123456789',
  establishmentYear: 2000,
  contactInfo: {
    phone: ['9663783617', '6364547474', '9663115148'],
    email: ['contact@east.dpsbangalore.edu.in', 'admissions@east.dpsbangalore.edu.in'],
  },
  principalName: 'Mr. Sharma',
  domain: 'localhost:3004',
};

// Users to insert
const users = [
  {
    user_id: generateUniqueUserId(),
    first_name: 'Shreya',
    last_name: 'Sharma',
    profile_picture:
      'https://img.freepik.com/free-photo/young-adult-enjoying-virtual-date_23-2149328221.jpg?t=st=1729603371~exp=1729606971~hmac=85f9e8cbd2d0704b92cf4a213b259309ad2898aace468b53d71866c98c5a85e2&w=360',
    password: 'password@123',
    email: 'shreyasharma@gmail.com',
    role: ROLE.admin,
    user_type: USER_TYPE.user,
    phone_number: '8054014351',
  },
];

async function schoolCreationScript() {
  console.log('=====================================');
  console.log('Phase 1: Script started...');
  try {
    console.log('Attempting to connect to the database...');
    await mongoose.connect(DB_CONNECTION_STRING);
    console.log('Connected to the database.');

    // Step 1: Check for existing school with the same boardAffiliationNumber
    console.log('=====================================');
    console.log('Phase 2: Checking for existing school...');
    const queryParams = new URLSearchParams({
      identifier: JSON.stringify({ boardAffiliationNumber: schoolPayload.boardAffiliationNumber }),
    }).toString();
    const url = `${GET_SCHOOL_API_URL}?${queryParams}`;
    const existingSchool = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    // const existingSchool = await mongoose.connection.collection('schools').findOne({ boardAffiliationNumber: schoolPayload.boardAffiliationNumber });

    if (existingSchool.ok) {
      const schoolDetails = await existingSchool.json();
      console.dir(schoolDetails, { depth: 10 });
      console.log(`School with boardAffiliationNumber ${schoolPayload.boardAffiliationNumber} already exists. School ID: ${schoolDetails._id}`);
      return;
    }

    // Step 3: Create School
    console.log('=====================================');
    console.log('Phase 3: School creation initiated...');
    const schoolResponse = await fetch(SCHOOL_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(schoolPayload),
    });

    if (!schoolResponse.ok) {
      const errorText = await schoolResponse.text();
      throw new Error(`Failed to create school: ${schoolResponse.statusText}. Response: ${errorText}`);
    }

    const schoolData = await schoolResponse.json();
    const schoolId = schoolData._id;
    console.log(`School created with ID: ${schoolId}`);

    // Step 4: Login to get the session token
    console.log('=====================================');
    console.log('Phase 4: User login initiated for signup...');
    const loginResponse = await fetch(LOGIN_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ identifier: admin.email, password: admin.password }),
    });

    if (!loginResponse.ok) {
      const errorText = await loginResponse.text();
      throw new Error(`Failed to login: ${loginResponse.statusText}. Response: ${errorText}`);
    }

    const loginData = await loginResponse.json();
    const sessionToken = loginData.sessionToken;
    console.log(`User logged in successfully. Session token received: ${sessionToken}`);

    // Step 5: Create Users
    console.log('=====================================');
    console.log('Phase 5: User signup initiated...');
    for (const user of users) {
      // Prepare user payload with school ID
      const signupPayload = {
        ...user,
        school_ids: [schoolId],
      };
      console.log(`User signup initiated for: ${user.email}`);
      const signupResponse = await fetch(SIGNUP_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'session-token': sessionToken,
        },
        body: JSON.stringify(signupPayload),
      });

      if (!signupResponse.ok) {
        const errorText = await signupResponse.text();
        throw new Error(`Failed to signup user ${user.email}: ${signupResponse.statusText}. Response: ${errorText}`);
      }

      const signupData = await signupResponse.json();
      console.log('User signup completed:', signupData);
    }

    console.log('All users successfully signed up.');
    console.log('Data insertion complete.');
  } catch (error) {
    const errorMessage = (error as Error).message || 'Unknown error occurred';
    console.error('Error inserting data:', errorMessage);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from the database.');
    console.log('=====================================');
    console.log('Phase 6: Script ended.');
  }
}

schoolCreationScript();
