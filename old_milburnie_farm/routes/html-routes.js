// *********************************************************************************
// html-routes.js - this file offers a set of routes for sending users to the various html pages
// *********************************************************************************

// Dependencies
// =============================================================
var path = require("path");

// Routes
// =============================================================
module.exports = function(app) {
  // Each of the below routes just handles the HTML page that the user gets sent to.
  // ------- Login Page------
  // login page
  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/login.html"));
  });

  // --------- Management Pages ----------
  // management main page
  app.get("/mgmt_main", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/mgmt_main.html"));
  });

  // management users page
  app.get("/mgmt_users", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/mgmt_users.html"));
  });

  // management tasks page
  app.get("/mgmt_tasks", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/mgmt_tasks.html"));
  });

  // management sales inventory page
  app.get("/mgmt_sales_inventory", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/mgmt_sales_inventory.html"));
  });

  // management orders page
  app.get("/mgmt_orders", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/mgmt_orders.html"));
  });

  // management employee time page
  app.get("/mgmt_employee_time", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/mgmt_employee_time.html"));
  });

  // management harvests page
  app.get("/mgmt_harvests", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/mgmt_harvests.html"));
  });

  // ----------- Employee Pages -------------
  // employee main page
  app.get("/employee_main", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/employee_main.html"));
  });

  // employee clock
  app.get("/employee_clock", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/employee_clock.html"));
  });

  // employee task
  app.get("/employee_task", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/employee_task.html"));
  });

  // employee harvest
  app.get("/employee_harvest", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/employee_harvest.html"));
  });

  // -----------------Customer Pages----------------

  // customer main page
  app.get("/customer_main", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/customer_main.html"));
  });

  // customer create order page
  app.get("/customer_create_order", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/customer_create_order.html"));
  });

  // customer my orders page
  app.get("/customer_my_orders", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/customer_my_orders.html"));
  });
};
