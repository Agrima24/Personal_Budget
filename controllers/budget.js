const budgetSchema = require('../models/totalBudget');
const userSchema = require('../models/addUser')


const AddTotalBudget = async(req,res) => {
     const userId = req.params.userId
    try{
        const addBudget = await new budgetSchema({...req.body , userId : userId});
        const data = await addBudget.save();
        res.status(201).json({
            success : "success",
            message : "add budget successfully",
            data : data
        })
    }catch(err){
        res.status(400).json({
            success : "failure",
            error : err.message
        })
    }
}

const getBudget = async(req,res) => {
    try{
      const list = await budgetSchema.find();
      res.status(200).json({
        success : 'success',
        message : "All list",
        data : list
    })
    }catch(err){
       res.status(400).json({
        success : "Failure",
        error : err.message
       })
    }
}

const deleteBudget = async(req,res) => {
    const id = req.params.id;
   try{
        const deleteData = await budgetSchema.findByIdAndDelete(id);
        res.status(200).json({
            success : 'success',
            message : "budget delete successfully"
        })

    }catch(err){

        res.status(400).json({
            success : failure,
            error : err.message
        })

    }
}

const editBudget = async (req,res) => {
    const id = req.params.id
    try{
         const edit = await budgetSchema.findByIdAndUpdate(id , req.body, {
            new : true,
            runValidators : true,
         });
         res.status(200).json({
            success : "success",
            message : "budget edit successfully",
            data : edit
         })
    }catch(err){
        res.status(400).json({
            success : "failure",
            error : err.message
        })
    }
}




module.exports = {
    AddTotalBudget,
    getBudget,
    deleteBudget,
    editBudget
}