import { Col, Card, CardTitle, CardFooter, CardBody } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function PreviewProduct(prop) {
  const { breakPoint, data } = prop;

  const { _id, name, description, price } = data;
  return (
    <Col xs={12} md={breakPoint}>
      <Card className="cardHighlight">
        <CardBody>
          <CardTitle className="text-center">
            <Link to={`/products/${_id}`}>{name}</Link>
          </CardTitle>
          <Card.Text>{description}</Card.Text>
        </CardBody>
        <CardFooter>
          <h5 className="text-center">Php {price}</h5>
          <Link className="btn btn-primary d-block" to={`/products/${_id}`}>
            Details
          </Link>
        </CardFooter>
      </Card>
    </Col>
  );
}
