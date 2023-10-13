import React from 'react';
import { Button, Form, Input } from 'antd';

const onFinish = (values: any) => {
    console.log('Success:', values);
    console.log(values.email)
    console.log(values.password)
};

const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
};

type FieldType = {
    email?: string;
    password?: string;
};
// const [email, setEmail] = useState<string>('')
// const [password, setPassword] = useState<string>('')
const LoginForm: React.FC = () => (
    <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
    >
        <Form.Item<FieldType>
            label="email"
            name="email"
            rules={[{ required: true, type: "email", message: 'email трябва да бъде email!' }]}
        >
            <Input/>
        </Form.Item>

        <Form.Item<FieldType>
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
        >
            <Input.Password />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
                Submit
            </Button>
        </Form.Item>
    </Form>
);

export default LoginForm;