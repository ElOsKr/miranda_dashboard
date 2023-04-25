import React, {useEffect, useState} from 'react'
import { MainContainer } from '../Users/NewUserStyle'
import { FormBtn, FormFooter, FormHeader, FormMain, FormPhoto, FormRoomContainer, ImgInput, OfferContainer } from './NewRoomStyle'
import { roomCreate } from '../../features/rooms/roomsSlice';
import { useAppDispatch } from '../../hooks/hooks';

interface IRoom{
    type: string,
    price: string,
    number: string,
    discount: string,
    description: string,
    offer: string,
    cancellation: string,
    amenities: string
}

const NewRoom = () => {

    const dispatch = useAppDispatch()

    const [img, setImg] = useState([]);

    const [imgURL, setImgURL] = useState<string[]>([]);

    const [type,setType] = useState<string>();

    const [price,setPrice] = useState<string>();

    const [number,setNumber] = useState<string>();

    const [discount,setDiscount] = useState<string>();

    const [description,setDescription] = useState<string>();

    const [offer,setOffer] = useState<string>();

    const [cancellation,setCancellation] = useState<string>();

    const [amenities,setAmenities] = useState<string>();

    useEffect(() => {
        if(img.length>0){
            let arrAux: string[] = [];
            for(let i = 0; i<img.length;i++){
                let objectImg : string = URL.createObjectURL(img[i])
                arrAux.push(objectImg)
            }
            setImgURL(arrAux)
        }else{
            setImgURL([])
        }
    },[img])

    const handleImageChange = (event: any) => {
        setImg(event.target.files)
    }

    const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setType(e.target.value)
    }

    const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPrice(e.target.value)
    }

    const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNumber(e.target.value)
    }

    const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setDescription(e.target.value)
    }

    const handleOfferChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setOffer(e.target.value)
    }

    const handleCancellationChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setCancellation(e.target.value)
    }

    const handleAmenitiesChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setAmenities(e.target.value)
    }

    const handleDiscountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDiscount(e.target.value)
    }

    const handleSubmit = (e: React.ChangeEvent<HTMLInputElement & HTMLFormElement>) => {
        
        e.preventDefault();

        const newRoom: IRoom = {
            type: type!,
            price: price!,
            number: number!,
            discount: discount!,
            description: description!,
            offer: offer!,
            cancellation: cancellation!,
            amenities: amenities!
        }

        dispatch(roomCreate(newRoom))
    }

  return (
    <MainContainer>
        <FormRoomContainer onSubmit={handleSubmit}>
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
                        <select name="type" id="type" onChange={handleTypeChange}>
                            <option value="singleBed">Single Bed</option>
                            <option value="doubleBed">Double Bed</option>
                            <option value="doubleSuperior">Double Superior</option>
                            <option value="suite">Suite</option>    
                        </select>
                    </div>
                    <div>
                        <label htmlFor="number">Number</label>
                        <input type="number" name="number" id="number" onChange={handleNumberChange}/>
                    </div>
                    <div>
                        <label htmlFor="descripion">Description</label>
                        <textarea name="description" id="description" style={{resize: 'none'}} onChange={handleDescriptionChange}></textarea>
                    </div>
                    <OfferContainer>
                        <label htmlFor="offer">Offer</label>
                        <div onChange={handleOfferChange}>
                            <div>
                                Yes <input type="radio" name="offer" id="yesOffer" />
                            </div>
                            <div>
                                No <input type="radio" name="offer" id="noOffer" />
                            </div>                            
                        </div>                
                    </OfferContainer>
                </div>
                <div>
                    <div>
                        <label htmlFor="price">Price</label>
                        <input type="number" name="price" id="price" onChange={handlePriceChange}/>
                    </div>
                    <div>
                        <label htmlFor="discount">Discount</label>
                        <input type="number" name="discount" id="discount" onChange={handleDiscountChange}/>
                    </div>
                    <div>
                        <label htmlFor="cancellation">Cancellation</label>
                        <textarea name="cancellation" id="cancellation" style={{resize: 'none'}} onChange={handleCancellationChange}></textarea>
                    </div>
                    <div>
                        <label htmlFor="amenities">Amenities</label>
                        <select name="amenities" id="amenities" onChange={handleAmenitiesChange} defaultValue="">
                            <option value="" disabled>Select an option</option>
                            <option value="tv">TV</option>
                            <option value="bar">Bar</option>
                        </select>
                    </div>
                </div>
            </FormMain>
            <FormFooter>
                <FormBtn type='submit' value="Create Room" style={{padding: "10px 20px"}} onSubmit={handleSubmit}/>
            </FormFooter>
        </FormRoomContainer>
    </MainContainer>
  )
}

export default NewRoom