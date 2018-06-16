var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var newSchema = new Schema({

    heading: {
        type: String,
        trim: true,
       // required: "String required"
    },
    link: {
        type: String,
        trim: true
    },
    summary: {
        type: String,
        trim: true,
      //  required: "summary"

    },
    Notes: [
        { 
        type: Schema.Types.ObjectId,
        ref: "Notes"    

        }

    ]
});

var Article = mongoose.model("Article", newSchema);


module.exports = Article;