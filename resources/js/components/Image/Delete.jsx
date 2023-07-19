import { Button, Modal, Form } from 'antd';
import React, { useEffect, useState } from 'react';


export default function Delete(props) {
  // const { inforFolderId, deleteFolderModal, setDeleteFolderModal, folders, setFolders, Text, messageApi } = props;
  const [deleteImageSuccess, setDeleteImageSuccess] = useState(false);

  // Handle DELETE IMAGE
  const onDeleteImageFinish = async () => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/image/${inforImage?.id}`);
      setDeleteImageSuccess(true);

      // Lọc bỏ phần tử có id trùng với inforFolder.id
      const updatedImages = images.filter(image => image.id !== inforImage?.id);

      // Cập nhật dữ liệu tại client trước khi gửi request tới server
      setImages(updatedImages);
    } catch (error) {
      console.log(error);
    }
  };
  const onDeleteImageFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const hideModal = () => {
    setDeleteImgModal(false);
  };

  // useEffect show toast
  useEffect(() => {
    if (deleteImageSuccess) {
      setEditFolderModal(false);
      setDeleteImgModal(false);
      messageApi.open({
        type: 'success',
        content: deleteImageSuccess === true ? 'Delete Folder Success!' : '',
        duration: 5,
      });
    }
  }, [deleteImageSuccess])

  return (
    <>
       <Modal
        title="Delete image"
        open={deleteImgModal}
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