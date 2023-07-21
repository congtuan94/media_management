import { Button, Modal, Form, Input } from 'antd';
import React, { useContext, useEffect } from 'react';
import { AppContext } from '../../AppContext';

export default function EditImage(props) {
  const {
    images,
    setImages,
    selectedImage,
  } = useContext(AppContext)

  const { editImageModal, setEditImageModal, messageApi } = props;
  const [form] = Form.useForm();

  const onEditImageFinish = async (data) => {
    try {
      const res = await axios.put(`http://127.0.0.1:8000/api/image/${selectedImage?.id}`, data);

      const updatedImages = [...images];
      const index = updatedImages.findIndex(image => image.id === selectedImage?.id);
      updatedImages[index] = {
        ...updatedImages[index],
        ...data
      };
      setImages(updatedImages);

      form.resetFields();
      setEditImageModal(false);
      messageApi.open({ type: 'success', content: res.data.message, duration: 5 });
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditImageFinish = (data) => {
    onEditImageFinish(data, selectedImage?.id);
  };

  const onEditImageFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const hideModal = () => {
    setEditImageModal(false);
  };

  useEffect(() => {
    if (editImageModal) {
      form.setFieldsValue({
        name: selectedImage?.name,
      });
    }
  }, [editImageModal, selectedImage?.name, form]);

  return (
    <>
      <Modal
        title="Edit image"
        open={editImageModal}
        onOk={hideModal}
        onCancel={hideModal}
        okText="Modal"
        cancelText="Cancel"
        footer={[]}
      >
        <Form
          form={form}
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