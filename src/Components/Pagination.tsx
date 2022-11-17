import { useState } from 'react'
import { PaginationProps } from '../Types/PaginationType'

const Pagination: React.FC<PaginationProps> = ({
  collectionLength,
  photosPerPage,
  onChangeNumPage,
}) => {
  const [activeButton, setActiveButton] = useState(1)

  const buttons = []
  for (let i = 1; i <= Math.ceil(collectionLength / photosPerPage); i++) {
    buttons.push(i)
  }

  const onChangePage = (num: number) => {
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
