const expenseSchema = require("../models/expenseModel")

exports.addExpense = async (req, resp)=>{
    const {title, amount, date, category, description }=req.body

    const expense = expenseSchema({
        title, 
        amount, 
        date, 
        category, 
        description
    })

    try {
        //validations
        if(!title || !category  || !description || !date){
            return resp.status(400).json({message:"All fields are required"})
        }
        if(amount<= 0 || !amount === 'number'){
            return resp.status(400).json({message:"Amount is required"})
        }

        await expense.save()
        resp.status(200).json({message:"Expense Added"})

    } catch (error) {
        resp.status(500).json({message:"Server Error"})
    }

    console.log(expense)
}

exports.getExpense = async (req, resp) =>{
    try {
        const incomes = await expenseSchema.find().sort({createdAt:-1})
        resp.status(200).json(incomes)
    } catch (error) {
        resp.status(500).json({message:"Server Error"})
        
    }
}

exports.deleteExpense = async (req, resp) =>{
    const {id} = req.params;
    console.log(req.params);
    expenseSchema.findByIdAndDelete(id).then((income)=>{
        resp.status(200).json({message:"Expense Deleted"})
    }).catch((err)=>{
        resp.status(500).json({message:"Server Error"})
    })
}
