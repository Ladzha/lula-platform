import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ImageGallery = () => {
  const [imageLinks, setImageLinks] = useState([]);

  useEffect(() => {
    fetchImageLinks();
  }, []);

  const fetchImageLinks = async () => {
    try {
      const response = await axios.get('/api/get-image-links');
      setImageLinks(response.data);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      {imageLinks.map((link, index) => (
        <img key={index} src={link} alt={`Image ${index}`} />
      ))}
    </div>
  );
};

export default ImageGallery;
