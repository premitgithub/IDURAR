const mongoose = require('mongoose');
const createCRUDController = require('@/controllers/middlewaresControllers/createCRUDController');

const summary = require('./summary');
const { email } = require('@/locale/translation/en_us');

function modelController() {
  const Model = mongoose.model('Client');
  const methods = createCRUDController('Client');

  methods.create = async (req, res) => {
    try {
      const data = req.body;

      const newData = {
        name: data.name,
        role: data.role,
        email: data.email,
        userID: data.userID,
        password: data.password,
      };

      if (data.role === 'Student') {
        newData.course = data.course;
        newData.degree = data.degree;
        newData.academicYear = data.academicYear;
      } else if (data.role === 'Faculty') {
        newData.department = data.department;
        newData.joiningDate = data.joiningDate;
        newData.experience = data.experience;
        newData.documents = data.documents;
      }

      const created = await Model.create(newData);
      res.status(201).json(created);
    } catch (error) {
      console.error('CREATE ERROR:', error);
      res.status(500).json({ message: 'Failed to create user', error: error.message });
    }
  };

  methods.summary = (req, res) => summary(Model, req, res);
  return methods;
}

module.exports = modelController();
