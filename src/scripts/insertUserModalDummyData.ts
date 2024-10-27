import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import UserModel from '../models/userProfile.model'; // Adjust the import path as necessary
import { generateUniqueUserId } from '@/utils/auth.utils';
import { ROLE, USER_TYPE } from '@/constants/user';

const DB_CONNECTION_STRING = 'mongodb://localhost:27017/pramaan';

const users = [
  {
    user_id: generateUniqueUserId(),
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
  },
  {
    user_id: generateUniqueUserId(),
    first_name: 'Akshat',
    last_name: 'Gupta',
    profile_picture:
      'https://img.freepik.com/free-photo/young-adult-enjoying-virtual-date_23-2149328221.jpg?t=st=1729603371~exp=1729606971~hmac=85f9e8cbd2d0704b92cf4a213b259309ad2898aace468b53d71866c98c5a85e2&w=360',
    password: 'mypassword@456',
    email: 'akshatgupta3000@gmail.com',
    role: ROLE.super_admin,
    user_type: USER_TYPE.system,
    is_active: true,
    phone_number: '7777777777',
    last_active: new Date('2024-10-22T12:34:56Z'),
    is_deactivated: false,
  },
];

async function insertDummyData() {
  try {
    console.log('Attempting to connect to the database...');
    await mongoose.connect(DB_CONNECTION_STRING);
    console.log('Connected to the database.');

    for (const user of users) {
      console.log(`Hashing password for user: ${user.email}`);
      user.password = await bcrypt.hash(user.password, 10);
      console.log(`Inserting user: ${user.email}`);
      const newUser = await UserModel.create(user);
      console.log('Inserted user:', newUser);
    }

    console.log('Dummy data insertion complete.');
  } catch (error) {
    // Type assertion to ensure error has a message property
    const errorMessage = (error as Error).message || 'Unknown error occurred';
    console.error('Error inserting dummy data:', errorMessage);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from the database.');
  }
}

// Run the script
insertDummyData();
