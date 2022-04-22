import React, { Component } from 'react';
import { Carousel } from 'react-responsive-carousel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRotateRight } from '@fortawesome/free-solid-svg-icons'



class EditingPostImage extends Component {

  handleImageRotationClick = (imgUrl) => {
    const { imageRotation } = this.props;
    const rotation = imageRotation[imgUrl] ? imageRotation[imgUrl] + 90 : 90;
    this.props.handleImageRotationStateUpdate(imgUrl, rotation)
  }
  
  render() {
    const { selectedPostArray, imageRotation } = this.props;

    return (
      <Carousel showThumbs={false} showStatus={false}>
        {selectedPostArray.map(url => {
          const rotation = imageRotation[url] ? imageRotation[url] : 0;
          const rotationStyleProperty = imageRotation[url] ? `rotate(${rotation}deg)` : 0;
        return (
          <div key={url}>
            <div className="post__rotate-btn-cont">
              <span className="post__rotate_title">Rotate Image </span> 
              <FontAwesomeIcon icon={faRotateRight} onClick={() => { this.handleImageRotationClick(url) }} className="post__rotate-icon"/>
            </div>
            <div className="post__flex-cont post__flex-cont-edit">
              <img
                className="post__image"
                src={url}
                alt="post to edit"
                style={{ transform: rotationStyleProperty }}
              />
            </div>
          </div>
        )
        })}
      </Carousel>
    );
  }
}

export default EditingPostImage;
