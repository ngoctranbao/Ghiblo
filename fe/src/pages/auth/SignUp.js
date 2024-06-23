import React, { useState } from "react";
import { Col, Form, Input, Row, Button } from "antd";
import { useNavigate } from "react-router-dom";
import LayoutAuth from "./LayoutAuth";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { signupService } from "../../services/Auth/index";
import { toast } from "react-toastify";

const SignUp = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    try {
      setLoading(true);
      const res = await signupService(values);
      if (res.status === 200) {
        navigate("/auth/login");
        toast.success(res.message);
      } else {
        toast.error(res.message);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      for (let errorMessage of error?.message) {
        toast.error(errorMessage?.message);
      }
    }
  };

  return (
    <LayoutAuth loading={loading}>
      <Row
        style={{
          height: "100%",
          padding: "60px 20px",
        }}
      >
        <Col span={24}>
          <Row
            className="text_title "
            style={{
              justifyContent: "center",
              fontSize: 26,
              paddingBottom: 30,
            }}
          >
            SignUp Now
          </Row>

          <Form layout="vertical" onFinish={onFinish}>
            <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập tên đăng nhập",
                },
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="User Name"
              />
            </Form.Item>
            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập email",
                },
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Email"
              />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập mật khẩu",
                },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>
            <Form.Item
              label="Password Confirm"
              name="passwordConfirm"
              dependencies={["password"]}
              rules={[
                {
                  required: true,
                  message: "Nhập lại password vào!",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error("Password không giống Nhập lại!")
                    );
                  },
                }),
              ]}
            >
              <Input.Password
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="re-password"
                placeholder="Password Confirm"
              />
            </Form.Item>
            <Form.Item>
              <Row style={{ justifyContent: "center" }}>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Row>
            </Form.Item>
          </Form>
          <Row>
            <Col>
              <Row>Bạn đã có tài khoản</Row>
              <Row>
                <Col>Đăng nhập</Col>
                <Col
                  className={"navigate-auth"}
                  onClick={() => {
                    navigate("/auth/login");
                  }}
                >
                  Tại đây
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    </LayoutAuth>
  );
};

export default SignUp;
