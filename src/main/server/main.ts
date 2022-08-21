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

import * as process from "process";
import GameServer from "./server";

function printUsage() {
  console.error("Usage:");
  console.error("npm start -- new <ruleset> <filename>");
  console.error("npm start -- load <ruleset> <filename>");
}

if (process.argv.length <= 2) {
  printUsage();
  process.exit(1);
}

switch (process.argv[2]) {
  case "new": {
    if (process.argv.length !== 5) {
      printUsage();
      process.exit(1);
    }

    GameServer.newGame(process.argv[3] as string, process.argv[4] as string);
    break;
  }
  case "load": {
    if (process.argv.length !== 5) {
      printUsage();
      process.exit(1);
    }

    GameServer.newGame(process.argv[3] as string, process.argv[4] as string);
    break;
  }
  default: {
    printUsage();
    process.exit(1);
  }
}
