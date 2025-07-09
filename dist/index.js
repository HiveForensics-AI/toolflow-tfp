"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const server_1 = require("./server");
(0, server_1.start)(Number(process.env.PORT) || 3000);
