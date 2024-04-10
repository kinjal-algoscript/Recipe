const express = require('express');
// Init Router
const router = express.Router();
const passport = require('passport');
const PassportErrorHandler = require('../../middleware/passportErrorResponse');
const controller = require('./dish.controller');
const validations = require('./dish.validations');

/**
 * @route POST api/dish/create
 * @description create
 * @returns JSON
 * @access public
 */
 router.post(
    '/create',
    [
      passport.authenticate('jwt', { session: false, failWithError: true }),
      PassportErrorHandler.success,
      PassportErrorHandler.error,
    ],
    validations.create,
    (req, res) => {
      controller.create(req, res);
    },
  );

  /**
   * @route POST api/dish/insertMany
   * @description create dish
   * @returns JSON
   * @access public
   */
  router.post(
    '/insertMany',
    [
      passport.authenticate('jwt', { session: false, failWithError: true }),
      PassportErrorHandler.success,
      PassportErrorHandler.error,
    ],
    (req, res) => {
      controller.insertMultipleDishes(req, res);
    },
  );

/**
 * @route GET api/dish
 * @description get user dishes based on category
 * @returns JSON
 * @access public
 */
 router.get(
  '',
  [
    passport.authenticate('jwt', { session: false, failWithError: true }),
    PassportErrorHandler.success,
    PassportErrorHandler.error,
  ],
  (req, res) => {
    controller.getList(req, res);
  },
);

/**
 * @route GET api/dish/my-dishes
 * @description get current user dishes
 * @returns JSON
 * @access public
 */
 router.get(
  '/my-dishes',
  [
    passport.authenticate('jwt', { session: false, failWithError: true }),
    PassportErrorHandler.success,
    PassportErrorHandler.error,
  ],
  (req, res) => {
    controller.getMyDishList(req, res);
  },
);

/**
 * @route GET api/dish/:id
 * @description get user dishes
 * @returns JSON
 * @access public
 */
 router.get(
  '/:id',
  [
    passport.authenticate('jwt', { session: false, failWithError: true }),
    PassportErrorHandler.success,
    PassportErrorHandler.error,
  ],
  (req, res) => {
    controller.getById(req, res);
  },
);

/**
 * @route PUT api/dish/:id
 * @description update
 * @returns JSON
 * @access public
 */
router.put(
  '/update/:id',
  [
    passport.authenticate('jwt', { session: false, failWithError: true }),
    PassportErrorHandler.success,
    PassportErrorHandler.error,
  ],
  validations.update,
  (req, res) => {
    controller.update(req, res);
  },
);

/**
 * @route DELETE api/dish/:id
 * @description delete
 * @returns JSON
 * @access public
 */
router.delete(
  '/:id',
  [
    passport.authenticate('jwt', { session: false, failWithError: true }),
    PassportErrorHandler.success,
    PassportErrorHandler.error,
  ],
  validations.delete,
  (req, res) => {
    controller.delete(req, res);
  },
);

module.exports = router;
