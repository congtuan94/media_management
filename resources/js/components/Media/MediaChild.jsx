import { UploadOutlined, DownloadOutlined, FolderOutlined } from '@ant-design/icons';
import { Button, Modal, Image, Col, Row, Space, Input, Divider, Typography, Form, message, Upload, Select, Breadcrumb } from 'antd';
import React, { useEffect, useState } from 'react';

import AddFolder from '../Folder/Add';
import DeleteFolder from '../Folder/Delete';
import EditFolder from '../Folder/Edit';
// import { useNavigate } from 'react-router-dom';


export default function MediaChild() {
  // State: list folders and images
  const [folders, setFolders] = useState([]);
  const [images, setImages] = useState([]);

  // State: view information folders and images
  const [inforFolder, setInforFolder] = useState();
  const [inforImage, setInforImage] = useState();

  // State - Toast : show toast
  const [messageApi, contextHolder] = message.useMessage();


  // State - Search : keyword to search
  const [keyword, setKeyword] = useState('');
  // const navigate = useNavigate();

  // State - Modal: create, edit, delete folders 
  const [createFolderModal, setCreateFolderModal] = useState(false);
  const [editFolderModal, setEditFolderModal] = useState(false);
  const [deleteFolderModal, setDeleteFolderModal] = useState(false);


  // State - Modal: create, edit, delete images 
  const [editImgModal, setEditImgModal] = useState(false);
  const [deleteImgModal, setDeleteImgModal] = useState(false);

  // State: disabled selectbox 
  const [disabled, setDisabled] = useState(true);
  // State: show select for images
  const [selectImg, setSelectImg] = useState('');
  // State: set value select
  const [selectedOption, setSelectedOption] = useState('Action');

  const { Search } = Input;
  const { Text } = Typography;

  // Hand get all folders
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/folder');
        setFolders(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  // Handle ev click show information folder and images
  const handleOnClick = (item) => {
    setInforFolder(item);
    setDisabled(false);
  }

  const handleOnClickImg = (item) => {
    setInforImage(item);
    setDisabled(false);
    setSelectImg('yes');
  }

  const handleDoubleClick = (id) => {
    
    axios.get(`http://127.0.0.1:8000/api/folder/${id}/images`)
      .then(res => {
        console.log(res.data);
        setFolders([]);
        setImages(res.data);
        setDisabled(true);
      })
      .catch(error => console.log(error));
  }

  // Handle search
  const handleSearch = async () => {
    try {
      const res = await axios.get(!inforFolder ? 'http://127.0.0.1:8000/api/folder' : `http://127.0.0.1:8000/api/folder/${inforFolder?.id}/images`, {
        params: {
          search: keyword
        }
      });
      !inforFolder ? setFolders(res.data) : setImages(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  // Handle upload image
  const props = {
    name: 'file',
    action: `http://127.0.0.1:8000/api/folder/${inforFolder?.id}/images/add`,
    headers: {
      authorization: 'authorization-text',
    },
    showUploadList: false,
    onChange(info) {
      if (info.file.status !== 'uploading') {
        // console.log('log',info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        // console.log({ info });
        // setImages([...images, info?.file?.response?.url]);
        setImages([...images, info.file.name]);
        ;
        message.success(`${info.file.name} file uploaded successfully`);
        const imageUrl = URL.createObjectURL(info.file.originFileObj);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  // Handle show modal create folder and hide all modal
  const showCreateFolderModal = () => {
    setCreateFolderModal(true);
  };

  // Handle ev change to edit, delete folder in select
  const handleChangeSelect = (value) => {
    setSelectedOption(selectedOption);
    switch (value) {
      case 'edit':
        setEditFolderModal(true);
        break;

      case 'move':
        setDeleteFolderModal(true);
        break;

      case 'editImg':
        setEditImgModal(true);
        break;

      case 'moveImg':
        setDeleteImgModal(true);
        break;

      default:
        break;
    }
  };

  //Handle breadcrumb
  // const handleNavigate = () => {
  //   navigate(-1);
  // };

  return (
    <>
      <Row gutter={16}>
        <Col span={24}>
          <Text strong>Media Gallery</Text>
        </Col>
        <Divider style={{ margin: '8px 0 12px 0' }} />

        {/* Menu bar */}
        <Col span={20}>
          <Space size="small">
            <Upload {...props}>
              <Button type='primary' icon={<UploadOutlined />} className="custom-button">Upload</Button>
            </Upload>
            <Button type="primary" icon={<DownloadOutlined />} className="custom-button">
              Download
            </Button>
            <Button type="primary" onClick={showCreateFolderModal} icon={<DownloadOutlined />} className="custom-button">
              Create folder
            </Button>
            <Button type="primary" icon={<DownloadOutlined />} className="custom-button">
              Refresh
            </Button>
          </Space>
        </Col>
        <Col span={4}>
          <Search onSearch={handleSearch} placeholder="Search" enterButton value={keyword}
            onChange={(e) => setKeyword(e.target.value)} />
        </Col>

        <Divider style={{ margin: '8px 0' }} />
        <Col span={19}>
          <Breadcrumb items={[{ title: <span>Folder</span> }, { title: 'Images' }]} />
        </Col>
        <Col span={5}>
          <Select
            value={selectedOption}
            style={{ width: 120 }}
            onChange={handleChangeSelect}
            disabled={disabled}
            options={[
              { value: !selectImg ? 'edit' : 'editImg', label: 'Rename' },
              { value: !selectImg ? 'move' : 'moveImg', label: 'Move to trash' },
            ]}
          />
        </Col>
        <Divider style={{ margin: '8px 0' }} />

        {/* Information Folder */}
        <Col span={19}>
          {folders.map((item, index) => (
            <React.Fragment key={index}>
              <Space direction="vertical" size="small" align="center" className="contain-folder">
                <FolderOutlined onClick={() => handleOnClick(item)} onDoubleClick={() => handleDoubleClick(item.id)} className='folder-styled' />
                <Text>{item.name}</Text>
              </Space>
            </React.Fragment>
          ))}
          <Space size="large">
            {images?.data?.map((item, index) => (
              <React.Fragment key={index}>
                <Space direction="vertical" size="small" align="center" className="contain-folder">
                  <Image
                    width={150}
                    height={150}
                    src={''}
                    fallback="data:image/png;base64,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"
                    preview={false}
                    onClick={() => handleOnClickImg(item)}
                  />
                  <Text>{item.name}</Text>
                </Space>
              </React.Fragment>
            ))}
          </Space>
        </Col>
        <Col span={5}>
          <Space direction="vertical" size="small" align="center">
            <Image
              src={''}
              fallback="data:image/png;base64,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"
              preview={false}
            />
            {inforFolder && !inforImage && (
              <>
                <Text>Id: {inforFolder.id}</Text>
                <Text>Name: {inforFolder.name}</Text>
                <Text>Created At: {new Date(inforFolder.created_at.slice(0, -1)).toLocaleString()}</Text>
                <Text>Updated At: {new Date(inforFolder.updated_at.slice(0, -1)).toLocaleString()}</Text>
              </>
            )
            }

            {inforImage && (
              <>
                <Text>Id: {inforImage.id}</Text>
                <Text>Name: {inforImage.name}</Text>
                {/* <Text>Created At: {new Date(inforImage.created_at.slice(0, -1)).toLocaleString()}</Text>
                <Text>Updated At: {new Date(inforImage.updated_at.slice(0, -1)).toLocaleString()}</Text> */}
              </>
            )
            }
          </Space>
        </Col>
      </Row >

      <AddFolder
        inforFolderId={inforFolder?.id}
        createFolderModal={createFolderModal}
        setCreateFolderModal={setCreateFolderModal}
        folders={folders}
        setFolders={setFolders}
        messageApi={messageApi}
      />

      <DeleteFolder
        inforFolderId={inforFolder?.id}
        deleteFolderModal={deleteFolderModal}
        setDeleteFolderModal={setDeleteFolderModal}
        folders={folders}
        setFolders={setFolders}
        Text={Text}
        messageApi={messageApi}
      />

      <EditFolder
        inforFolder={inforFolder}
        editFolderModal={editFolderModal}
        setEditFolderModal={setEditFolderModal}
        Text={Text}
        messageApi={messageApi}
        folders={folders}
        setFolders={setFolders}
      />

      {/* <DeleteImage
        inforFolderId={inforFolder?.id}
        deleteFolderModal={deleteFolderModal}
        setDeleteFolderModal={setDeleteFolderModal}
        folders={folders}
        setFolders={setFolders}
        Text={Text}
        messageApi={messageApi}
      />

      <EditImage
        inforFolder={inforFolder}
        editFolderModal={editFolderModal}
        setEditFolderModal={setEditFolderModal}
        Text={Text}
        messageApi={messageApi}
        folders={folders}
        setFolders={setFolders}
      /> */}
      {contextHolder}
    </>
  )
}