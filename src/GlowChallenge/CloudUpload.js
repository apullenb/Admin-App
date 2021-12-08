import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import styled from "styled-components";

class CloudinaryUploadWidget extends Component {

  constructor() {
    super();
    this.random = 'upload_widget-'+Math.ceil(Math.random()*10000);
  }

  componentDidMount() {
    const imgID = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
    const save = this.props.save;
    const preset = this.props.day === 1 ? 'scp2-day-1-upload' : 'scp2-day-30-upload';

    window.cloudinary.createUploadWidget({
        cloudName: 'zilis', uploadPreset: preset, publicId: `${imgID}`, folder: 'challenge.zilis', cropping: true
      },
      (error, result) => { console.error(error, result) }
    );
    document.getElementById(this.random).addEventListener(
      'click',
      function showUploadWidget() {
        window.cloudinary.openUploadWidget({
          cloudName: 'zilis',
          uploadPreset: 'challenge-upload',
          publicId: `${imgID}`,
          sources: [
            'local'
          ],
          showAdvancedOptions: false,
          cropping: true,
          croppingAspectRatio: 0.8,
          showSkipCropButton: false,
          showRotateButtom: true,
          multiple: false,
          defaultSource: 'local',
          styles: {
            palette: {
              window: '#FFFFFF',
              windowBorder: '#90A0B3',
              tabIcon: '#0652B5',
              menuIcons: '#5A616A',
              textDark: '#000000',
              textLight: '#FFFFFF',
              link: '#0652B5',
              action: '#FF620C',
              inactiveTabIcon: '#0E2F5A',
              error: '#F44235',
              inProgress: '#0078FF',
              complete: '#20B832',
              sourceBg: '#E4EBF1'
            },
            fonts: {
              default: {
                active: true
              }
            }
          }
        },
          (err, info) => {
            if (info.event === 'success') {
              save(`https://res.cloudinary.com/zilis/image/upload/challenge.zilis/entries/${imgID}.jpg`)
            }
          });
      },
      false
    );

  }

  render() {

    return (
      <div>
        <Replace id={this.random} className="button">
          Replace Photo
        </Replace>
      </div>
    );
  }
}



export default CloudinaryUploadWidget;

const Replace = styled.button`
  width: 100%;
  border: none;
  padding: 4px 0;
  background: #0f4b8f;
  color: white;
  font-size: 14px;
  font-weight: 500;
`;
