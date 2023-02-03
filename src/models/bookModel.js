const mongoose = require('mongoose')

const ObjectId = mongoose.Schema.Types.ObjectId
/*Assignment:
 add bookCover(string) key in your bookModel in Book managemt project. When book is being created , take up the book cover as an image , 
 upload it to s3 and save the url in bookCover key. Submit a short explainer video on the same( individually)
*/
const bookModel = new mongoose.Schema({

    // bookCover:{type:String} ,

    title: { type: String, required: true, unique: true },
    excerpt: { type: String, required: true },
    userId: { type: ObjectId, ref: "user", required: true },
    ISBN: { type: String, required: true, unique: true },
    category: { type: String, required: true },
    subcategory: { type: String, required: String },
    reviews: { type: Number, default: 0 },
    isDeleted: { type: Boolean, default: false },
    releasedAt: { type: Date, required: true },

}, { timestamps: true })

module.exports = mongoose.model('book', bookModel)