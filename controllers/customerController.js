'use strict'

var varcustomerController = require('./customerControllerService');

module.exports.listCustomers = function listCustomers(req, res, next) {
  varcustomerController.listCustomers(req.swagger.params, res, next);
};

module.exports.createCustomer = function createCustomer(req, res, next) {
  varcustomerController.createCustomer(req.swagger.params, res, next);
};

module.exports.showCustomerById = function showCustomerById(req, res, next) {
  varcustomerController.showCustomerById(req.swagger.params, res, next);
};

module.exports.updateCustomer = function updateCustomer(req, res, next) {
  varcustomerController.updateCustomer(req.swagger.params, res, next);
};

module.exports.deleteCustomer = function deleteCustomer(req, res, next) {
  varcustomerController.deleteCustomer(req.swagger.params, res, next);
};