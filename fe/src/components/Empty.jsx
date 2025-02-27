import React from 'react'
import { Link } from "react-router-dom";

export default function Empty() {
  
  return (
    <div>
      <div>Empty</div>
      <Link to={'./create'}>추가</Link>
    </div>
  )
}
