const CustomerService = require('../services/customer-service');
const UserAuth = require('./middlewares/auth');
const {PublishMessage} = require('../utils');

module.exports = (app,channel) => {
  const service = new CustomerService();

  app.post("/signup", async (req, res, next) => {
    try {
      const { email, password, phone } = req.body;
      const data = await service.SignUp({ email, password, phone });
      return res.json(data);
    } catch (error) {
      next(error);
    }
  });

  app.post("/login", async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const data = await service.SignIn({ email, password });
      return res.json(data);
    } catch (error) {
      next(error);
    }
  });

  app.post("/address", UserAuth, async (req, res, next) => {
    try {
      const { _id } = req.user;
      const { street, postalCode, city, country } = req.body;
      const data = await service.AddNewAddress(_id, {
        street,
        postalCode,
        city,
        country,
      });
      return res.json(data);
    } catch (error) {
      next(error);
    }
  });

  app.get("/profile", UserAuth, async (req, res, next) => {
    try {
      const { _id } = req.user;
      const data = await service.GetProfile({ _id });
      return res.json(data);
    } catch (error) {
      next(error);
    }
  });

  app.delete("/profile", UserAuth, async (req, res, next) => {
    try {
      const { _id } = req.user;
      const { data, payload } = await service.DeleteProfile(_id);
      // Send message to Shopping Service for removing cart & wishlist
      PublishMessage(channel, SHOPPING_SERVICE, JSON.stringify(payload));
      return res.json(data);
    } catch (error) {
      next(error);
    }
  });

 /*  app.get("/shoping-details", UserAuth, async (req, res, next) => {
    try {
      const { _id } = req.user;
      const { data } = await service.GetShopingDetails(_id);

      return res.json(data);
    } catch (err) {
      next(err);
    }
  });

  app.get("/wishlist", UserAuth, async (req, res, next) => {
    try {
      const { _id } = req.user;
      const { data } = await service.GetWishList(_id);
      return res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  }); */
};
