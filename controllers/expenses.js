const expenseSchema = require("../models/addExpenses");
const budgetSchema = require("../models/totalBudget");

const addExpenses = async (req, res) => {
     const userId = req.params.userId;
  try {
    const addExpense = await new expenseSchema({...req.body, userId : userId});
    const data = await addExpense.save();
    const budgetdata = await budgetSchema.findById(req.body.budgetId);
    budgetdata.budgetAmount -= req.body.Amount;
    const newbudget = await budgetdata.save();
    res.status(200).json({
      success: "success",
      message: "The expnses is added successfully",
      data: data,
      budget: newbudget,
    });
  } catch (err) {
    res.status(400).json({
      success: "failure",
      error: err.message,
    });
  }
};

const getList = async (req, res) => {
  try {
    const list = await expenseSchema.find();
    res.status(200).json({
      success: "success",
      message: "All list",
      data: list,
    });
  } catch (err) {
    res.status(400).json({
      success: "Failure",
      error: err.message,
    });
  }
};

const deleteExpense = async (req, res) => {
  const id = req.params.id;
  try {
    const deleteData = await expenseSchema.findByIdAndDelete(id);
    res.status(200).json({
      success: "success",
      message: "expense delete successfully",
    });
  } catch (err) {
    res.status(400).json({
      success: failure,
      error: err.message,
    });
  }
};

const editExpense = async (req, res) => {
  const id = req.params.id;
  try {
    const originalExpense = await expenseSchema.findById(id);
    const edit = await expenseSchema.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    const originalAmount = parseFloat(originalExpense.Amount);
    const updatedAmount = parseFloat(req.body.Amount);
    const amountDifference = updatedAmount - originalAmount;
    const budgetData = await budgetSchema.findById(edit.budgetId);
    budgetData.budgetAmount -= amountDifference;
    const newBudget = await budgetData.save();
    res.status(200).json({
      success: "success",
      message: "expense edit successfully",
      data: edit,
      budget : newBudget
    });
  } catch (err) {
    res.status(400).json({
      success: "failure",
      error: err.message,
    });
  }
};

module.exports = {
  addExpenses,
  getList,
  deleteExpense,
  editExpense,
};
