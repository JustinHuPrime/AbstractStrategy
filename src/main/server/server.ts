// Copyright 2022 Justin Hu
// This file is part of Abstract Strategy.
//
// Abstract Strategy is free software: you can redistribute it and/or modify it
// under the terms of the GNU Affero General Public License as published by the
// Free Software Foundation, either version 3 of the License, or (at your
// option) any later version.
//
// Abstract Strategy is distributed in the hope that it will be useful, but
// WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY
// or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public
// License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with Abstract Strategy. If not, see <https://www.gnu.org/licenses/>.
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import * as restify from "restify";
import WebSocket from "ws";
import * as debug from "../common/util/debug";
import * as crypto from "crypto";
import * as fs from "fs";
import * as process from "process";

class PlayerConnection {
  public socket: WebSocket;
  public server: GameServer;
  public id: number;

  public constructor(socket: WebSocket, server: GameServer, id: number) {
    this.socket = socket;
    this.server = server;
    this.id = id;

    debug.log(`player ${this.id} connected`);
  }
}

export default class GameServer {
  // private rules: game.Rules;
  // private state: game.State;
  // private orders: Map<number, game.Order[]>;

  private saveFile: string;
  private joinCode: string;
  private connections: PlayerConnection[];

  private httpServer: restify.Server;
  private wsServer: WebSocket.Server;

  private constructor(saveFile: string) {
    // this.rules = rules;
    // this.state = state;
    // this.orders = new Map();

    this.saveFile = saveFile;
    this.joinCode = [...new Array(20)]
      .map((_value, _index, _array) => {
        return crypto.randomInt(36).toString(36);
      })
      .join("");
    this.connections = [];

    let certificate: Buffer;
    let key: Buffer;
    try {
      certificate = fs.readFileSync("cert.pem");
    } catch (e) {
      console.error(
        "could not read file 'cert.pem' - ensure a TLS certificate/key pair exists",
      );
      process.exit(1);
    }
    try {
      key = fs.readFileSync("key.pem");
    } catch (e) {
      console.error(
        "could not read file 'key.pem' - ensure a TLS certificate/key pair exists",
      );
      process.exit(1);
    }

    this.httpServer = restify.createServer({
      certificate: certificate,
      key: key,
    });
    this.httpServer.pre((req, _res, next) => {
      if (
        req.url !== undefined &&
        req.url.startsWith("/scripts/") &&
        !req.url.includes("?") &&
        !req.url.endsWith(".js")
      )
        req.url += ".js";
      next();
    });
    this.httpServer.get(
      "/*",
      restify.plugins.serveStatic({
        directory: "public_html",
        default: "index.html",
      }),
    );

    this.wsServer = new WebSocket.Server({
      server: this.httpServer.server,
    });
    this.wsServer.on("connection", (socket, _request) => {
      debug.log("client connecting");
      socket.once("message", (data, _isBinary) => {
        // TODO
      });
    });

    this.httpServer.listen(() => {
      console.log(
        `server started at ${this.httpServer.url} - join code is ${this.joinCode}`,
      );
    });
    this.save();
  }

  public static newGame(rulesFile: string, saveFile: string): GameServer {
    return new GameServer(saveFile);
  }

  public static loadGame(rulesFile: string, saveFile: string): GameServer {
    return new GameServer(saveFile);
  }

  private save(): void {
    // TODO
  }
}
