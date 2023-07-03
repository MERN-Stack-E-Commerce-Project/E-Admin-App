const linearCategoryList = (categories, options = []) => {
    for (let cate of categories) {
      options.push({
        value: cate._id,
        name: cate.name,
        parentId: cate.parentId,
        type:cate.type,
      });
      if (cate.children && cate.children.length > 0) {
        linearCategoryList(cate.children, options);
      }
    }
    return options;
  };


  export default linearCategoryList;