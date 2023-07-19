import { Button, Modal, Form, Input } from 'antd';
import React, { useEffect, useState } from 'react';


export default function EditFolder(props) {
  // const { selectedFolder, editFolderModal, setEditFolderModal, folders, setFolders, messageApi } = props;
  // const [editFolderSuccess, setEditFolderSuccess] = useState(false);
  // const [form] = Form.useForm();

  // Handle EDIT IMAGE
  const onEditImageFinish = async (data) => {
    try {
      await axios.put(`http://127.0.0.1:8000/api/folder/${selectedFolder?.id}/images/${selectedImage?.id}`, data);

      // setEditImageSuccess(true);
      const updatedImages = [...images];
      const index = updatedImages.findIndex(image => image.id === selectedImage?.id);

      updatedImages[index] = {
        ...updatedImages[index],
        ...data
      };

      setImages(updatedImages);
    } catch (error) {
      console.log(error);
    }
  };
  const handleEditImageFinish = (data) => {
    onEditImageFinish(data, selectedFolder?.id, selectedImage?.id);
  };

  const onEditImageFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const hideModal = () => {
    setEditImgModal(false);
  };

  // useEffect(() => {
  //   if (editFolderSuccess) {
  //     form.resetFields();
  //     setEditFolderModal(false);
  //     setEditFolderSuccess(false);
  //     messageApi.open({
  //       type: 'success',
  //       content: editFolderSuccess === true ? 'Rename Folder Success!' : '',
  //       duration: 5,
  //     });
  //   }
  // }, [editFolderSuccess])

  // useEffect(() => {
  //   if (editFolderModal) {
  //     form.setFieldsValue({
  //       name: selectedFolder?.name,
  //     });
  //   }
  // }, [editFolderModal, selectedFolder?.name, form]);

  return (
    <>
      <Modal
        title="Edit image"
        open={editImgModal}
        onOk={hideModal}
        onCancel={hideModal}
        okText="Modal"
        cancelText="Cancel"
        footer={[]}
      >
        <Form
          name="edit-image"
          initialValues={{
            ["name"]: selectedImage?.name
          }}
          onFinish={handleEditImageFinish}
          onFinishFailed={onEditImageFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            name="name"
            rules={[{ required: true, message: 'Image name is required!' }]}
          >
            <Input placeholder="Image name" name='name' />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">Rename</Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}