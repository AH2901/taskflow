const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },

    description: {
        type: String
    },

    completed: {
        type: Boolean,
        default: false
    },

    creationDate: {
        type: Date,
        default: Date.now
    },
    priority: {
    type: String,
    enum: ["low", "medium", "high"],
    default: "medium"
},

dueDate: {
    type: Date,
    default: null
}
});

module.exports = mongoose.model("Task", taskSchema);