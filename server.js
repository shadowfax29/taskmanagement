const express = require('express')
const { Schema, model, connect } = require('mongoose')
const { checkSchema, validationResult } = require('express-validator')
const app = express()
const port = 3066

app.use(express.json())

connect('mongodb://127.0.0.1:27017/task-management-app')
    .then(() => {
        console.log('task app connected to db')
    })
    .catch((err) => {
        console.log('error to connect', err)
    })

const taskSchema = new Schema({
    title: String,
    description: String,
    status: String,
}, { timestamps: true })

const Task = model('Task', taskSchema)

const taskValidationSchema = {
    title: {
        in: ['body'],
        notEmpty: {
            errorMessage: 'Title cannot be empty'
        },
        exists: {
            errorMessage: 'Title is required'
        },
        isLength: {
            options: { min: 5 },
            errorMessage: 'title should be at least 5 character'
        },
        custom: {
            options: function (value) {
                return Task.findOne({ title: value })
                    .then((task) => {
                        if (task) {
                            throw new Error('title already exists');
                        } else {
                            return true;
                        }
                    })
                    .catch((err) => {
                        throw new Error(`Internal Server Error: ${err.message}`);
                    });
            }
        }

    },

    description: {
        in: ['body'],
        notEmpty: {
            errorMessage: 'Description cannot be empty'
        },
        exists: {
            errorMessage: 'Description is required'
        },
        isLength: {
            options: { min: 5 },
            errorMessage: 'Description should be at least 5 character'
        }
    },

    status: {
        in: ['body'],
        notEmpty: {
            errorMessage: 'Status cannot be empty'
        },
        exists: {
            errorMessage: 'Status is required'
        },
        isIn: {
            options: [['pending', 'in progress', 'completed']],
            errorMessage: 'status should be one of (pending, in progress, completed)'
        }
    }
}

const idValidationSchema = {
    id: {
        in: ['params'],
        isMongoId: {
            errorMessage: 'Id Should be a valid Mongo Id'
        }
    }
}

const updateValidationSchema = {
    title: {
        in: ['body'],
        notEmpty: {
            errorMessage: 'Title cannot be empty'
        },
        exists: {
            errorMessage: 'Title is required'
        },
        isLength: {
            options: { min: 5 },
            errorMessage: 'title should be at least 5 character'
        }
    },

    description: {
        in: ['body'],
        notEmpty: {
            errorMessage: 'Description cannot be empty'
        },
        exists: {
            errorMessage: 'Description is required'
        },
        isLength: {
            options: { min: 5 },
            errorMessage: 'Description should be at least 5 character'
        }
    },

    status: {
        in: ['body'],
        notEmpty: {
            errorMessage: 'Status cannot be empty'
        },
        exists: {
            errorMessage: 'Status is required'
        },
        isIn: {
            options: [['pending', 'in progress', 'completed']],
            errorMessage: 'status should be one of (pending, in progress, completed)'
        }
    }
}

app.post('/tasks', checkSchema(taskValidationSchema), (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const body = req.body
    Task.create(body)
        .then((task) => {
            res.status(201).json(task)
        })
        .catch((err) => {
            res.status(500).json({ error: 'Internal Server Error' })
        })
})

app.get('/tasks', (req, res) => {
    Task.find()
        .then((task) => {
            res.status(201).json(task)
        })
        .catch((err) => {
            res.status(500).json({ error: 'Internal Server Error' })
        })
})

app.get('/tasks/:id', checkSchema(idValidationSchema), (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const id = req.params.id
    Task.findById(id)
        .then((task) => {
            if (!task) {
                res.status(404).json({})
            } else {
                res.status(201).json(task)
            }
        })
        .catch((err) => {
            res.status(500).json({ error: 'Internal Server Error' })
        })
})

app.put('/tasks/:id', checkSchema(updateValidationSchema), (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
       return res.status(400).json({ errors: errors.array() })
    }

    const id = req.params.id
    const body = req.body
    Task.findByIdAndUpdate(id, body, { new: true })
        .then((task) => {
            if (!task) {
                 res.status(404).json({})
            } else {
                 res.status(201).json(task)
            }
        })
        .catch((err) => {
            res.status(500).json({ errors: 'Internal Server Error' })
        })
})

app.delete('/tasks/:id', checkSchema(idValidationSchema), (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    const id = req.params.id
    Task.findByIdAndDelete(id)
    .then((task)=>{
        if(!task){
            res.status(404).json({})
        }else{
            res.status(204).json(task)
        }
    })
    .catch((err)=>{
        res.status(500).json({errors: 'Internal Server Error'})
    })
})



app.listen(port, () => {
    console.log(`server is running on ${port}`)
})