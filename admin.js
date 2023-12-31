var express = require('express');
var router = express.Router();
const session = require("express-session");
const connection = require("../connection");

router.post("/deliver-order-now", (req, res) => {
    // console.log(req.body);
    var name = req.body.name;
    var oid = req.body.oid;

    var shipOrder = `UPDATE orders SET person_received="${name}", order_status="Delivered", payment_status="Complete" WHERE id=${oid}`;
    connection.query(shipOrder, (error) => {
        if (error) {
            res.send("error");
        } else {
            res.send("success");
        }
    });
});

router.post("/ship-order-now", (req, res) => {
    // console.log(req.body);
    var company = req.body.company;
    var trackID = req.body.trackID;
    var url = req.body.url;
    var oid = req.body.oid;

    var shipOrder = `UPDATE orders SET tracking_id="${trackID}", company_name="${company}", tracking_url="${url}", order_status="Shipped" WHERE id=${oid}`;
    connection.query(shipOrder, (error) => {
        if (error) {
            res.send("error");
        } else {
            res.send("success");
        }
    });
});

router.get("/fetch-delivered-order", (req, res) => {
    var pendingOrders = `SELECT *, DATE_FORMAT(date_time, "%W %M %e %Y %r") as date_time  FROM orders WHERE order_status = "Delivered"`;
    connection.query(pendingOrders, (error, data) => {
        if (error) {
            res.send("error");
        } else {
            res.send(data);
        }
    });
});

router.get("/fetch-shipped-order", (req, res) => {
    var pendingOrders = `SELECT *, DATE_FORMAT(date_time, "%W %M %e %Y %r") as date_time  FROM orders WHERE order_status = "Shipped"`;
    connection.query(pendingOrders, (error, data) => {
        if (error) {
            res.send("error");
        } else {
            res.send(data);
        }
    });
});

router.get("/fetch-pending-order", (req, res) => {
    var pendingOrders = `SELECT *, DATE_FORMAT(date_time, "%W %M %e %Y %r") as date_time  FROM orders WHERE order_status = "Pending"`;
    connection.query(pendingOrders, (error, data) => {
        if (error) {
            res.send("error");
        } else {
            res.send(data);
        }
    });
});

router.get("/delivered-orders", (req, res) => {
    // if (session.adminName == undefined) {
    //     res.redirect("/admin-login");
    // } else {
    res.render("admin/delivered_order", {title: "Delivered Orders", text: "Delivered Orders"});
    // }
});

router.get("/shipped-orders", (req, res) => {
    // if (session.adminName == undefined) {
    //     res.redirect("/admin-login");
    // } else {
    res.render("admin/shipped_orders", {title: "Shipped Orders", text: "Shipped Orders"});
    // }
});

router.get("/pending-orders", (req, res) => {
    // if (session.adminName == undefined) {
    //     res.redirect("/admin-login");
    // } else {
    res.render("admin/manage_orders", {title: "Pending Orders", text: "Pending Orders"});
    // }
});

module.exports = router;