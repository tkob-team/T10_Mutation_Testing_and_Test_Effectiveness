// Load server.js without opening a port: capture the Express app passed to listen().
const express = require('express');

function loadApp() {
  let captured;
  const spy = jest.spyOn(express.application, 'listen').mockImplementation(function () {
    captured = this;
    return { close() {} };
  });
  jest.spyOn(console, 'log').mockImplementation(() => {});
  require('../server');
  spy.mockRestore();
  return captured;
}

module.exports = { loadApp };
