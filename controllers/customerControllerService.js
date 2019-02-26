'use strict'

module.exports.listCustomers = function listCustomers(req, res, next) {
  res.send({
    message: 'This is the mockup controller for listCustomers'
  });
};

module.exports.createCustomer = function createCustomer(req, res, next) {
  res.send({
    message: 'This is the mockup controller for createCustomer'
  });
};

module.exports.showCustomerById = function showCustomerById(req, res, next) {
  res.send({
    message: 'This is the mockup controller for showCustomerById'
  });
};

module.exports.updateCustomer = function updateCustomer(req, res, next) {
  res.send({
    message: 'This is the mockup controller for updateCustomer'
  });
};

module.exports.deleteCustomer = function deleteCustomer(req, res, next) {
  res.send({
    message: 'This is the mockup controller for deleteCustomer'
  });
};