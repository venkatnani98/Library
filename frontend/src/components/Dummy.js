 
      <Table className="bookDisplay">
        <thead>
          <tr className="bDrow">
            <th>Book Id</th>
            <th>Book Name</th>
            <th>Author</th>
            <th>Branch</th>
            <th>Year</th>
            <th>Stock</th>
          </tr>
        </thead>
        <tbody>
           {!books || books.length <= 0 ? (
            <tr className="bDrow">
              <td colSpan="6" align="center">
                <b>Ops, no one here yet</b>
              </td>
            </tr>
          ) : ( 
            books.map(book => (
              <tr className="bDrow" key={book.id}>
                <td>{book.BookId}</td>
                <td>{book.BookName}</td>
                <td>{book.Author}</td>
                <td>{book.Branch}</td>
                <td>{book.Year}</td>
                <td>{book.Stock}</td> 
                <td align="center">
                   <NewBookModal
                    create={false}
                    book={book}
                    resetState={this.props.resetState}
                  />
                  &nbsp;&nbsp;
                  <ConfirmationModal
                    pk={book.pk}
                    resetState={this.props.resetState}
                  />
                </td>
                </tr>
                ))
          )}
            </tbody>
          </Table>