import React from 'react'
import { Filter, FilterContainer } from './FilterTableStyle'

function FilterTable(props) {
  return (
    <FilterContainer>
        {props.filters.map((filter, i)=>{
            return (
                <Filter key={i}>
                    <p>
                        {filter}
                    </p>
                </Filter>
            )
        })}
    </FilterContainer>
  )
}

export default FilterTable