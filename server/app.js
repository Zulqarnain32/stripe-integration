const express = require('express')
const app = express();
const port = 5000;
require('dotenv').config();
const cors = require('cors')

app.use(express.json())

app.use(cors({
    origin: ["http://localhost:5173"],
    methods: ['POST', 'GET'],
    credentials: true
}))


const stripe = require("stripe")(process.env.SECRET_STRIPE_KEY);

app.post('/checkout', async(req,res) => {
    try{
       const session = await stripe.checkout.sessions.create({
        payment_method_types:['card'],
        mode:"payment",
        line_items:req.body.items.map(item => {
            return {
                price_data:{
                    currency:"inr",
                    product_data:{
                        name:item.name
                    },
                    unit_amount:(item.price)*100,
                },
                quantity:item.quantity,
            }
        }),
        success_url:"http://localhost:5173/success",
        cancel_url:"http://localhost:5173/cancel"
       })
       console.log(session.url);
       res.json({url:session.url})
    } catch(err){
        console.log(err);
        res.json(err)
    }
})





app.listen(port, () => {
    console.log("server is listening at port no 5000");
})