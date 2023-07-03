import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { Col, Container, Modal, Row, Button } from "react-bootstrap";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addCategory,
  deleteSelectedCategories,
  getAllCategory,
  getInitialData,
  updateCategories,
} from "../../actions";
import "./style.css"
import "bootstrap/dist/css/bootstrap.min.css";
import Input from "../../components/UI/Input";
import NewModel from "../../components/UI/Model/Model";
import CheckboxTree from "react-checkbox-tree";
import "react-checkbox-tree/lib/react-checkbox-tree.css";
import {
  IoIosCheckboxOutline,
  IoIosCheckbox,
  IoMdArrowDropright,
  IoMdArrowDropdown,
  IoMdCheckboxOutline,
  IoMdCheckmarkCircleOutline,
} from "react-icons/io";

export default function Category(props) {
  const category = useSelector((state) => state.category);
  const dispatch = useDispatch();

  const [name, setname] = useState("");
  const [parentOfCategory, setparentOfCategory] = useState("");
  const [categoryImage, setcategoryImage] = useState("");
  const [show, setshow] = useState(false);
  const [checked, setChecked] = useState([]);
  const [expanded, setExpanded] = useState([]);
  const [checkedArray, setcheckedArray] = useState([]);
  const [expandedArray, setexpandedArray] = useState([]);
  const [updateCategory, setupdateCategory] = useState(false);
  const [deleteCategoryModel, setDeleteCategoryModel] = useState(false);

  const handleCategoryImage = (e) => {
    setcategoryImage(e.target.files[0]);
  };

  const token = window.localStorage.getItem("FCtoken");
  if (!token) {
    return <Navigate replace to="/signin" />;
  }

  const renderCategories = (categories) => {
    let mycategory = [];
    for (let cate of categories) {
      mycategory.push({
        label: cate.name,
        value: cate._id,
        children:
          cate.children &&
          cate.children.length > 0 &&
          renderCategories(cate.children),
      });
    }
    return mycategory;
  };

  let categoryList = [];
  const createCategoryList = (categories, options = []) => {
    for (let cate of categories) {
      options.push({
        value: cate._id,
        name: cate.name,
        parentId: cate.parentId,
        type:cate.type,
      });
      if (cate.children && cate.children.length > 0) {
        createCategoryList(cate.children, options);
      }
    }
    return options;
  };

  const handleShow = () => setshow(true);
  const handleClose = () => {
    setshow(false);
    if(name===""){
      alert("category name required");
      return;
    }
    const form = new FormData();
    form.append("name", name);
    form.append("categoryImage", categoryImage);
    form.append("parentId", parentOfCategory);
    dispatch(addCategory(form));
    setcategoryImage("");
    setname("");
    setparentOfCategory("");
  };

  const updateCategoryhandleClose = () => {
    setupdateCategory(false);
    const form = new FormData();

    expandedArray.forEach((item, indx) => {
      form.append("_id", item.value);
      form.append("name", item.name);
      form.append("parentId", item.parentId ? item.parentId : "");
      form.append("type", item.type);
    });
    checkedArray.forEach((item, indx) => {
      form.append("_id", item.value);
      form.append("name", item.name);
      form.append("parentId", item.parentId ? item.parentId : "");
      form.append("type", item.type);
    });
    console.log("form2",form,expandedArray,checkedArray);
    dispatch(updateCategories(form)).then((res) => {
      if (res) {
        dispatch(getInitialData());
        // dispatch(getAllCategory());
        // window.location.reload();//////////////
      }
    });
  };

  const updateEditedCategory = () => {
    setupdateCategory(true);
    updateCheckedAndExpandedCategories();
  };

  const updateCheckedAndExpandedCategories = () => {
    const categories = createCategoryList(category.categories);
    const checkedArray = [];
    const expandedArray = [];
    checked.length > 0 &&
      checked.forEach((categoryId, indx) => {
        const category = categories.find(
          (category, _indx) => categoryId == category.value
        );
        category && checkedArray.push(category);
      });
    expanded.length > 0 &&
      expanded.forEach((categoryId, indx) => {
        const category = categories.find(
          (category, _indx) => categoryId == category.value
        );
        category && expandedArray.push(category);
      });
    // console.log(checked, expanded, categories, checkedArray, expandedArray);
    setexpandedArray(expandedArray);
    setcheckedArray(checkedArray);
  };

  const handleCategoryEditedInput = (key, value, indx, type) => {
    if (type == "checked") {
      const updatedCheckedArray = checkedArray.map((item, _indx) =>
        indx == _indx
          ? {
              ...item,
              [key]: value,
            }
          : item
      );
      setcheckedArray(updatedCheckedArray);
    } else if (type == "expanded") {
      const updatedexpandedArray = expandedArray.map((item, _indx) =>
        indx == _indx
          ? {
              ...item,
              [key]: value,
            }
          : item
      );
      setexpandedArray(updatedexpandedArray);
    }
  };

  const renderUpdateCategoryModel = () => {
    return (
      <NewModel
        sz="lg"
        display="inherit"
        show={updateCategory}
        setshow={setupdateCategory}
        handleClose={updateCategoryhandleClose}
        modelTitle={"update Category"}
      >
        <Row>
          <Col>
            <h6>Expanded categories</h6>
          </Col>
        </Row>
        {expandedArray.length > 0 &&
          expandedArray.map((item, indx) => {
            return (
              <>
                <Row key={indx}>
                  <Col>
                    <Input
                      value={item.name}
                      placeholder={"Category Name"}
                      onChange={(e) =>
                        handleCategoryEditedInput(
                          "name",
                          e.target.value,
                          indx,
                          "expanded"
                        )
                      }
                    />
                  </Col>
                  <Col>
                    <select
                      className="form-control"
                      onChange={(e) =>
                        handleCategoryEditedInput(
                          "parentId",
                          e.target.value,
                          indx,
                          "expanded"
                        )
                      }
                      value={item.parentId}
                    >
                      <option value={""}>select category</option>
                      {createCategoryList(category.categories).map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.name}
                        </option>
                      ))}
                    </select>
                  </Col>
                  <Col>
                    <select className="form-control"
                     value={item.type}
                     onChange={(e) =>
                        handleCategoryEditedInput(
                          "type",
                          e.target.value,
                          indx,
                          "expanded"
                        )
                      }
                    >
                      <option value={""}>Select Type</option>
                      <option value={"store"}>Store</option>
                      <option value={"product"}>Product</option>
                      <option value={"page"}>Page</option>
                    </select>
                  </Col>
                </Row>
                <input
                  type="file"
                  name="categoryImage"
                  onChange={handleCategoryImage}
                />
              </>
            );
          })}
        <Row>
          <Col>
            <h6>Checked categories</h6>
          </Col>
        </Row>
        {checkedArray.length > 0 &&
          checkedArray.map((item, indx) => {
            return (
              <>
                <Row key={indx}>
                  <Col>
                    <Input
                      value={item.name}
                      placeholder={"Category Name"}
                      onChange={(e) =>
                        handleCategoryEditedInput(
                          "name",
                          e.target.value,
                          indx,
                          "checked"
                        )
                      }
                    />
                  </Col>
                  <Col>
                    <select
                      className="form-control "
                      onChange={(e) =>
                        handleCategoryEditedInput(
                          "parentId",
                          e.target.value,
                          indx,
                          "checked"
                        )
                      }
                      value={item.parentId}
                    >
                      <option value={""}>select category</option>
                      {createCategoryList(category.categories).map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.name}
                        </option>
                      ))}
                    </select>
                  </Col>
                  <Col>
                    <select className="form-control"
                    value={item.type}
                    onChange={(e) =>
                        handleCategoryEditedInput(
                          "type",
                          e.target.value,
                          indx,
                          "checked"
                        )
                      }
                    
                    >
                      <option value={""}>Select Type</option>
                      <option value={"store"}>Store</option>
                      <option value={"product"}>Product</option>
                      <option value={"page"}>Page</option>
                    </select>
                  </Col>
                </Row>
                <input
                  type="file"
                  name="categoryImage"
                  onChange={handleCategoryImage}
                />
              </>
            );
          })}
      </NewModel>
    );
  };

  const deleteCategoryHandleClose = () => {
    setDeleteCategoryModel(false);
  };

  const deleteCategory = () => {
    setDeleteCategoryModel(true);
    updateCheckedAndExpandedCategories();
  };

  const deleteCategories = () => {
    setDeleteCategoryModel(false);
    const checkedIdArray = checkedArray.map((item, indx) => ({
      _id: item.value,
    }));
    const expandedIdArray = checkedArray.map((item, indx) => ({
      _id: item.value,
    }));

    const idsArray = expandedIdArray.concat(checkedIdArray);
    dispatch(deleteSelectedCategories(idsArray)).then((res) => {
      if (res) {
        // dispatch(getAllCategory());
        dispatch(getInitialData());
      }
    });
  };

  const renderDeleteCategoryModel = () => {
    console.log("checked", checkedArray, expandedArray);
    return (
      <NewModel
        display="inherit"
        show={deleteCategoryModel}
        setshow={setDeleteCategoryModel}
        handleClose={deleteCategoryHandleClose}
        modelTitle={"Delete Category"}
        buttons={[
          {
            label: "No",
            color: "primary",
            onClick: setDeleteCategoryModel,
          },
          {
            label: "Yes",
            color: "danger",
            onClick: deleteCategories,
          },
        ]}
      >
        <h5>Expanded</h5>
        {expandedArray.map((item, indx) => (
          <span key={indx}>{item.name}</span>
        ))}
        <h6>Checked</h6>
        {checkedArray.map((item, indx) => (
          <span key={indx}>{item.name}</span>
        ))}
      </NewModel>
    );
  };

  return (
    <Layout sidebar={true}>
      <Container>
        <Row>
          <Col md={12}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h1>Category</h1>
              <div className="buttons">

              <Button variant="secondary" onClick={handleShow}>
                Add
              </Button>
              <Button variant="danger" onClick={deleteCategory}>Delete</Button>
              <Button onClick={updateEditedCategory}>Edit</Button>
              </div>
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            {/* <ul>{renderCategories(category.categories)}</ul> */}
            <CheckboxTree
              nodes={renderCategories(category.categories)}
              checked={checked}
              expanded={expanded}
              onCheck={(checked) => setChecked(checked)}
              onExpand={(expanded) => setExpanded(expanded)}
              icons={{
                check: <IoIosCheckbox />,
                uncheck: <IoIosCheckboxOutline />,
                halfCheck: <IoMdCheckmarkCircleOutline />,
                expandOpen: <IoMdArrowDropdown />,
                expandClose: <IoMdArrowDropright />,
              }}
            />
          </Col>
        </Row>
      </Container>
      <NewModel
        display="inherit"
        show={show}
        setshow={setshow}
        handleClose={handleClose}
        modelTitle={"Add New Category"}
      >
        <Row>
          <Col>
            <Input
              value={name}
              placeholder={"Category Name"}
              onChange={(e) => setname(e.target.value)}
            />
          </Col>
          <Col>
            <select
              className="form-control"
              onChange={(e) => setparentOfCategory(e.target.value)}
              value={parentOfCategory}
            >
              <option value={""}>select category</option>
              {createCategoryList(category.categories).map((option) => (
                <option key={option.value} value={option.value}>
                  {option.name}
                </option>
              ))}
            </select>
          </Col>
        </Row>
        <Row>
          <input
            type="file"
            name="categoryImage"
            onChange={handleCategoryImage}
          />
        </Row>
      </NewModel>

      {/* Edit Categories */}
      {renderUpdateCategoryModel()}
      {/* <UpdateCategoryModel
        show={updateCategory}
        setshow={setupdateCategory}
        handleClose={updateCategoryhandleClose}
        expandedArray={expandedArray}
        checkedArray={checkedArray}
        handleCategoryEditedInput={handleCategoryEditedInput}
        categoryList={createCategoryList(category.categories)},
// category={category},
// handleCategoryImage={handleCategoryImage},
      /> */}
      {renderDeleteCategoryModel()}
    </Layout>
  );
}
