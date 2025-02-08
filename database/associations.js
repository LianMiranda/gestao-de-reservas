const Address = require("./schemas/address");
const Reservation = require("./schemas/reservation");
const Restaurant = require("./schemas/restaurant");
const Schedule = require("./schemas/schedule");
const Table = require("./schemas/table");
const User = require("./schemas/user");

User.hasMany(Restaurant, {foreignKey: "userId", as: "restaurant"});

Restaurant.belongsTo(User, {foreignKey: "userId", as: "user"});
// Um restaurante possui um endereço
Restaurant.hasOne(Address, { foreignKey: "restaurantId", as: "address" });
// Um endereço pertence a um restaurante
Address.belongsTo(Restaurant, { foreignKey: "restaurantId", as: "restaurant" });

Restaurant.hasMany(Table, {foreignKey: "restaurantId", as: "table"});
// Uma mesa pertence a um restaurante
Table.belongsTo(Restaurant, { foreignKey: "restaurantId", as: "restaurant" });

Restaurant.hasMany(Schedule, {foreignKey: "restaurantId", as: "schedule"})
// Um horário pertence a um restaurante
Schedule.belongsTo(Restaurant, { foreignKey: "restaurantId", as: "restaurant" });

Table.hasMany(Reservation, {foreignKey: "tableId", as: "reservation"});
// Uma reserva pertence a uma mesa
Reservation.belongsTo(Table, { foreignKey: "tableId", as: "table" });







module.exports = {Restaurant, Address, Table, Reservation, Schedule, User}