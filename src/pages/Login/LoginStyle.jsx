import styled from 'styled-components';

const MainContainer = styled.div`
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-content: center;
    font-family: 'Poppins', 'sans-serif';
`;

const Form = styled.form`
    height: 60%;
    width: 50%;
    box-shadow: 0px 10px 24px rgba(126, 126, 126, 0.25);
    align-self: center;
    padding: 40px;
    display: flex;
    flex-direction: column;
    text-align: center;
    margin-bottom: 100px;

    @media (max-width: 850px){
        width: 90%;
    }
`

const Message = styled.h2`
    margin-bottom: 30px;
    font-size: 15px;
`

const Label = styled.label`
    margin-bottom: 10px;
`

const Input = styled.input`
    width: min(320px, 80%);
    margin: 0 auto;
    border: none;
    border-bottom: 1px solid black;
    outline: none;
    background: none;
`

const Button = styled.input`
    padding: 20px;
    font-family: 'Poppins', 'sans-serif';
    margin-top: 20px;
    max-width: 120px;
    margin: 20px auto;
    background: none;
    border: 1px solid black;
    cursor: pointer;
    border-radius: 10px;
    transition: all .3s;
    &:hover{
        transform: scale(1.2);
    }
`

const LogoContainer = styled.div`
    display: flex;
    font-family: 'Archivo';
    align-content: center;
    gap: 20px;
    margin: 20px auto;

`

const TitleLogo = styled.div`
    font-size: 20px;
    align-self: center;
    font-weight: 400;
    text-align: start;
    p:first-child{
        font-weight: 700;
    }

`

const LogoLetter = styled.div`
    font-size: 50px;
    font-weight: 700;
    padding: 10px 20px;
    box-shadow: 0px 10px 14px rgba(139, 139, 139, 0.25);
`

export {
    MainContainer,
    Form,
    Message,
    Label,
    Input,
    Button,
    LogoContainer,
    TitleLogo,
    LogoLetter
};