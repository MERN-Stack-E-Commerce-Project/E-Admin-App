import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import NewModel from "../../components/UI/Model/Model";
import { Col, Row } from "react-bootstrap";
import Input from "../../components/UI/Input";
import { Navigate } from "react-router-dom";
import linearCategoryList from "../../helpers/linearCategoryList";
import { useDispatch, useSelector } from "react-redux";
import { createPage } from "../../actions";

export default function Page() {
  const [createModel, setCreateModel] = useState(false);
  const [title, settitle] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const category = useSelector((state) => state.category);
  const page = useSelector((state) => state.page);
  const dispatch = useDispatch();
  const [categories, setcategories] = useState([]);
  const [desc, setDesc] = useState("");
  const [type, setType] = useState("");
  const [banners, setBanners] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setcategories(linearCategoryList(category.categories));
  }, [category]);

  useEffect(() => {
    console.log(page);
    if (!page.loading) {
      setCreateModel(false);
      setCategoryId("");
      settitle("");
      setDesc("");
      setBanners([]);
      setProducts([]);
    }
  }, [page]);

  const token = window.localStorage.getItem("FCtoken");
  if (!token) {
    return <Navigate replace to="/signin" />;
  }

  const handelBannerImage = (e) => {
    setBanners([...banners, e.target.files[0]]);
  };

  const handelProductImage = (e) => {
    setProducts([...products, e.target.files[0]]);
  };
  const onCategoryChange = (e) => {
    setCategoryId(e.target.value);
    console.log(categoryId);
    const cat = categories.find((category) => category._id == e.target.value);

    if (cat && cat.type) setType(cat.type);
  };

  const handleCloseCreatePageModel = (e) => {
    // const submitPageForm=(e)=>{
    e.preventDefault();
    // }
    setCreateModel(false);
    if (title == "") {
      alert("Title is required");
      return;
    }
    const form = new FormData();
    form.append("title", title);
    form.append("description", desc);
    form.append("category", categoryId);
    form.append("type", type);
    banners.forEach((banner, indx) => {
      form.append("banners", banner);
    });
    products.forEach((product, indx) => {
      form.append("products", product);
    });

    dispatch(createPage(form));
  };

  const renderCreatePageModel = () => {
    return (
      <NewModel
        show={createModel}
        setshow={setCreateModel}
        handleClose={handleCloseCreatePageModel}
        modelTitle={"Create New Page"}
      >
        <Row>
          <Col>
            <select
              className="form-control"
              value={categoryId}
              onChange={onCategoryChange}
            >
              <option value={""}>Select Category</option>
              {categories.map((cat) => (
                <option value={cat.value} key={cat.value}>
                  {cat.name}
                </option>
              ))}
            </select>
          </Col>
        </Row>
        <Row>
          <Col>
            <Input
              value={title}
              type={"text"}
              onChange={(e) => settitle(e.target.value)}
              placeholder={"Page Title"}
              className="form-control-sm"
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <Input
              value={desc}
              type={"text"}
              onChange={(e) => setDesc(e.target.value)}
              placeholder={"Page Description"}
              className="form-control-sm"
            />
          </Col>
        </Row>
        <Row>
          {banners && banners.length > 0 &&
            banners.map((banner, indx) => (
              <Row key={indx}>
                {banner && <Col>{banner.name}</Col>}
              </Row>
            ))}
          <Col>
            <Input
              type="file"
              name="banners"
              onChange={(e) => handelBannerImage(e)}
            />
          </Col>
        </Row>
        <Row>
          {products && products.length > 0 &&
            products.map((product, indx) => (
              <Row key={indx}>
                {product && <Col>{product.name}</Col>}
              </Row>
            ))}
          <Col>
            <Input
              type="file"
              name="products"
              onChange={(e) => handelProductImage(e)}
            />
          </Col>
        </Row>
      </NewModel>
    );
  };

  return (
    <Layout sidebar={true}>
      {page.loading ? (
        <p>creating page ......please wait</p>
      ) : (
        <>
          {renderCreatePageModel()}
          <button onClick={() => setCreateModel(true)}>Create Page</button>
        </>
      )}
    </Layout>
  );
}
