const Dish = require("../models/dish.model");
const {isEmpty} = require("../utils/validator");

class DishService {
  /**
   * @description create dish item
   */
    async create(userId, payload) {
      try {
        if (!payload) return;
  
        // Remove blank or undefined value from object
        Object.keys(payload).forEach((key) => {
          if (isEmpty(payload[key]) === true) delete payload[key];
        });
  
        const itemPayload = {
          ...payload,
          createdBy: userId,
        };
        const result = await Dish.create(itemPayload);
        if (result) return result.toJSON();
        return undefined;
      } catch (e) {
        throw e;
      }
    }

    async getByCategory(category) {
      try {
          let query = {};
          if (!!category) {
              query = {category}
          }
        const result = await Dish.find(query)
          .sort({ createdAt: -1 }).populate([{path: 'createdBy'}])
  
        if (result) {
          return result.map((item) => {
            return item.toJSON();
          });
        }
        return undefined;
      } catch (e) {
        throw e;
      }
    }

    async getCurrentUserDishList(userId) {
      try {
        const result = await Dish.find({ createdBy: userId })
          .sort({ createdAt: -1 })
          .populate([{ path: 'createdBy' }]);
  
        if (result) {
          return result.map((item) => {
            return item.toJSON();
          });
        }
        return undefined;
      } catch (e) {
        throw e;
      }
    }

    async getSingle(id) {
      try {
        if (!id) return;
  
        const result = await Dish.findOne({ _id: id }).populate([{ path: 'createdBy' }]);
        if (result) return result.toJSON();
        return undefined;
      } catch (e) {
        throw e;
      }
    }

    /**
     * @description update dish item
     */
      async update(userId, id, payload) {
        try {
            if (!id) throw new Error('Id is required');
            if (!payload) throw new Error('Data is required');
    
            delete payload.createdBy;
            delete payload.createdAt;

            const itemPayload = {
              ...payload,
              id,
              updatedBy: userId,
            };
    
            const updatePromise = new Promise(async (resolve, reject) => {
                const query = { _id: id };
                const result = await Dish.findOneAndUpdate(query, itemPayload, { new: false });
                  return resolve(result);
              });
              const result = await updatePromise;
              if (result) {
                const item = await this.getSingle(id);
                return item;
              }
              return undefined;
        } catch (e) {
          throw e;
        }
      }

      /**
       * @description delete
       */
      async delete(id) {
        try {
          const item = await this.getSingle(id);
          if (!item) throw Error('Dish does not exist');    
          const query = { _id: id };
          const result = await Dish.delete(query);
          if (result) {
            return true;
          }
          throw Error('Unable to delete item');
        } catch (e) {
          throw e;
        }
      }

      /**
       * @description insert multiple items
       */
      async insertMany(userId, recipes) {
        try {
          if (!recipes || recipes.length === 0) return false;

          const itemsPayload = [];
          for (let i = 0; i < recipes.length; i++) {
            const item = recipes[i];

            const itemPayload = {
              ...item,
              createdBy: userId
            };
            itemsPayload.push(itemPayload);
          }
          const result = await Dish.insertMany(itemsPayload);
          if (result) return result;
          return;
        } catch (e) {
          console.log('ERROR while adding recipes');
          throw e;
        }
      }
}

const dishService = new DishService();
module.exports = dishService;
