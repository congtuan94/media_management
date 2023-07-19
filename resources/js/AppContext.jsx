import React, { createContext, useState } from 'react'

export const ImageContext = createContext();

export const ImageContextProvider = ({ children }) => {
  const [folders, setFolders] = useState([]);
  const [files, setFiles] = useState([]);
  const [breadcumbs, setBreadcumbs] = useState([]);
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [selectedFolderGlobal, setSelectedFolderGlobal] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showImageModal, setShowImageModal] = useState(false);
  const [isMultipleSelected, setIsMultipleSelected] = useState(false);
  const [isFromGallery, setIsFromGallery] = useState(false);
  const [isHiddenShowGallery, setIsHiddenShowGallery] = useState(false);
  const [arrSelectedImages, setArrSelectedImages] = useState([]);
  const [storedValueImage, setStoredValueImage] = useState(null);
  const [arrSelectedItem, setArrSelectedItem] = useState([]);
  return (
    <ImageContext.Provider value={
      {
        showImageModal,
        setShowImageModal,
        folders,
        setFolders,
        files,
        setFiles,
        selectedImage,
        setSelectedImage,
        selectedFolder,
        setSelectedFolder,
        breadcumbs,
        setBreadcumbs,
        isMultipleSelected,
        setIsMultipleSelected,
        isFromGallery,
        setIsFromGallery,
        isHiddenShowGallery,
        setIsHiddenShowGallery,
        arrSelectedImages,
        setArrSelectedImages,
        storedValueImage,
        setStoredValueImage,
        arrSelectedItem,
        setArrSelectedItem,
        selectedFolderGlobal,
        setSelectedFolderGlobal,
      }
    }>
      {children}
    </ImageContext.Provider>
  )
}