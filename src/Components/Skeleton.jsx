import React from 'react'
import ContentLoader from 'react-content-loader'

const Skeleton = () => (
  <ContentLoader
    speed={0}
    width={345}
    height={450}
    viewBox="0 0 345 450"
    backgroundColor="#e0e0e0"
    foregroundColor="#ffffff"
  >
    <rect x="30" y="9" rx="20" ry="20" width="284" height="251" />
    <rect x="30" y="275" rx="10" ry="10" width="90" height="81" />
    <rect x="222" y="275" rx="10" ry="10" width="90" height="81" />
    <rect x="127" y="275" rx="10" ry="10" width="90" height="81" />
    <rect x="31" y="375" rx="10" ry="10" width="148" height="25" />
  </ContentLoader>
)

export default Skeleton
