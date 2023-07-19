import { Button, Modal, Form, Input } from 'antd';
import React, { useEffect, useState } from 'react';


export default function EditFolder(props) {
  const { inforFolder, editFolderModal, setEditFolderModal, folders, setFolders, messageApi } = props;
  const [editFolderSuccess, setEditFolderSuccess] = useState(false);
  const [form] = Form.useForm();

  const onEditFolderFinish = async (data) => {
    try {
      await axios.put(`http://127.0.0.1:8000/api/folder/${inforFolder?.id}`, data);
      setEditFolderSuccess(true);
      // Tạo một bản sao của mảng folders
      const updatedFolders = [...folders];

      // Tìm vị trí của folder cần chỉnh sửa trong mảng
      const index = updatedFolders.findIndex(folder => folder.id === inforFolder?.id);

      // Cập nhật dữ liệu của folder trong mảng
      updatedFolders[index] = {
        ...updatedFolders[index],
        ...data
      };

      // Cập nhật dữ liệu tại client trước khi gửi request tới server
      setFolders(updatedFolders);

    } catch (error) {
      console.log(error);
    }
  };

  const handleEditFolderFinish = (data) => {
    onEditFolderFinish(data, inforFolder?.id);
  };

  const onEditFolderFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const hideModal = () => {
    setEditFolderModal(false);
  };

  useEffect(() => {
    if (editFolderSuccess) {
      form.resetFields();
      setEditFolderModal(false);
      setEditFolderSuccess(false);
      messageApi.open({
        type: 'success',
        content: editFolderSuccess === true ? 'Rename Folder Success!' : '',
        duration: 5,
      });
    }
  }, [editFolderSuccess])

  useEffect(() => {
    if (editFolderModal) {
      form.setFieldsValue({
        name: inforFolder?.name,
      });
    }
  }, [editFolderModal, inforFolder?.name, form]);

  return (
    <>
      <Modal
        title="Edit folder"
        open={editFolderModal}
        onOk={hideModal}
        onCancel={hideModal}
        okText="Modal"
        cancelText="Cancel"
        footer={[]}
      >
        <Form
          form={form}
          name="edit-folder"
          initialValues={{
            ["name"]: inforFolder?.name
          }}
          onFinish={handleEditFolderFinish}
          onFinishFailed={onEditFolderFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            name="name"
            rules={[{ required: true, message: 'Folder name is required!' }]}
          >
            <Input placeholder="Folder name" name='name'/>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">Rename</Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}