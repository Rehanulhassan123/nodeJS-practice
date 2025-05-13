let data = [
  {
    id: "1",
    name: "mobile",
  },
  { id: "2", name: "laptop" },
  { id: "3", name: "tv" },
];
let newdata;

const express = require("express");

const app = express();
newdata = data;
app.get("/", (req, res) => {
  res.send("hello world");
});

app.get("/api/v1/query", (req, res) => {
  const { search, limit } = req.query;
  newdata = [...data];
  if (search) {
    newdata = newdata.filter((data) => data.name.startsWith(search));
  }
  if (limit) {
    newdata = newdata.slice(0, Number(limit));
  }
  console.log(req.query);
  console.log(limit, search);
  console.log(newdata);
  //    res.send("hello world")
  return res.status(200).json(newdata);
});

app.get("/user/userId/:id", (req, res) => {
  const { id } = req.params;
  console.log(id);
  console.log(req.params);
  newdata = data.filter((data) => {
    return data.id === id;
  });

  console.log(newdata);

  return res.status(200).json(newdata);
});

app.listen(5000, () => {
  console.log("app is listening at port 5000");
});
