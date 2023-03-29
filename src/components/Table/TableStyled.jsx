import styled from 'styled-components';

const TableStyled = styled.table`
    font-size: 16px;
    margin-top: 20px;
    background-color: white;
    border-radius: 20px;
    padding-top: 20px;
    width: 100%;
    thead{
        tr{
            th{
                text-align: start;
                padding-left: 20px;
            }
        }
    }

    tbody{
        a{
            color: black;
            text-decoration: none;
        }
        td{
            padding: 5px 20px;
            border-top: 1px solid #F5F5F5;
        }
    }
`

export{
    TableStyled
}