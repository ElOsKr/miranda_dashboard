import styled from 'styled-components';

const MainContainer = styled.div`
    padding: 100px;
    font-family: var(--font-Poppins);
    color: #393939;
`

const FormUserContainer = styled.div`
    background-color: white;
    border-radius: 8px;
    overflow: hidden;
    padding: 20px;
    margin: 0 auto;
    width: min(100%, 1000px);

    label, input{
        display:block
    }

    label{
        font-weight: 600;
        font-size: 18px;
    }
`

const FormHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`

const FormPhoto = styled.div`
    width: 70px;
    height: 70px;
    background-color: grey;
    margin-bottom: 10px;
`

export {
    MainContainer,
    FormUserContainer,
    FormHeader,
    FormPhoto
}