import React from 'react'
import { Filter, FilterContainer } from './FilterTableStyle'

function FilterTable(props: any) {
  return (
    <FilterContainer>
        {props.filters.map((filter: any, i: number)=>{
            return (
                <Filter key={i}>
                    <p onClick={filter.action}>
                        {filter.name}
                    </p>
                </Filter>
            )
        })}
    </FilterContainer>
  )
}

export default FilterTable