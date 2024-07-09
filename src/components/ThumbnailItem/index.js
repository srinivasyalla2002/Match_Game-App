import './index.css'

const AppItem = props => {
  const {thumbnailDetails, isSameImage} = props
  const {id, thumbnailUrl} = thumbnailDetails

  const onClickThumbnail = () => {
    isSameImage(id)
  }

  return (
    <>
      <li className="img-item">
        <button type="button" className="img-btn" onClick={onClickThumbnail}>
          <img src={thumbnailUrl} alt="thumbnail" className="img-icon" />
        </button>
      </li>
    </>
  )
}

export default AppItem
