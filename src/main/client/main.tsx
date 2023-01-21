// Copyright 2023 Justin Hu
//
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

interface Props {}

interface State {}

class SceneContainer extends React.Component<Props, State> {
  constructor(props: {}) {
    super(props);
  }

  public override render(): JSX.Element {
    return <h1>Hello, world!</h1>;
  }
}

ReactDOM.render(
  <React.StrictMode>
    <SceneContainer />
  </React.StrictMode>,
  document.getElementById("root"),
);