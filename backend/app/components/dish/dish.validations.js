const { createValidationResponse } = require("../../utils/helpers");
const { isEmpty, isValidId } = require("../../utils/validator");

class DishValidator {
    /**
     * @description Validate create
     */
    create(req, res, next) {
      const errors = {};
      const { name } = req.body;
  
      if (isEmpty(name)) {
        errors.name = 'Name is required';
      }
  
      if (Object.keys(errors).length > 0) {
        createValidationResponse(res, errors);
      } else {
        next();
      }
    }
    
    /**
     * @description Validate update
     */
    update(req, res, next) {
      const errors = {};
      const { id } = req.params;
      const { name } = req.body;
  
      if (isEmpty(id) || !isValidId(id)) {
        errors.id = 'Id is required';
      }
  
      if (isEmpty(name)) {
        errors.name = 'Name is required';
      }
  
      if (Object.keys(errors).length > 0) {
        createValidationResponse(res, errors);
      } else {
        next();
      }
    }

    /**
     * @description Validate delete
     */
    delete(req, res, next) {
      const errors = {};
      const { id } = req.params;
  
      if (isEmpty(id) || !isValidId(id)) {
        errors.id = 'Id is required';
      }
  
      if (Object.keys(errors).length > 0) {
        createValidationResponse(res, errors);
      } else {
        next();
      }
    }
}

const validationObj = new DishValidator();
module.exports = validationObj;
