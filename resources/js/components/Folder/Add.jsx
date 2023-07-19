import { Button, Modal, Form, Input } from 'antd';
import React, { useContext, useState } from 'react';
import { AppContext } from '../../AppContext';

export default function Add(props) {
  const {
    folders,
    setFolders,
    selectedFolder,
  } = useContext(AppContext)

  const { createFolderModal, setCreateFolderModal, messageApi } = props;
  const [form] = Form.useForm();

  const onCreateFolderFinish = async (data) => {
    const dataCreate = { ...data, parent_id: selectedFolder.id }
    try {
      const res = await axios.post('http://127.0.0.1:8000/api/folder/add', dataCreate);
      if (res.data.status === 400) {
        messageApi.open({ type: 'error', content: res.data.message, duration: 5 });
      } else {
        setFolders([...folders, data]);

        form.resetFields();
        setCreateFolderModal(false);
        messageApi.open({ type: 'success', content: res.data.message, duration: 5 });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onCreateFolderFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const hideModal = () => {
    setCreateFolderModal(false);
  };

  return (
    <>
      <Modal
        title="Create folder"
        open={createFolderModal}
        onOk={hideModal}
        onCancel={hideModal}
        okText="Modal"
        cancelText="Cancel"
        footer={[]}
      >
        <Form
          form={form}
          name="create-folder"
          onFinish={onCreateFolderFinish}
          onFinishFailed={onCreateFolderFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            name="name"
            rules={[{ required: true, message: 'Folder name is required!' }]}
          >
            <Input placeholder="Folder name" name='name' />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">Create</Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}