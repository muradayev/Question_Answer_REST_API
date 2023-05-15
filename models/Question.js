const mongoose = require("mongoose")
const slugify = require("slugify")
const Schema = mongoose.Schema

const QuestionSchema = new Schema({
    title: {
        type: String,
        required: [true, "Please provide a title"],
        minLength: [10, "Please provide a title at least 20 characters"],
        unique: true
    },
    content: {
        type: String,
        required: [true, "Please provide a content"],
        minLength: [20, "Please provide a title at least 50 characters"],
    },
    slug: String,
    createdAt: {
        type: Date,
        default: Date.now()
    },
    user: {
        type: mongoose.Schema.ObjectId,
        required: true,
        ref: "User"
    },
    likes: [
        {
            type: mongoose.Schema.ObjectId,
            ref: "User"
        }
    ],
    answers: [
        {
            type: mongoose.Schema.ObjectId,
            ref: "Answer"
        }
    ]
})

QuestionSchema.pre("save", function (next) {
    if (!this.isModified("title")) {
        next()
    }
    this.slug = this.makeSlug()
    next()
})

// Question methods
QuestionSchema.methods.makeSlug = function () {
    return slugify(this.title, {
        replacement: "-",
        remove: /[*+~.()'"!:@]/g,
        lower: true
    })
}

module.exports = mongoose.model("Question", QuestionSchema)