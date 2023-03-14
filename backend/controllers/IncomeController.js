const incomeSchema = require("../models/incomeModel")

exports.addIncome = async (req, resp)=>{
    const {title, amount, date, category, description }=req.body

    const income = incomeSchema({
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

        await income.save()
        resp.status(200).json({message:"Income Added"})

    } catch (error) {
        resp.status(500).json({message:"Server Error"})
    }

    console.log(income)
}

exports.getIncomes = async (req, resp) =>{
    try {
        const incomes = await incomeSchema.find().sort({createdAt:-1})
        resp.status(200).json(incomes)
    } catch (error) {
        resp.status(500).json({message:"Server Error"})
        
    }
}

exports.deleteIncome = async (req, resp) =>{
    const {id} = req.params;
    console.log(req.params);
    incomeSchema.findByIdAndDelete(id).then((income)=>{
        resp.status(200).json({message:"Income Deleted"})
    }).catch((err)=>{
        resp.status(500).json({message:"Server Error"})
    })
}
