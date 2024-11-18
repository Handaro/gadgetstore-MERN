import { useState, useEffect, useContext } from "react";
import UserContext from "../context/UserContext";
import AdminView from "../components/AdminView";
import UserView from "../components/UserView";

export default function Products() {
  const [products, setProducts] = useState([]);
  const { user } = useContext(UserContext);

  const fetchData = () => {
    let fetchURL =
      user.isAdmin === true
        ? `${process.env.REACT_APP_API_BASE_URL}/products/all`
        : `${process.env.REACT_APP_API_BASE_URL}/products/active`;

    fetch(fetchURL, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
      });
  };

  useEffect(() => {
    fetchData();
  }, [user]);

  return (
    <>
      <h1>Products</h1>
      {user.isAdmin ? (
        <AdminView productsData={products} fetchData={fetchData} />
      ) : (
        <UserView productsData={products} />
      )}
    </>
  );
}
