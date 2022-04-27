const express = require("express");
const router = express.Router();
const data = require("../data");
const albums = require("../data/albums");
const { update } = require("../data/bands");
const bands = data.bands;
const mongo_queries = data.mongo_queries;
const { ObjectId } = require("mongodb");