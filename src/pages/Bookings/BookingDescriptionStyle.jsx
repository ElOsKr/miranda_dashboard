import styled from 'styled-components';

const MainContainer = styled.div`
    padding: 50px;
`
const BookingContainer = styled.div`
    display: flex;
    background-color: white;
    border-radius: 12px;
    overflow: hidden;
    min-width: 830px;
`

const DataContainer = styled.div`
    width: 50%;
    padding: 40px;
`;

const UserContainer = styled.div`
    display: flex;
`

const UserPhoto = styled.div`
    width: 156px;
    height: 156;
    border-radius: 12px;
    overflow: hidden;

    img{
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`

const UserData = styled.div`
    flex-grow: 1;
    padding-left: 20px;
    h2{
        font-size: 32px;
    }

    p{
        color: #799283;
        font-size: 14px;
        margin-top: 10px;
    }
`
const UserContact = styled.div`
    display: flex;
    margin-top: 20px;
    gap: 10px;
`

const TelephoneButton = styled.button`
    background: none;
    color: #135846;
    border: 1px solid #E8F2EF;
    padding: 10px 10px 5px 10px;
    font-size: 20px;
    border-radius: 12px;
    svg{
        margin-top:2px;
    }
`

const MessageButton = styled.button`
    color: white;
    padding: 5px 10px;
    background-color: #135846;
    border-radius: 12px;
    border: none;
    font-size: 16px;
    svg{
        font-size: 30px;
    }
`

const UserOptions = styled.p`
    color: #6E6E6E;
    margin-top: 10px;
    svg{
        cursor: pointer;
    }
   
`

const PhotoContainer = styled.div`
    width: 50%;

    img{
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`

export {
    MainContainer,
    BookingContainer,
    DataContainer,
    UserContainer,
    UserPhoto,
    UserData,
    UserContact,
    TelephoneButton,
    MessageButton,
    UserOptions,
    PhotoContainer
}