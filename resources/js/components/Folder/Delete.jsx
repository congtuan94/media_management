import { Button, Modal, Form } from 'antd';
import React, { useEffect, useState } from 'react';


export default function Delete(props) {
  const { inforFolderId, deleteFolderModal, setDeleteFolderModal, folders, setFolders, Text, messageApi } = props;
  const [deleteFolderSuccess, setDeleteFolderSuccess] = useState(false);

  const onDeleteFolderFinish = async () => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/folder/${inforFolderId}`);
      setDeleteFolderSuccess(true);

      // Lọc bỏ phần tử có id trùng với inforFolder.id
      const updatedFolders = folders.filter(folder => folder.id !== inforFolderId);

      // Cập nhật dữ liệu tại client trước khi gửi request tới server
      setFolders(updatedFolders);
    } catch (error) {
      console.log(error);
    }
  };

  const onDeleteFolderFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const hideModal = () => {
    setDeleteFolderModal(false);
  };

  useEffect(() => {
    if (deleteFolderSuccess) {
      setDeleteFolderModal(false);
      setDeleteFolderSuccess(false);
      messageApi.open({
        type: 'success',
        content: deleteFolderSuccess === true ? 'Delete Folder Success!' : '',
        duration: 5,
      });
    }
  }, [deleteFolderSuccess])

  return (
    <>
      <Modal
        title="Delete folder"
        open={deleteFolderModal}
        onOk={hideModal}
        onCancel={hideModal}
        okText="Modal"
        cancelText="Cancel"
        footer={[]}
      >
        <Form
          name="basic"
          initialValues={{
            remember: true,
          }}
          onFinish={onDeleteFolderFinish}
          onFinishFailed={onDeleteFolderFinishFailed}
          autoComplete="off"
        >
          <Form.Item>
            <Text italic>Are you sure you want to delete this folder?</Text>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">Remove</Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}