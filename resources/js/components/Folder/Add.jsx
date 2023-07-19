import { Button, Modal, Form, Input } from 'antd';
import React, { useEffect, useState } from 'react';


export default function Add(props) {
  const { selectedFolderId, createFolderModal, setCreateFolderModal, folders, setFolders, messageApi } = props;
  const [createFolderSuccess, setCreateFolderSuccess] = useState(false);
  const [form] = Form.useForm();

  const onCreateFolderFinish = async (data) => {
    console.log(data);
    const dataCreate = { ...data, parent_id: selectedFolderId }
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/folder/add', dataCreate);
      console.log(response);
      if (response.data.status === 'existed') {
        messageApi.open({
          type: 'error',
          content: response.data.message,
          duration: 5,
        });
      } else {

        setCreateFolderSuccess(true);
        setFolders([...folders, data]);
      }
    } catch (error) {
      console.log(error);
      //
    }
  };

  const onCreateFolderFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const hideModal = () => {
    setCreateFolderModal(false);
  };

  useEffect(() => {
    if (createFolderSuccess) {
      form.resetFields();
      setCreateFolderModal(false);
      setCreateFolderSuccess(false);
      // messageApi.open({
      //   type: 'success',
      //   content: createFolderSuccess === true ? 'Create Folder Success!' : '',
      //   duration: 5,
      // });
    }
  }, [createFolderSuccess])

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