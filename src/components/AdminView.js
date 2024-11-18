import { useState, useEffect } from "react";
import { Container, Row, Col, Table } from "react-bootstrap";
import AddProduct from "./AddProduct";
import EditProduct from "./EditProduct";
import ArchiveProduct from "./ArchiveProduct";

export default function AdminView({ productsData, fetchData }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setProducts(productsData);
  }, [productsData]);

  return (
    <Container className="mt-5">
      <Row className="mb-4">
        <Col className="text-center">
          <h2>Admin Dashboard</h2>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col className="text-center">
          <AddProduct fetchData={fetchData} />
        </Col>
      </Row>
      <Row>
        <Col>
          <Table
            striped
            bordered
            hover
            responsive
            className="text-center align-middle"
          >
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Description</th>
                <th>Price</th>
                <th>Availability</th>
                <th colSpan="2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>{product.description}</td>
                  <td>{product.price}</td>
                  <td
                    className={
                      product.isActive ? "text-success" : "text-danger"
                    }
                  >
                    {product.isActive ? "Available" : "Unavailable"}
                  </td>
                  <td className="text-center">
                    <EditProduct product={product} fetchData={fetchData} />
                  </td>
                  <td className="text-center">
                    <ArchiveProduct
                      productId={product._id}
                      isActive={product.isActive}
                      fetchData={fetchData}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
}
