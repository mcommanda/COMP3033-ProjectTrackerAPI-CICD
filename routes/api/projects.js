// Router object for /api/projects endpoint
// Import express
const express = require("express");
// Create router object
const router = express.Router();
// Import Model
const Project = require("../../models/project");
// Configure handlers
// Add CRUD functionality by adding handlers for these HTTP methods
// C mapped to POST
router.post("/", async (req, res, next) => {
  if (!req.body.name) {
    res.status(400).json({ validationError: "Name is a required field." });
  } else if (!req.body.course) {
    res.status(400).json({ validationError: "Course is a required field." });
  } else {
    let project = new Project({
      name: req.body.name,
      dueDate: req.body.dueDate,
      course: req.body.course,
    });
    await project.save();
    res.status(201).json(project);
  }
});
// R mapped to GET
router.get("/", async (req, res, next) => {
  // res.status(200).json("success");
  // mongoose version 7 is async by default
  // so calls to these methods must be contained inside async functions
  // find() and sort() are built-in mongoose module methods
  let projects = await Project.find().sort([["dueDate", "descending"]]);
  res.status(200).json(projects);
});
// U mapped to PUT
router.put("/:_id", async (req, res, next) => {
  if (!req.body.name) {
    res.status(400).json({ validationError: "Name is a required field." });
  } else if (!req.body.course) {
    res.status(400).json({ validationError: "Course is a required field." });
  } else {
    // https://mongoosejs.com/docs/tutorials/findoneandupdate.html
    // https://mongoosejs.com/docs/api/model.html#Model.findByIdAndUpdate()
    let project = await Project.findByIdAndUpdate(
      req.params._id,
      {
        name: req.body.name,
        dueDate: req.body.dueDate,
        course: req.body.course,
      },
      { new: true } // need this parameter so that mongoose returns the updated version of project
    );
    res.status(200).json(project);
  }
});
// D mapped to DELETE
router.delete("/:_id", async (req, res, next) => {
  await Project.findByIdAndDelete(req.params._id);
  res.status(200).json({ 'success': 'true' });
});
// Export
module.exports = router;






/*//Router object for /api/projects endpoint
//Import express into its own object by using the require method
const express = require("express");


//Create Router Object - call express.router to generate a router object - put in router variable
const router = express.Router();
//Import Model that we created - project
const Project = require("../../models/project");



//Configure handlers
// CRUD functionality by adding handlers for these HTTP methods

// C mapped to post

//R mapped to GET
//GET api/projects/ > returns a list of projects in DB
router.get("/", async (req, res, next)=>{
    //res.status(200).json("success");
    //mongoose version 7 is async by default so we need to add async above in router.get
    //so calls to these methods must be contained inside async functions
    //find() and sort() are built in mongoose module methods
    //find without any filter will retreive everything in the collection
    let projects = await Project.find().sort([["dueDate", "descending"]]);
    res.status(200).json(projects);
})

//POST HANDLER
//api/projects/ > add the provided object in the request body to the DB
router.post('/', (req,res,next)=> {
  //TEST
  //console.log(req.body);
  //res.status(200).json(req.body)

  //VALIDATE required fields
  //if name is missing - error status 400
  if (!req.body.name) { 
    res.status(400).json({'ValidationError': 'Name is a required field'});
  }
  //if course is missing - error status 400
  else if (!req.body.course) {
    res.status(400).json({'ValidationError': 'Course is a required field'});
  }
  //if both name and course are included continue with valid project
  else {
    //valid project
    //use Project that was model imported - and create takes to parameters the new object that will be 
    //saved in the database and a callback function that takes an error message and the new project that was created.
    Project.create({
        name: req.body.name,
        dueDate: req.body.dueDate,
        course: req.body.course
    }, (err, newProject)=>{
        //if there is an err print it in the console and send error 500 to the user
        if (err) {
            console.log(err);
            res.status(500).json({'ErrorMessage':'Server threw an exception'});
        }
        //else everything went well - send the new project as a json object
        else {
            res.status(200).json(newProject);
        }
    });
  }
});

// PUT /projects/:_id
//this section update using the ID that is passed in the URL 
router.put('/:_id', (req, res, next) => {
    // Validate required fields
    if (!req.body.name) {
        res.json({ 'ValidationError': 'Name is a required field' }).status(400);
    }
    else if (!req.body.course) {
        res.json({ 'ValidationError': 'Course is a required field' }).status(400);
    }
    //find the project and update it with new updated info below
    else {
        Project.findOneAndUpdate(
            { _id: req.params._id }, // filter query to find project to update
            {
                name: req.body.name,
                dueDate: req.body.dueDate,
                course: req.body.course,
                status: req.body.status
            }, // update document with updated info
            (err, updatedProject) => {  //callback function
                //if error send error and console log error
                if (err) {
                    console.log(err);
                    res.status(500).json({ 'ErrorMessage': 'Server threw an exception' });
                }
                //everything went ok so send back new updated project in json
                else {
                    res.status(200).json(updatedProject);
                }
            } // update callback 
        );
    }
});


// DELETE /projects/:_id
//uses ID passed in URL
router.delete('/:_id', (req, res, next) => {
    Project.remove({ _id: req.params._id }, (err) => {
        if (err) {
            console.log(err);
            res.status(500).json({ 'ErrorMessage': 'Server threw an exception' });
        }
        else {
            res.status(200).json({ 'success': 'true' });
        }
    });
});


//Export
module.exports = router;*/