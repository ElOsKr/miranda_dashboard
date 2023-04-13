import { LinearProgress } from '@mui/material';
import React from 'react';

import styled from 'styled-components';

const Container = styled.div`
    width: 70%;
    margin: 0 auto;
    margin-top: 40%;
`

function CharginProgress() {
  return (
    <Container>
        <LinearProgress />
    </Container>
  )
}

export default CharginProgress