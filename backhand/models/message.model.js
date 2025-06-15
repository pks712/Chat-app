import mongoose, { mongo } from "mongoose";

const messageSchema = mongoose.Schema({
    senderId :{ type : mongoose.Schema.Types.ObjectId,
        ref :'User',
        required :true,
    },
    receiverId :
    { type : mongoose.Schema.Types.ObjectId,
        ref :'User',
        required :true,
    },
      message :{
        type:String,required:true,
        trim:true,
        validate:[
            {validator :(value) =>value.length >0 ,
                message :'message can not be empty'
            },
        ],
      },
      createdAt:{type:Date, default:Date.now},
},{
   timestamps :true  
})
const Message = mongoose.model("Message" , messageSchema);

export default  Message;