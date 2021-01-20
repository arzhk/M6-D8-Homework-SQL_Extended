const db = require("./db.js");

findAll = async (tableName) => {
  try {
    const queryString = `SELECT * FROM ${tableName};`;
    const response = await db.query(queryString);
    return response;
  } catch (err) {
    console.log(err);
  }
};

findById = async (tableName, id) => {
  try {
    const queryString = `SELECT * FROM ${tableName} WHERE id=${id};`;
    const response = await db.query(queryString);
    return response;
  } catch (err) {
    console.log(err);
  }
};

createNewArticle = async (tableName, body) => {
  try {
    const columns = Object.keys(body);
    const values = Object.values(body);
    const queryString = `INSERT INTO ${tableName} (${columns.join(",")}, created_at, updated_at) VALUES (${values
      .map((v) => `'${v}'`)
      .join(",")}, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);`;
    const response = await db.query(queryString);
    return response;
  } catch (err) {
    console.log(err);
  }
};

findByIdAndUpdate = async (tableName, id, body) => {
  try {
    const entries = Object.entries(body);
    const queryString = `UPDATE ${tableName} SET ${entries
      .map(([column, value]) => `${column}='${value}'`)
      .join(",")}, updated_at=CURRENT_TIMESTAMP WHERE id=${parseInt(id)};`;
    const response = await db.query(queryString);
    return response;
  } catch (err) {
    console.log(err);
  }
};

findByIdAndDelete = async (tableName, id) => {
  try {
    const queryString = `DELETE FROM ${tableName} WHERE id=${id}`;
    const response = await db.query(queryString);
    return response;
  } catch (err) {
    console.log(err);
  }
};

findArticleWithAuthorAndCategory = async (id) => {
  try {
    const queryString = `SELECT a.id, a.headline, a.content, a.cover, authors.name as author_name, c.name as category_name, a.created_at, a.updated_at
    FROM articles as a
    INNER JOIN authors ON a.author_id = authors.id
    INNER JOIN categories as c ON a.category_id = c.id
    WHERE a.id = ${id}`;

    const response = await db.query(queryString);
    return response;
  } catch (err) {
    console.log(err);
  }
};

findByTitleSearch = async (tableName, searchterm) => {
  try {
    const queryString = `SELECT * FROM ${tableName} WHERE headline LIKE '%${searchterm}%'`;
    const response = await db.query(queryString);
    return response;
  } catch (err) {
    console.log(err);
  }
};

findByContentSearch = async (tableName, searchterm) => {
  try {
    const queryString = `SELECT * FROM ${tableName} WHERE content LIKE '%${searchterm}%'`;
    const response = await db.query(queryString);
    return response;
  } catch (err) {
    console.log(err);
  }
};

getArticleCountByCategory = async () => {
  try {
    const queryString = `SELECT c.id, c.name, COUNT(a.id) AS total_articles FROM categories AS c INNER JOIN articles AS a ON a.category_id=c.id GROUP BY (c.id) ORDER BY c.id ASC`;
    const response = await db.query(queryString);
    return response;
  } catch (err) {
    console.log(err);
  }
};

getAllResponseData = async () => {
  try {
    const queryString = `SELECT a.id, a.headline, a.content, COUNT(CASE WHEN r.is_clap THEN 1 END) AS total_claps, COUNT(r.id) as total_responses FROM responses AS r INNER JOIN articles AS a ON r.article_id = a.id GROUP BY(a.id) ORDER BY a.id ASC`;
    const response = await db.query(queryString);
    return response;
  } catch (err) {
    console.log(err);
  }
};

getResponseDataById = async (id) => {
  try {
    const queryString = `SELECT a.id, a.headline, a.content, COUNT(CASE WHEN r.is_clap THEN 1 END) AS total_claps, COUNT(r.id) as total_responses FROM responses AS r INNER JOIN articles AS a ON r.article_id = a.id WHERE a.id=${id} GROUP BY(a.id)
`;
    const response = await db.query(queryString);
    return response;
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  findAll,
  findById,
  createNewArticle,
  findByIdAndUpdate,
  findByIdAndDelete,
  findArticleWithAuthorAndCategory,
  findByTitleSearch,
  findByContentSearch,
  getArticleCountByCategory,
  getAllResponseData,
  getResponseDataById,
};
