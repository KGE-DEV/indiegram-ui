import React, { Component } from 'react';
import { Carousel } from 'react-responsive-carousel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRotateRight } from '@fortawesome/free-solid-svg-icons'

import { sendRotateImage } from '../../Utilities/PostUtilities';



class EditingPostImage extends Component {
  constructor() {
    super()
    this.state = {
      imageRotation: {}
    }
  }
  handleImageRotationClick = (imgUrl) => {
    const currentImageRotation = this.state.imageRotation;
    currentImageRotation[imgUrl] = currentImageRotation[imgUrl] ? currentImageRotation[imgUrl] + 90 : 90;
    this.setState({
      imageRotation: currentImageRotation
    })
  }

  handleSaveImageRotationClick = (imgUrl, rotation) => {
    Promise.resolve(sendRotateImage(imgUrl, rotation))
      .then(response => {
        if (response.status === 200) {
          const updatedImageRotation = this.state.imageRotation;
          updatedImageRotation[imgUrl] = 0;
          this.setState({
            updatedImageRotation
          })
        }
      })
  }
  
  render() {
    const { selectedPostArray } = this.props;
    const { imageRotation } = this.state;

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
            {rotationStyleProperty ?
              <button className="post__rotate-btn" onClick={() => {this.handleSaveImageRotationClick(url, rotation)}}>Save Rotation</button>
              : <button disabled className="post__rotate-btn">Save Rotation</button>
            }
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
