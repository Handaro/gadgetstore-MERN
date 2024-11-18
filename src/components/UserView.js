import { useState, useEffect } from "react";
import React from "react";
import ProductCard from "../components/ProductCard";
/* import ProductSearch from "./ProductSearch";
import ProductSearchPrice from "./ProductSearchPrice"; */

const UserView = ({ productsData }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setProducts(
      productsData.length &&
        productsData.map((product) => {
          return <ProductCard key={product._id} productProp={product} />;
        })
    );
  }, [productsData]);

  return (
    <div className="d-flex flex-wrap gap-5">
      {/* <ProductSearch />
      <ProductSearchPrice /> */}
      {products}
    </div>

    // <Container>
    //   <h2 className="my-4">Available Courses</h2>
    //   <Row>
    //     {coursesData.map((course, index) => (
    //       <Col md={4} key={index} className="mb-4">
    //         <Card>
    //           <Card.Body>
    //             <Card.Title>{course.name}</Card.Title>
    //             <Card.Subtitle>Description:</Card.Subtitle>
    //             <Card.Text>{course.description}</Card.Text>
    //             <Card.Subtitle>Price:</Card.Subtitle>
    //             <Card.Text>{course.price}</Card.Text>
    //             <Button variant="primary" >Details
    //             </Button>
    //           </Card.Body>
    //         </Card>
    //       </Col>
    //     ))}
    //   </Row>
    // </Container>
  );
};

export default UserView;
