import React from 'react'
import { Filter, FilterContainer } from './FilterTableStyle'

function FilterTable(props) {
  return (
    <FilterContainer>
        {props.filters.map((filter, i)=>{
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