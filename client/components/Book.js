import React from 'react';

const Book = (props) => {
  const { bookTitle, bookAuthor } = props;

  return <div className='book-container'>{bookTitle + ' - ' + bookAuthor}</div>;
};

export default Book;
