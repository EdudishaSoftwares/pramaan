// Role will define the user's privleges and access.
export enum ROLE {
  super_admin = "super_admin",
  admin = 'admin',
  student = 'student'
}

// User type defines if the user is an end-user or from our system.
export enum USER_TYPE {
  system = 'system',
  user = 'user'
}
