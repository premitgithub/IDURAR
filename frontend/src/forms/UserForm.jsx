import { Form, Input, Upload, Button } from 'antd';
//uses Ant Design Components for form creation, input fields, file upload, and buttons

const UserForm = ({ role }) => {//userForm component receiving role as a prop for dynamically using the form
  const fields = [];// array that stores all JSX elements that are to be rendered

  // Common field for all roles
  fields.push(
    <Form.Item name="name" label="Name" rules={[{ required: true }]}>{/* Form.Item links to related fields like Input directly into the Form*/}
      <Input />
    </Form.Item>,
    <Form.Item name="email" label="Email ID" rules={[{ required: true }]}>
        <Input />
    </Form.Item>,
    <Form.Item name="userID" label="UserID" rules={[{ required: true }]}>
        <Input />
    </Form.Item>,
    <Form.Item name="phoneNo" label="Phone No" rules={[{ required: true }]}>
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
        <Input placeholder="dd/mm/yyyy"/>
      </Form.Item>,
      <Form.Item name="experience" label="Experience" rules={[{ required: true }]}>
        <Input />
      </Form.Item>,
    <Form.Item
          name="documents"
          label="Upload Documents"
          valuePropName="fileList"
          getValueFromEvent={(e) => {
            if (Array.isArray(e)) return e;
            return e?.fileList;
           }}
      >
      <Upload
        listType="text"
        beforeUpload={() => false} // Prevent auto-upload
        multiple
      >
      <Button>Click to Upload</Button>
      </Upload>
    </Form.Item>

    );
  }

  return <>{fields}</>; // Return as JSX
};

export default UserForm;
