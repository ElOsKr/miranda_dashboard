import styled from 'styled-components';

const NavbarMain = styled.div`
    min-height: 100%;
    position: relative;
    background-color: white;
    text-align: center;
    padding: 40px 30px;
    font-family: var(--font-Poppins);
`;

const LogoContainer = styled.div`
    display: flex;
    font-family: 'Archivo';
    align-content: center;
    gap: 20px;

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
    box-shadow: 0px 14px 24px rgba(139, 139, 139, 0.25);
`

const ListLinks = styled.ul`
    padding-left: 30px;
    padding-top: 80px;
    list-style: none;
    text-align: start;
    li{
        position: relative;
        a{
            display: flex;
            align-items: center;
            color: #799283;
            text-decoration: none;
            gap: 20px;
            font-size: 18px;
            margin-bottom: 50px;

            &.active{
                color: red;
            }
        }
    }
`
const CircleLink = styled.span`
    &.active{
        overflow: visible;
        position: absolute;
        left: -80px;
        top: -20px;
        border-radius: 30px;
        display: inline-block;
        height: 60px;
        width: 40px;
        background-color: red;        
    }
`;


export {
    NavbarMain,
    TitleLogo,
    LogoContainer,
    LogoLetter,
    ListLinks,
    CircleLink
}