import { Button, Modal, Form, Typography } from 'antd';
import React, { useContext } from 'react';
import { AppContext } from '../../AppContext';

export default function Delete(props) {
  const {
    images,
    setImages,
    selectedImage,
  } = useContext(AppContext)

  const { deleteImageModal, setDeleteImageModal, messageApi } = props;
  const { Text } = Typography;

  const onDeleteImageFinish = async () => {
    try {
      const res = await axios.delete(`http://127.0.0.1:8000/api/image/${selectedImage?.id}`);

      const updatedImages = images.filter(image => image.id !== selectedImage?.id);
      setImages(updatedImages);

      setDeleteImageModal(false);
      messageApi.open({ type: 'success', content: res.data.message, duration: 5 });
    } catch (error) {
      console.log(error);
    }
  };
  const onDeleteImageFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const hideModal = () => {
    setDeleteImageModal(false);
  };

  return (
    <>
      <Modal
        title="Delete folder"
        open={deleteImageModal}
        onOk={hideModal}
        onCancel={hideModal}
        okText="Modal"
        cancelText="Cancel"
        footer={[]}
      >
        <Form
          name="delete-image"
          initialValues={{
            remember: true,
          }}
          onFinish={onDeleteImageFinish}
          onFinishFailed={onDeleteImageFinishFailed}
          autoComplete="off"
        >
          <Form.Item>
            <Text italic>Are you sure you want to delete this image?</Text>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">Remove</Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}