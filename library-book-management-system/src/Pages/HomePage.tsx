import { Button, Col, Row } from "react-bootstrap";
import "../CSS/home.css";

/* Button to navigate to Book view page */
function HomePage() {
  const data = [
    {
      image: "/login.jpg",
      description: "Some books leave us free and some books make us free.",
    },
    {
      image: "/login.jpg",
      description:
        "The reading of all good books is like a conversation with the finest minds of past centuries.",
    },
    {
      image: "/login.jpg",
      description: "Books may well be the only true magic.",
    },
  ];

  return (
    <>
      <Row className="g-4">
        {data.map((book, i) => (
          <Col key={i} xs={12} sm={6} md={4}>
            <div className="book-card">
              <img
                src={book.image}
                alt={book.description}
                className="book-img"
              />

              <div className="book-content">
                <h5>{book.description}</h5>
                <Button variant="dark">Buy Book</Button>
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </>
  );
}

export default HomePage;
