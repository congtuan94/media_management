import { Button, Modal, Form, Input } from 'antd';
import React, { useContext, useEffect } from 'react';
import { AppContext } from '../../AppContext';

export default function EditFolder(props) {
  const {
    folders,
    setFolders,
    selectedFolder,
  } = useContext(AppContext)

  const { editFolderModal, setEditFolderModal, messageApi } = props;
  const [form] = Form.useForm();

  const onEditFolderFinish = async (data) => {
    try {
      const res= await axios.put(`http://127.0.0.1:8000/api/folder/${selectedFolder?.id}`, data);

      const updatedFolders = [...folders];
      const index = updatedFolders.findIndex(folder => folder.id === selectedFolder?.id);
      updatedFolders[index] = {
        ...updatedFolders[index],
        ...data
      };
      setFolders(updatedFolders);

      form.resetFields();
      setEditFolderModal(false);
      messageApi.open({ type: 'success', content: res.data.message, duration: 5 });
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditFolderFinish = (data) => {
    onEditFolderFinish(data, selectedFolder?.id);
  };

  const onEditFolderFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const hideModal = () => {
    setEditFolderModal(false);
  };

  useEffect(() => {
    if (editFolderModal) {
      form.setFieldsValue({
        name: selectedFolder?.name,
      });
    }
  }, [editFolderModal, selectedFolder?.name, form]);

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
            ["name"]: selectedFolder?.name
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