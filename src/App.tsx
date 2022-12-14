import { useEffect, useState } from 'react'
import { Collection } from './Components/Collection'
import Pagination from './Components/Pagination'
import Skeleton from './Components/Skeleton'
import { CategoriesType, ObjectType } from './Types/AppType'
import './index.scss'

const _categories: CategoriesType[] = [
  { name: 'Все' },
  { name: 'Море' },
  { name: 'Горы' },
  { name: 'Архитектура' },
  { name: 'Города' },
]

const App: React.FC = () => {
  const [collection, setCollection] = useState([])
  const [category, setCategory] = useState([])
  const [activeItem, setActiveItem] = useState('Все')
  const [searchValue, setSearchValue] = useState('')
  const [loading, setLoading] = useState(false)

  const [page, setPage] = useState(1)
  const [photosPerPage] = useState(3)

  const lastPhotoIndex = page * photosPerPage
  const firstPhotoIndex = lastPhotoIndex - photosPerPage
  const needCoolection = collection.slice(firstPhotoIndex, lastPhotoIndex)

  useEffect(() => {
    async function getData() {
      setLoading(true)
      await fetch('http://localhost:3000/data.json')
        .then((res) => res.json())
        .then((json) => setCollection(json.collections))
      setLoading(false)
    }
    getData()
  }, [])

  const onClickCategories = (name: string, id: number) => {
    setActiveItem(name)
    setCategory(collection.filter((el: ObjectType) => el.category === id))
  }

  return (
    <div className="App">
      <h1>Моя коллекция фотографий</h1>
      <div className="top">
        <ul className="tags">
          {_categories.map((el, id) => (
            <li
              className={activeItem === el.name ? 'active' : ''}
              onClick={() => onClickCategories(el.name, id)}
              key={el.name}
            >
              {el.name}
            </li>
          ))}
        </ul>
        <input
          onChange={(e) => setSearchValue(e.target.value)}
          className="search-input"
          placeholder="Поиск по названию"
        />
      </div>
      <div className="content">
        {loading
          ? [...new Array(3)].map((_, id) => {
              return <Skeleton key={id} />
            })
          : activeItem === 'Все'
          ? needCoolection
              ?.filter((el: ObjectType) =>
                el.name.toLowerCase().includes(searchValue.toLowerCase()),
              )
              .map((el: ObjectType) => (
                <Collection key={el.name} name={el.name} images={el.photos} />
              ))
          : category
              .filter((el: ObjectType) =>
                el.name.toLowerCase().includes(searchValue.toLowerCase()),
              )
              .map((el: ObjectType) => (
                <Collection key={el.name} name={el.name} images={el.photos} />
              ))}
      </div>
      <Pagination
        collectionLength={collection.length}
        photosPerPage={photosPerPage}
        onChangeNumPage={(num: number) => setPage(num)}
      />
    </div>
  )
}

export default App
