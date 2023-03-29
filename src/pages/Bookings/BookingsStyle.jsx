import styled from 'styled-components';

const MainContainer = styled.div`
    padding: 50px;
    font-family: var(--font-Poppins);
`

const OptionsContainer = styled.div`
    display: flex;
    justify-content: space-between;
`

const BookingRoom = styled.div`
    display: flex;
    gap: 20px;
`

const BookingRoomImg = styled.div`
    width: 50px;
    height: 50px;
    img{
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`

const GuestInfo = styled.div`

    p:nth-child(2n){
        font-size: 14px;
        color: #799283;
    }
`

const RequestButtonEmpty = styled.button`
    background: none;
    color: #799283;
    border: 1px solid #799283;
    font-family: var(--font-Poppins);
    font-weight: 600;
`

const RequestButton = styled.button`
    background-color: #EEF9F2;
    border: none;
    width: 100%;
    border-radius: 12px;
    padding: 10px 0;
    font-family: var(--font-Poppins);
    font-weight: 600;
`

export {
    MainContainer,
    OptionsContainer,
    BookingRoom,
    BookingRoomImg,
    GuestInfo,
    RequestButtonEmpty,
    RequestButton
}