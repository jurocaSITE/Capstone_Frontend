import "./AuthorPage.css";
import React, { useEffect, useState } from "react";
import { BookPreview } from "components";
import { useSearchContext } from "contexts/search";
import apiClient from "services/apiClient";
import { useParams } from "react-router-dom";

const defaultUserPicture =
  "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80";

export default function AuthorPage() {
  // let offset = 0;
  const { author_name } = useParams();
  const { errors, setErrors } = useSearchContext();
  // const [booksByAuthor, setBooksByAuthor] = useState([]);
  const [booksRelatedToAuth, setBooksRelatedToAuth] = useState([]);
  const [booksAboutAuthor, setBooksAboutAuthor] = useState([]);
  // const [isBooksByAuthorEmpty, setIsBooksByAuthorEmpty] = useState(true);
  const [isBooksAboutAuthorEmpty, setIsBooksAboutAuthorEmpty] = useState(true);

  useEffect(() => {
    const fetchBooksByAuthor = async () => {
      setErrors((e) => ({...e, authors: null}))
      const {data, error} = await apiClient.getBooksByAuthor( author_name )
      console.log("author books data...", data)
      if (error) {
        setErrors((e) => ({...e, authors: error}))
      }
      if (data?.books) {
        setErrors((e) => ({...e, authors: null}))
        setBooksRelatedToAuth(data.books)
      }
    }

    fetchBooksByAuthor()
  }, [author_name, setErrors])

  // useEffect(() => {
  //   const fetchBooksByKeyword = async () => {
  //     offset = 0;
  //     let books_by_author = [];
  //     let books_about_author = [];

  //     const { data, error } = await apiClient.getBooksByKeyword(
  //       author_name,
  //       offset
  //     );
  //     if (error) {
  //       setErrors((e) => ({ ...e, db: error }));
  //     }
  //     if (data?.books) {
  //       setErrors(null);
  //       setBooksRelatedToAuth(data.books);

  //       // console.log("data.books", data.books)
  //       // console.log("data.books[0].authors", data.books[0].authors, "compare to: author_name ", author_name)

  //       // THIS BLOCK FILTERS THE DATA.BOOKS TO ONLY KEEP BOOKS BY THE AUTHOR

  //       for (let i = 0; i < data?.books?.length; i++) {
  //         for (let j = 0; j < data?.books[i]?.authors?.length; j++) {
  //           if (data?.books[i]?.authors[j] === author_name) {
  //             books_by_author.push(data.books[i]);
  //           }
  //         }
  //       }
  //       setBooksByAuthor(books_by_author);

  //       // THIS BLOCK FILTERS THE DATA.BOOKS TO ONLY KEEP BOOKS ABOUT THE AUTHOR

  //       for (let i = 0; i < data.books.length; i++) {
  //         if (data.books[i]?.title?.includes(author_name)) {
  //           books_about_author.push(data.books[i]);
  //         }
  //       }
  //       setBooksAboutAuthor(books_about_author);

  //       if (books_by_author?.length > 0) {
  //         setIsBooksByAuthorEmpty(false);
  //         console.log("isBooksByAuthorEmpty", isBooksByAuthorEmpty);
  //       }

  //       if (books_about_author?.length > 0) {
  //         setIsBooksAboutAuthorEmpty(false);
  //         console.log("isBooksAboutAuthorEmpty", isBooksAboutAuthorEmpty);
  //       }
  //     }
  //   };

  //   fetchBooksByKeyword();
  // }, []); //use effect block runs whenever the dependency changes (the stuff in the array)

  return (
    <div className="AuthorPage">
      <div
        className="container"
        style={{
          backgroundImage: `url(${defaultUserPicture})`,
        }}
      >
        {/* <img className="img" alt="author profile" src={defaultUserPicture} /> */}
        <div className="author-header">
          <h1>{author_name}</h1>
          <h3>1,860,293 monthly readers</h3>
        </div>
      </div>

      <div className="information">
        {errors?.authors ? (<span className="error">{errors.authors}</span>) : null}
        <div className="books-by-and-about-author">
          <h2>Books related to: {author_name}</h2>
          {booksRelatedToAuth?.length > 0 ? (
            <div className="books">
              {booksRelatedToAuth.map((book) => (
                <BookPreview book={book} key={book.title} />
              ))}
            </div>
          ) : (
            <div className="empty-message">
              <h2>We did not find any books related to this author.</h2>
            </div>
          )}

          {/* <h2>{author_name}'s bibliography</h2>
                    {isBooksByAuthorEmpty === false ? (
                        <div className="books">
                            {booksByAuthor.map((book) => (
                                <BookPreview book={book} key={book.title} />
                            ))}
                        </div>
                    ) : (
                        <div className="empty-message">
                            <h2>We did not find any books by this author.</h2>
                        </div>
                    )} */}

          {/* <h2>Books written about {author_name}</h2>
                    {isBooksAboutAuthorEmpty === false ? (
                        <div className="books">
                            {booksAboutAuthor.map((book) => (
                                <BookPreview book={book} key={book.title} />
                            ))}
                        </div>
                    ) : (
                        <div className="empty-message">
                            <h2>We did not find any books about this author.</h2>
                        </div>
                    )} */}

          {/* <h2>Books written about {author_name}</h2>
          {isBooksAboutAuthorEmpty === false ? (
            <div className="books">
              {booksAboutAuthor.map((book) => (
                <BookPreview book={book} key={book.title} />
              ))}
            </div>
          ) : (
            <div className="empty-message">
              <h2>We did not find any books about this author.</h2>
            </div>
          )} */}
        </div>
      </div>
    </div>
  );
}
