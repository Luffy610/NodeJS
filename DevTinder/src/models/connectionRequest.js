const mangoose = require("mongoose");

const connectionRequestSchema = new mangoose.Schema({
  sender: {
    type: String,
    required: true,
    ref: "User"
  },
  receiver: {
    type: String,
    required: true,
    ref: "User"
  },
  status: {
    type: String,
    required: true,
    enum:{
        values: ['pending', 'accepted', 'rejected', 'ignored', 'intrested'],
        message: `{VALUE} is not supported`
    }

  },
},
{
    timestamps: true
});

connectionRequestSchema.pre("save", function(next){
    const connectionRequest = this;
    if(connectionRequest.sender == connectionRequest.receiver){
        throw new Error("Sender and receiver can not be same");
    }
    next();
});

connectionRequestSchema.index({sender: 1, receiver: 1}, {unique: true});

module.exports = mangoose.model("ConnectionRequest", connectionRequestSchema);