const StatusCodes = require("http-status-codes");

const getEntries = async (req,res) =>{
    res.status(StatusCodes.OK).json({message : "getEntries visited"})
}

const createEntry = async (req,res) =>{
    res.status(StatusCodes.OK).json({message : "createEntry visited"})
}

const updateEntry = async (req,res) =>{
    res.status(StatusCodes.OK).json({message : "updateEntry visited"})
}

const deleteEntry = async (req,res) =>{
    res.status(StatusCodes.OK).json({message : "deleteEntry visited"})
}



module.exports = { getEntries, createEntry, updateEntry, deleteEntry }