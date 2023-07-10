import React, {useEffect, useState} from 'react'
import { MainContainer } from '../Users/NewUserStyle'
import { FormBtn, FormFooter, FormHeader, FormMain, FormPhoto, FormRoomContainer, ImgInput } from './NewRoomStyle'
import { useDispatch, useSelector } from 'react-redux';
import { roomCreate } from '../../features/rooms/roomsSlice';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function NewRoom() {

    const dispatch = useDispatch()

    const [img, setImg] = useState([]);

    const [imgURL, setImgURL] = useState([]);

    const [type,setType] = useState();

    const [price,setPrice] = useState();

    const [number,setNumber] = useState();

    const [discount,setDiscount] = useState();

    const [amenities,setAmenities] = useState();

    const hasError = useSelector(state => state.rooms.hasError)

    const navigate = useNavigate()

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

    const handleTypeChange = (e) => {
        setType(e.target.value)
    }

    const handlePriceChange = (e) => {
        setPrice(e.target.value)
    }

    const handleNumberChange = (e) => {
        setNumber(e.target.value)
    }

    const handleAmenitiesChange = (e) => {
        let amenitiesArray = Array.from(e.target.selectedOptions, option => option.value)
        setAmenities(amenitiesArray)
    }

    const handleDiscountChange = (e) => {
        setDiscount(e.target.value)
    }

    const handleSubmit = (e) => {
        
        e.preventDefault();

        const newRoom = {
            type: type,
            price: parseInt(price),
            number: parseInt(number),
            photo: "https://www.hotelcarlemanygirona.com/thumb?src=/media/habitaciones/superior-premium/habitacion-premium-1.jpg&w=600",
            offer: parseInt(discount),
            amenities: amenities,
            status: true
        }

        for(let key in newRoom){
            if(!newRoom[key] && newRoom[key]!==0){
                return toast.error("Something is empty in the creation of the room", {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                })
            } 
        }
        try{
            dispatch(roomCreate(newRoom))
            if(!hasError){
                navigate("/rooms")
            }
        }catch(e){
            console.log(e)
        }
        
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
                            <option value="Single Bed">Single Bed</option>
                            <option value="Double Bed">Double Bed</option>
                            <option value="Double Superior">Double Superior</option>
                            <option value="Suite">Suite</option>    
                        </select>
                    </div>
                    <div>
                        <label htmlFor="number">Number</label>
                        <input type="number" name="number" id="number" onChange={handleNumberChange}/>
                    </div>
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
                </div>
                <div>
                        <label htmlFor="amenities">Amenities</label>
                        <select name="amenities" id="amenities" onChange={handleAmenitiesChange} multiple>
                            <option value="tv">TV</option>
                            <option value="bar">Bar</option>
                            <option value="sauna">Sauna</option>
                            <option value="jacuzzi">Jacuzzi</option>
                        </select>
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