import React, { createContext, useState } from 'react';

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const [folders, setFolders] = useState([]);
  const [images, setImages] = useState([]);
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const [files, setFiles] = useState([]);
  // const [breadcumbs, setBreadcumbs] = useState([]);
  // const [selectedFolderGlobal, setSelectedFolderGlobal] = useState(null);
  // const [showImageModal, setShowImageModal] = useState(false);
  // const [isMultipleSelected, setIsMultipleSelected] = useState(false);
  // const [isFromGallery, setIsFromGallery] = useState(false);
  // const [isHiddenShowGallery, setIsHiddenShowGallery] = useState(false);
  // const [arrSelectedImages, setArrSelectedImages] = useState([]);
  // const [storedValueImage, setStoredValueImage] = useState(null);
  // const [arrSelectedItem, setArrSelectedItem] = useState([]);

  return (
    <AppContext.Provider
      value={{
        folders,
        setFolders,
        images,
        setImages,
        selectedFolder,
        setSelectedFolder,
        selectedImage,
        setSelectedImage,

        // showImageModal,
        // setShowImageModal,
        files,
        setFiles,
        // breadcumbs,
        // setBreadcumbs,
        // isMultipleSelected,
        // setIsMultipleSelected,
        // isFromGallery,
        // setIsFromGallery,
        // isHiddenShowGallery,
        // setIsHiddenShowGallery,
        // arrSelectedImages,
        // setArrSelectedImages,
        // storedValueImage,
        // setStoredValueImage,
        // arrSelectedItem,
        // setArrSelectedItem,
        // selectedFolderGlobal,
        // setSelectedFolderGlobal,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;