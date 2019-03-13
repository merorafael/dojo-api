import express from "express";
import controller from "../controllers/planets.controller"

const router = express.Router();

router.get('/', function(req, res) {
    controller.listAction(req, res);
});
router.get('/:id', function(req, res) {
    controller.detailAction(req, res);
});
router.post('/', function(req, res) {
    controller.addAction(req, res);
});
router.delete('/:id', function(req, res) {
    controller.deleteAction(req, res);
});

export default router;
