import "./ListView.css";
import React from "react";
import { DetailedListRow } from "components";


// component "ListView" contains div that iterates through bookList and provide detailedListRow
// acts as middle component between DetailedList and DetailedRowList to enable automatic changes when a book is deleted/transferred/copied to another list
// pass bookList to the componenent to allow rerendering automatically
        

export default function ListView({bookList, handleOnRemove, handleOnTransfer, handleOnCopy, modalStatus, errorMessage}) {
   
    return (
		<div className="ListView">
            {bookList.map((book) => (
                <div className="row">
                    <DetailedListRow book={book} handleOnRemove={handleOnRemove} handleOnCopy={handleOnCopy} modalStatus={modalStatus} handleOnTransfer={handleOnTransfer} errorMessage={errorMessage}/>
                </div>	
            ))}
		</div>
	);
}