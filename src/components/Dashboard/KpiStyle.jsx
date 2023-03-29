import styled from 'styled-components';

const KpiBox = styled.div`
    display: flex;
    background-color: white;
    padding: 20px;
    box-shadow: 0px 4px 4px #00000005;
    border-radius: 12px;
    gap: 20px;
    min-width: 300px;

    &:hover{
        transform: scale(1.05);
        transition: all .5s;
        box-shadow: 0px 16px 30px #00000014;
        div:first-child{
            background-color: red;
            color: white;
        }
    }
`

const IconContainer = styled.div`
    padding: 20px;
    background-color: #FFEDEC;
    color: red;
    border-radius: 12px;
    font-size: 20px;
`

const DataContainer = styled.div`
    display: flex;
    flex-direction: column;
    p{
        &:first-child{
            font-size: 30px;
            color: #393939;
            font-weight: 600;
        }
        color: #787878;
        font-size: 14px;
    }
`

export{
    KpiBox,
    IconContainer,
    DataContainer
}