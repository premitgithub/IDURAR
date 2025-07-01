export const fields = {
  role: {
    type: 'string',
    required: true,
  },
   name: {
    type: 'string',
  },
  userID: {
    type: 'string',
  },
  phoneNo: {
    type: 'string'
  },
  email: {
    type: 'email',
  },
  course: {
    type: 'string',
  },
  degree: {
    type: 'string',
  },
  academicYear: {
    type: 'string',
  },
  department: {
    type: 'string',
  },
  joiningDate: {
    type: 'string',
  },
  experience: {
    type: 'string',
  },
  documents: {
    type: 'file',
  },
};

export const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
  },
  {
    title: 'Role',
    dataIndex: 'role',
  },
  {
    title: 'UserID',
    dataIndex: 'userID',
  },
  {
    title: 'Phone No',
    dataIndex: 'phoneNo',
  },
  {
    title: 'Password',
    dataIndex: 'password',
  },
  {
    title: 'Email',
    dataIndex: 'email',
  },
  {
    title: 'Phone',
    dataIndex: 'phone',
  },
  {
    title: 'Address',
    dataIndex: 'address',
  },
  {
    title: 'Course',
    dataIndex: 'course',
  },
  {
    title: 'Degree',
    dataIndex: 'degree',
  },
  {
    title: 'Academic Year',
    dataIndex: 'academicYear',
  },
  {
    title: 'Department',
    dataIndex: 'department',
  },
  {
    title: 'Joining Date',
    dataIndex: 'joiningDate',
  },
  {
    title: 'Experience',
    dataIndex: 'experience',
  },
  {
    title: 'Documents',
    dataIndex: 'documents',
  }
];

export default {
  entity: 'client',
  title: 'User',
  fields,
  columns,
  searchConfig: {
    displayLabels: ['name', 'role'],
    searchFields: 'name,role,email',
    outputValue: '_id',
  },
};
