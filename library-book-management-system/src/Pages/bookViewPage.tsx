import useBookDetail from "../GetDetails/fetchBookDetail";
import { Container, Card, Button } from "react-bootstrap";
import "../CSS/bookView.css";
import NavBar from "./NavBar";

export default function BookViewPage() {
  const book = useBookDetail();
  if (!book) return <h3 className="text-center mt-5">Loading...</h3>;

  return (
    <>
      <NavBar></NavBar>
      <Container className="d-flex justify-content-center align-items-center vh-100 mt-3">
        <Card className="book-detail-card shadow-lg">
          <Card.Img variant="top" src={book.image} className="detail-img" />

          <Card.Body className="text-center">
            <Card.Title>{book.title}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              by {book.author}
            </Card.Subtitle>

            <Card.Text>
              <strong>ISBN:</strong> {book.isbn} <br />
              <strong>Format:</strong> {book.format}
              <br />
              <strong>Price:</strong> {book.price}
            </Card.Text>

            <hr />

            <h5>📖 Why should you read this book?</h5>
            <p>
              {book.reason ||
                "This book provides deep insights, practical knowledge, and enhances your understanding of the subject."}
            </p>

            <Button variant="success">
              <i className="bi bi-cart-plus"></i> Add to Cart
            </Button>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
}
