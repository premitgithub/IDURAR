import { Form, Input, Select, DatePicker, Upload, Button } from 'antd';

const { Option } = Select;

const UserForm = ({ role }) => {
  const fields = [];

  // Common field for all roles
  fields.push(
    <Form.Item name="name" label="Name" rules={[{ required: true }]}>
      <Input />
    </Form.Item>,
    <Form.Item name="email" label="Email ID" rules={[{ required: true }]}>
        <Input />
    </Form.Item>,
    <Form.Item name="username" label="UserID" rules={[{ required: true }]}>
        <Input />
    </Form.Item>,
    <Form.Item name="password" label="Password" rules={[{ required: true }]}>
        <Input />
    </Form.Item>
  );

  if (role === 'Student') {
    fields.push(
      <Form.Item name="course" label="Course" rules={[{ required: true }]}>
        <Input />
      </Form.Item>,
      <Form.Item name="degree" label="Degree" rules={[{ required: true }]}>
        <Input />
      </Form.Item>,
      <Form.Item name="academicYear" label="Academic Year" rules={[{ required: true }]}>
        <Input />
      </Form.Item>,
    );
  } else if (role === 'Faculty') {
    fields.push(
      <Form.Item name="department" label="Department" rules={[{ required: true }]}>
        <Input />
      </Form.Item>,
      <Form.Item name="joiningDate" label="Joining Date" rules={[{ required: true }]}>
        <DatePicker />
      </Form.Item>,
      <Form.Item name="experience" label="Experience" rules={[{ required: true }]}>
        <Input />
      </Form.Item>,
      <Form.Item name="documents" label="Upload Documents">
        <Upload>
          <Button>Click to Upload</Button>
        </Upload>
      </Form.Item>
    );
  }

  return <>{fields}</>; // Return as JSX
};

export default UserForm;
