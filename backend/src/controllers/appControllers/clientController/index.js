const mongoose = require('mongoose');
const createCRUDController = require('@/controllers/middlewaresControllers/createCRUDController');

const summary = require('./summary');
const { email, phoneNo } = require('@/locale/translation/en_us');

function modelController() {
  const Model = mongoose.model('Client');
  const methods = createCRUDController('Client');

  methods.create = async (req, res) => {
    /* ------------------------------------------------------------------------------------------------- */
    try {
      const data = req.body;// extracts data sent in POST request and stores in a variable

      const newData = {//creates a whole new user object picking fields from data
        name: data.name,
        role: data.role,
        email: data.email,
        userID: data.userID,
        phoneNo: data.phoneNo,
        password: data.password,
      };

      if (data.role === 'Student') { // adds role specific fields into mongodb not extra fields which are not required
        newData.course = data.course;
        newData.degree = data.degree;
        newData.academicYear = data.academicYear;
      } else if (data.role === 'Faculty') {
        newData.department = data.department;
        newData.joiningDate = data.joiningDate;
        newData.experience = data.experience;
        newData.documents = data.documents || [];//helps to store multiple files or URLs
      }

      const created = await Model.create(newData);//saves the new user data into the databse by creating a new user
      res.status(201).json({success:true, result:created});// response for succcessful creation of user
    } catch (error) {
      console.error('CREATE ERROR:', error);
      if(error.code === 11000){// error code for duplicay in mongoDB is 11000
        const duplicateField = Object.keys(error.keyPattern)[0];//throws an error returning the field as an object where the duplicacy occurs
        return res.status(400).json({
          success: false,
          message: `Duplicate ${duplicateField} is not alllowed`,
        });
    
      }
      res.status(500).json({success: false, message: 'Failed to create user', error: error.message });//generic internal server error
    }
  };
  /* ------------------------------------------------------------------------------------------------- */
  

  methods.summary = (req, res) => summary(Model, req, res);
  return methods;
}

module.exports = modelController();
