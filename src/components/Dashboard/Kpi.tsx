import React from 'react'
import { DataContainer, IconContainer, KpiBox } from './KpiStyle'

interface IKpiProps{
  props:{
    name: string,
    number: string,
    icon: JSX.Element    
  }
}

const Kpi: React.FC<IKpiProps> = ({props}: IKpiProps) => {

  return (
    <KpiBox>
        <IconContainer>
            {props.icon}
        </IconContainer>
        <DataContainer>
            <p>{props.number}</p>
            <p>{props.name}</p>
        </DataContainer>
    </KpiBox>
  )
}

export default Kpi