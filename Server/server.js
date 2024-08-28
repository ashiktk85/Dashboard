const express = require("express");
const cors = require("cors");

const { connectDB } = require("./src/config/database");
const DataModel = require("./src/model/revenueModel");

const PORT = 6001;

//  

const app = express();

connectDB();

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
  // optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/getData", async(req, res) => {
  try {
    console.log("getotm"); 

    const data = await DataModel.find();
    console.log("data" , data);
    
 
    res.status(200).json(data);
  } catch (error) {
    console.log("Error in getting data from db");
    
  }
});

app.listen(PORT, () => {
  console.log(`server running on ${PORT}`);
});
