const Address = require("./schemas/address");
const Restaurant = require("./schemas/restaurant");

// Um restaurante possui um endereço
Restaurant.hasOne(Address, { foreignKey: "restaurantId", as: "address" });
// Um endereço pertence a um restaurante
Address.belongsTo(Restaurant, { foreignKey: "restaurantId", as: "restaurant" });

module.exports = {Restaurant, Address}