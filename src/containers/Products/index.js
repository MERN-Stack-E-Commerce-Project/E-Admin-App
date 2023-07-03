import React, { useState } from "react";
import Layout from "../../components/Layout";
import { Navigate } from "react-router-dom";
import { Button, Col, Container, Row, Table } from "react-bootstrap";
import Input from "../../components/UI/Input";
import "bootstrap/dist/css/bootstrap.min.css";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../../actions";
import NewModel from "../../components/UI/Model/Model";
import "./style.css";
export default function Products(props) {
  const category = useSelector((state) => state.category);

  const product = useSelector((state) => state.product);
  const dispatch = useDispatch();
  const [show, setshow] = useState(false);
  const [name, setname] = useState("");
  const [quantity, setQuantity] = useState();
  const [price, setPrice] = useState();
  const [categoryId, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [productPictures, setProductPictures] = useState([]);
  const [productDetailModal, setproductDetailModal] = useState(false);
  const [productDetails, setproductDetails] = useState("");
  const token = window.localStorage.getItem("FCtoken");
  if (!token) {
    return <Navigate replace to="/signin" />;
  }

  const handleClose = () => {
    const form = new FormData();
    form.append("name", name);
    form.append("price", price);
    form.append("quantity", quantity);
    form.append("description", description);
    form.append("category", categoryId);
    for (let pic of productPictures) {
      form.append("productPictures", pic);
    }
    dispatch(addProduct(form));
    setshow(false);
  };
  const handleShow = () => setshow(true);

  const createCategoryList = (categories, options = []) => {
    for (let cate of categories) {
      options.push({ value: cate._id, name: cate.name });
      if (cate.children && cate.children.length > 0) {
        createCategoryList(cate.children, options);
      }
    }
    return options;
  };

  const handleProductPictures = (e) => {
    console.log(productPictures);
    setProductPictures([...productPictures, e.target.files[0]]);
  };

  const renderProducts = () => {
    return (
      <Table style={{ fontSize: 12 }} responsive="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Category</th>
          </tr>
        </thead>
        <tbody>
          {product.products && product.products.length > 0
            ? product.products.map((product, indx) => {
                return (
                  <tr
                    onClick={() => showProductDetailsModal(product)}
                    key={product._id}
                  >
                    <td>{1 + indx}</td>
                    <td>{product.name}</td>
                    <td>{product.price}</td>
                    <td>{product.quantity}</td>
                    <td>{product.category.name}</td>
                  </tr>
                );
              })
            : null}
        </tbody>
      </Table>
    );
  };

  const handleCloseProductDetailsModel = () => {
    setproductDetailModal(false);
    return;
  };

  const renderProductDetails = (product) => {
    return (
      <NewModel
        show={productDetailModal}
        setshow={setproductDetailModal}
        handleClose={handleCloseProductDetailsModel}
        modelTitle={"Product Details"}
        sz="lg"
      >
        <>
          <Row>
            <Col md={6}>
              <lable className="key">Name</lable>
              <p className="value">{productDetails.name}</p>
            </Col>
            <Col md={6}>
              <lable className="key">Price</lable>
              <p className="value">{productDetails.price}</p>
            </Col>
          </Row>
          <Row>
            <Col md={"6"}>
              <lable className="key">Quantity</lable>
              <p className="value">{productDetails.quantity}</p>
            </Col>
            <Col md={"6"}>
              <lable className="key">Category</lable>
              <p className="value">
                {productDetails.category ? productDetails.category.name : null}
              </p>
            </Col>
          </Row>
          <Row>
            <Col md={"12"}>
              <lable className="key">Description</lable>
              <p className="value">{productDetails.description}</p>
            </Col>
          </Row>
          <Row>
            <Col>
              <label className="key">Product Pictures</label>
              <div style={{ display: "flex" }}>
                {productDetails.productPictures
                  ? productDetails.productPictures.map((pic, indx) => (
                      <div className="productImgContainer">
                        <img src={pic.img} alt={`pic ${indx}`} />
                      </div>
                    ))
                  : null}
              </div>
            </Col>
          </Row>
        </>
      </NewModel>
    );
  };

  const showProductDetailsModal = (product) => {
    setproductDetailModal(true);
    //  renderProductDetails(product);
    setproductDetails(product);
    console.log(product);
  };

  return (
    <Layout sidebar={true}>
      <Container>
        <Row>
          <Col md={12}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h1>Product</h1>
              <Button variant="secondary" onClick={handleShow}>
                Add
              </Button>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>{renderProducts()}</Col>
        </Row>
      </Container>

      <NewModel
        display="inherit"
        show={show}
        setshow={setshow}
        handleClose={handleClose}
        modelTitle={"Add New Product"}
      >
        <Input
          label="Name"
          value={name}
          placeholder={"Product name"}
          onChange={(e) => setname(e.target.value)}
        />
        <Input
          label="Quantity"
          value={quantity}
          placeholder={"Quantyity"}
          onChange={(e) => setQuantity(e.target.value)}
        />
        <Input
          label="Price"
          value={price}
          placeholder={"Price"}
          onChange={(e) => setPrice(e.target.value)}
        />
        <Input
          label="Description"
          value={description}
          placeholder={"Description"}
          onChange={(e) => setDescription(e.target.value)}
        />

        <select
          className="form-control"
          onChange={(e) => setCategory(e.target.value)}
          value={categoryId}
        >
          <option value={""}>select category</option>
          {createCategoryList(category.categories).map((option) => (
            <option key={option.value} value={option.value}>
              {option.name}
            </option>
          ))}
        </select>
        {productPictures.length > 0 ? (
          <>
            {productPictures.map((pic, indx) => {
              return <p>{pic.name}</p>;
            })}
          </>
        ) : null}

        <input
          type="file"
          name="ProductPictures"
          onChange={handleProductPictures}
        />
      </NewModel>
      {renderProductDetails()}
    </Layout>
  );
}
