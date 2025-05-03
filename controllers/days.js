const StatusCodes = require("http-status-codes");

const getDay = async (req, res) => {
  res.status(StatusCodes.OK).json({ message: "getSingleDayRoute visited" });
};

const createDay = async (req, res) => {
  res.status(StatusCodes.OK).json({ message: "createDay visited" });
};

const updateDay = async (req, res) => {
  res.status(StatusCodes.OK).json({ message: "updateDay visited" });
};



module.exports = { getDay, createDay, updateDay };
