import React, { useState } from 'react';
import '../styles/pin.css';

function upload_img(event, setPinImage) {
    if (event.target.files && event.target.files[0]) {
        if (/image\/*/.test(event.target.files[0].type)) {
            const reader = new FileReader();

            reader.onload = function() {
                setPinImage(reader.result);
            }

            reader.readAsDataURL(event.target.files[0]);
        }
    }
}

function Pin() {
    const [pin_img, setPinImage] = useState();

    return (
        <div>
            <input onChange={event => upload_img(event, setPinImage)} type="file" name="picture" id="picture" value=""/>

            <div className="card">
                <div className="pinTitle"></div>

                <div className="pinModel">
                    <div className="modelHead">
                        <div className="saveCard">Save</div>
                    </div>
                    <div className="modelFoot">
                        <div className="destination">
                            <div className="pint-mock-icon-container">
                                <img src="./images/upper-right-arrow.png" alt="destination" className="pint-mock-icon"/>
                            </div>
                            <span>Eatery</span>
                        </div>

                        <div className="pint-mock-icon-container">
                            <img src="./images/upload.png" alt="upload" className="pint-mock-icon"/>
                        </div>

                        <div className="pint-mock-icon-container">
                            <img src="./images/threedots.png" alt="edit" className="pint-mock-icon"/>
                         </div>
                    </div>
                </div>

                <div className="pinImages">
                    <img src={pin_img} alt="pinImages"/>
                </div>
            </div>
        </div>
    )
}

export default Pin;