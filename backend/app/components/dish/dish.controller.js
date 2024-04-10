const service = require('../../services/dishService');
const { createResponse, createError } = require('../../utils/helpers');

class DishController {
    /**
     * @description create dish
     */
    async create(req, res) {
      try {
        const { user } = req;
        const item = await service.create(user.id, req.body);
        if (item) return createResponse(res, true, 'Dish created successfully', item);
        else return createError(res, { message: 'Unable to create dish' });
      } catch (e) {
        return createError(res, e);
      }
    }

    /**
     * @description create add bulk items
     */
    async insertMultipleDishes(req, res) {
      try {
        const { user } = req;
        const { recipes } = req.body;
        const items = await service.insertMany(user.id, recipes);
        if (items) return createResponse(res, true, 'Recipes created successfully', items);
        else return createError(res, { message: 'Unable to create recipes' });
      } catch (e) {
        return createError(res, e);
      }
    }


  /**
   * @description get list
   */
  async getList(req, res) {
    try {
      const { category } = req.query;
      const items = await service.getByCategory(category);
      return createResponse(res, true, 'List', items);
    } catch (e) {
      return createError(res, e);
    }
  }

  /**
   * @description get my dish list
   */
  async getMyDishList(req, res) {
    try {
      const { user } = req;
      const items = await service.getCurrentUserDishList(user.id);
      return createResponse(res, true, 'List', items);
    } catch (e) {
      return createError(res, e);
    }
  }

  /**
   * @description get by id
   */
  async getById(req, res) {
    try {
      const { id } = req.params;
      const item = await service.getSingle(id);
      return createResponse(res, true, 'item', item);
    } catch (e) {
      return createError(res, e);
    }
  }

  /**
   * @description update item
   */
  async update(req, res) {
    try {
      const { user } = req;
      const { id } = req.params;
      const payload = {
        ...req.body,
      };
      const item = await service.update(user.id, id, payload);
      if (item) return createResponse(res, true, 'Dish updated successfully', item);
      else return createError(res, { message: 'Unable to update dish' });
    } catch (e) {
      return createError(res, e);
    }
  }

  /**
   * @description get item
   */
  async delete(req, res) {
    try {
      const { user } = req;
      const { id } = req.params;
      const item = await service.delete(id);
      return createResponse(res, true, 'Dish deleted', item);
    } catch (e) {
      return createError(res, e);
    }
  }
}

const controller = new DishController();
module.exports = controller;
