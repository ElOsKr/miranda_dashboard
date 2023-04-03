import React, {useEffect, useState} from 'react'
import { MainContainer } from '../Users/NewUserStyle'
import { FormBtn, FormFooter, FormHeader, FormMain, FormPhoto, FormRoomContainer, ImgInput, OfferContainer } from './NewRoomStyle'

function NewRoom() {

    const [img, setImg] = useState([]);

    const [imgURL, setImgURL] = useState([])

    useEffect(() => {
        if(img.length>0){
            let arrAux = [];
            for(let i = 0; i<img.length;i++){
                arrAux.push(URL.createObjectURL(img[i]))
            }
            setImgURL(arrAux)
        }else{
            setImgURL([])
        }
    },[img])

    const handleImageChange = (event) => {
        setImg(event.target.files)
    }

  return (
    <MainContainer>
        <FormRoomContainer>
            <FormHeader>
                {
                    img.length>=3?
                        imgURL.map((item, i) => 
                            <FormPhoto key={i}>
                                <img src={item} alt={'roomPhoto'}/>
                            </FormPhoto>    
                        )
                    :
                    <>
                        <FormPhoto>
                            Select a photo
                        </FormPhoto>
                        <FormPhoto>
                            Select a photo
                        </FormPhoto>
                        <FormPhoto>
                            Select a photo
                        </FormPhoto>
                    </>
                }
            </FormHeader>
            <ImgInput
                type="file" 
                name="photos" 
                id="photos" 
                accept="image/png, image/jpeg" 
                multiple 
                onChange={handleImageChange}
            />
            <FormMain>
                <div>
                    <div>
                        <label htmlFor="type">Type</label>
                        <select name="type" id="type">
                            <option value="singleBed">Single Bed</option>
                            <option value="doubleBed">Double Bed</option>
                            <option value="doubleSuperior">Double Superior</option>
                            <option value="suite">Suite</option>    
                        </select>
                    </div>
                    <div>
                        <label htmlFor="number">Number</label>
                        <input type="number" name="number" id="number" />
                    </div>
                    <div>
                        <label htmlFor="descripion">Description</label>
                        <textarea name="description" id="description" style={{resize: 'none'}}></textarea>
                    </div>
                    <OfferContainer>
                        <label htmlFor="offer">Offer</label>
                        <div>
                            Yes <input type="radio" name="offer" id="yesOffer" />
                        </div>
                        <div>
                            No <input type="radio" name="offer" id="noOffer" />
                        </div>
                        
                    </OfferContainer>
                </div>
                <div>
                    <div>
                        <label htmlFor="price">Price</label>
                        <input type="number" name="price" id="price" />
                    </div>
                    <div>
                        <label htmlFor="discount">Discount</label>
                        <input type="number" name="discount" id="discount" />
                    </div>
                    <div>
                        <label htmlFor="cancellation">Cancellation</label>
                        <textarea name="cancellation" id="cancellation" style={{resize: 'none'}}></textarea>
                    </div>
                    <div>
                        <label htmlFor="amenities">Amenities</label>
                        <select name="amenities" id="amenities">
                            <option value="tv">TV</option>
                        </select>
                    </div>
                </div>
            </FormMain>
            <FormFooter>
                <FormBtn>
                    Create Room
                </FormBtn>
            </FormFooter>
        </FormRoomContainer>
    </MainContainer>
  )
}

export default NewRoom