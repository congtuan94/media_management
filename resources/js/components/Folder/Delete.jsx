import { Button, Modal, Form, Typography } from 'antd';
import React, { useContext } from 'react';
import { AppContext } from '../../AppContext';

export default function Delete(props) {
  const {
    folders,
    setFolders,
    selectedFolder,
  } = useContext(AppContext)

  const { deleteFolderModal, setDeleteFolderModal, messageApi } = props;
  const { Text } = Typography;

  const onDeleteFolderFinish = async () => {
    try {
      const res = await axios.delete(`http://127.0.0.1:8000/api/folder/${selectedFolder.id}`);

      const updatedFolders = folders.filter(folder => folder.id !== selectedFolder.id);
      setFolders(updatedFolders);

      setDeleteFolderModal(false);
      messageApi.open({ type: 'success', content: res.data.message, duration: 5 });
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