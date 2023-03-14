import React from 'react'
import LuxuriousCollectionItem from './luxuriousCollectionItem/luxuriousCollectionItem'
import './luxuriouCollection.css'
function luxuriousCollection() {
  return (
    <div className='luxurious__collection'>
      <div className="luxurious_collection_items_title">
        <h2>OUR LUXURIOUS COLLECTION</h2>
        <div className="line-in-middle"></div>
      </div>
      <div className='luxurious_collection_items_content'>
      <LuxuriousCollectionItem/>
      <LuxuriousCollectionItem/>
      <LuxuriousCollectionItem/>
      </div>
     
    </div>
  )
}

export default luxuriousCollection