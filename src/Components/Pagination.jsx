import React, { useState } from 'react'

const Pagination = ({ collectionLength, photosPerPage, onChangeNumPage }) => {
  const [activeButton, setActiveButton] = useState(1)

  const buttons = []
  for (let i = 1; i <= Math.ceil(collectionLength / photosPerPage); i++) {
    buttons.push(i)
  }

  const onChangePage = (num) => {
    setActiveButton(num)
    onChangeNumPage(num)
  }

  return (
    <ul className="pagination">
      {buttons.map((el) => (
        <li
          onClick={() => onChangePage(el)}
          className={activeButton === el ? 'active' : ''}
          key={el}
        >
          {el}
        </li>
      ))}
    </ul>
  )
}

export default Pagination
