/**
 * @param authors - an array of strings 
 * */ 
const renderBookAuthors = (authors) => {
  const len = authors?.length;
  return authors?.map((author, i) => (
    <>{i === len - 1 ? author : <>{author + ", "}</>}</>
  ));
};

/**
 * @param categories - an array of strings 
 * */ 
const renderBookCategories = (categories) => {
  const unique_categories = [];
  for (let i = 0; i < categories?.length; i++) {
    let split = categories[i].split("/");
    for (let j = 0; j < split.length; j++) {
      if (!unique_categories.includes(split[j])) {
        unique_categories.push(split[j]);
      }
    }
  }
  return unique_categories;
};

export { renderBookAuthors, renderBookCategories };
