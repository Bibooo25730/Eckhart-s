const express = require('express');
const path = require('path');
const fileUtils = require("../utils/file_utils");
const router = express.Router();

router.get("/seller",async (req, res) => {
    let filePath = '../data/' + 'seller' + '.json';
    filePath = path.join(__dirname, filePath)
    const ret = await fileUtils.getFileJsonData(filePath)
    res.send(ret)
})
router.get("/trend",async (req, res) => {
    let filePath = '../data/' + 'trend' + '.json';
    filePath = path.join(__dirname, filePath)
    const ret = await fileUtils.getFileJsonData(filePath)
    res.send(ret)
})
router.get("/map",async (req, res) => {
    let filePath = '../data/' + 'map' + '.json';
    filePath = path.join(__dirname, filePath)
    const ret = await fileUtils.getFileJsonData(filePath)
    res.send(ret)
})
router.get("/rank",async (req, res) => {
    let filePath = '../data/' + 'rank' + '.json';
    filePath = path.join(__dirname, filePath)
    const ret = await fileUtils.getFileJsonData(filePath)
    res.send(ret)
})
router.get("/hotproduct",async (req, res) => {
    let filePath = '../data/' + 'hotproduct' + '.json';
    filePath = path.join(__dirname, filePath)
    const ret = await fileUtils.getFileJsonData(filePath)
    res.send(ret)
})
router.get("/stock",async (req, res) => {
    let filePath = '../data/' + 'stock' + '.json';
    filePath = path.join(__dirname, filePath)
    const ret = await fileUtils.getFileJsonData(filePath)
    res.send(ret)
})
module.exports = router