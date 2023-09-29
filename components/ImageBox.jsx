import React from 'react';
import styles from '/styles/Home.module.css';

class ImageBox extends React.Component {
    render() {
      const { images } = this.props;
  
      return (
        <div className={styles.imageBox}>
          {images.map((image, index) => (
            <img key={index} src={image} alt="" className={styles.image}/>
          ))}
        </div>
      );
    }
}

export default ImageBox;
