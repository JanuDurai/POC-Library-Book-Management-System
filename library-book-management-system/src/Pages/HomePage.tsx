import { Button, Col, Container, Row } from "react-bootstrap";
import "../CSS/home.css";
import FetchBooks from "../GetDetails/FetchBooks";
import { useNavigate } from "react-router-dom";

/* Button to navigate to Book view page */
function HomePage() {
  const bookDetails = FetchBooks() || [];
  const navigate = useNavigate();
  
  function handleDetailsView(id:string){
    navigate(`/book/details/${id}`);
  }

  return (
    <>
      <Container>
        <Row>
          {bookDetails.map((book: any, index: any) => (
            <div className="col-md-4 mb-4" key={index}>
              <div className="book-card">
                <img src={book.image} alt={book.title} className="book-img" />

                <div className="book-content">
                  <h5>{book.title}</h5>
                  <Button variant="dark" onClick={()=>handleDetailsView(book.id)}>Buy Book</Button>
                </div>
              </div>
            </div>
          ))}
        </Row>
      </Container>
    </>
  );
}

export default HomePage;
