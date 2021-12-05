import React, { useState } from 'react';
import '../styles/model.css';

function upload_img(event, pinDetail, setPinDetail, setShowLabel, setShowModelPin) {
    if (event.target.files && event.target.files[0]) {
        if (/image\/*/.test(event.target.files[0].type)) {
            const reader = new FileReader();

            reader.onload = function() {
                setPinDetail({
                    ...pinDetail,
                    img_blob: reader.result
                });

                setShowLabel(false);
                setShowModelPin(true);
            }

            reader.readAsDataURL(event.target.files[0]);
        }
    }
}

function checkSize(event) {
    const image = event.target;

    image.classList.add('pin_max_width');

    if (
        image.getBoundingClientRect().width < image.parentElement.getBoundingClientRect().width ||
        image.getBoundingClientRect().height < image.parentElement.getBoundingClientRect().height
    ) {
        image.classList.remove('pin_max_width');
        image.classList.add('pin_max_height');
    }

    image.style.opacity = 1;
}

function uploadPin(pinDetail, add_pin) {
    const users_data = {
        ...pinDetail,
        author: 'Jack',
        board: 'default',
        title: document.querySelector('#pinTitle').value,
        description: document.querySelector('#pinDesc').value,
        destination: document.querySelector('#pinDesti').value,
        pin_size: document.querySelector('#pinSize').value,
    }

    add_pin(users_data);
}

function Model() {
    const [pinDetail, setPinDetail] = useState({
        author: '',
        board: '',
        title: '',
        description: '',
        destination: '',
        img_blob: '',
        pin_size: '',

    });

    const [showLabel, setShowLabel] = useState(true);
    const [showModelPin, setShowModelPin] = useState(false);

    return (
        <div className="addPin">
            <div className="addPin_container">
                <div className="side" id="left">
                    
                    <div className="section1">
                        <div className="pint-mock-icon-container">
                            <img src="./images/threedots.png" alt="edit" className="pint-mock-icon"/>
                        </div>
                    </div>

                    <div className="section2">
                        <label htmlFor="uploadImage" id="uploadImage_label"
                            style={{
                                display: showLabel ? 'block' : 'none'
                            }}
                        >

                            <div className="uploadImage_container">
                                <div id="dborder">

                                    <div className="pint-mock-icon-container">
                                        <img src="./images/upper-arrow.png" alt="edit" className="pint-mock-icon"/>
                                    </div>

                                    <div>Click to upload</div>
                                    <div>Recommendation: Use pictures under 20MB</div>

                                </div>
                            </div>

                            <input onChange={event => upload_img(event, pinDetail, setPinDetail, setShowLabel, setShowModelPin )} type="file" name="uploadImage" id="uploadImage" value=""/>
                        </label>

                        <div className="modelsPin"
                            style={{
                                display: showModelPin ? 'block' : 'none'
                            }}>
                            <div className="pinImages">
                                <img onLoad={checkSize} src={pinDetail.img_blob} alt="pinImages"/>
                            </div>
                        </div>
                    </div>

                    <div className="section3">
                        <div className="saveFromSite">Save from site</div>
                    </div>
                </div>

                <div className="side" id="right">
                    <div className="section1">
                        <div className="selectSize">
                            <select defaultValue="Select size" name="pinSize" id="pinSize">
                                <option value="">Select</option>
                                <option value="small">Small</option>
                                <option value="medium">Medium</option>
                                <option value="big">Big</option>
                            </select>

                            <div onClick={() => uploadPin(pinDetail)} className="uploadPin">Upload</div>
                        </div>
                    </div>
                    <div className="section2">
                        <input placeholder="Add your title" type="text" className="newPinInp" id="pinTitle"/>
                        <input placeholder="Tell everyone what your Pin is about" type="text" className="newPinInp" id="pinDesc"/>
                        <input placeholder="Add a destination link here" type="text" className="newPinInp" id="pinDesti"/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Model;
