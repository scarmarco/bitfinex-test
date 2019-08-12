import React from 'react'

const OrderBook = ({ books }) => {
  return (
    <div>
      {books.map((book, i) => (
        <div key={i}>
          <span>
            {book[0]}
          </span>
        </div>
      ))}
    </div>
  )
}

export default OrderBook
