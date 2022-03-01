# Abstract Strategy

A highly customizable simultaneous-turn-based strategy game based on graphs.

## The Game

Abstract Strategy is, as the name suggests, a strategy game. It's turn based, in order to emphasize planning over actions per second. It uses simultaneous turn resolution, like Diplomacy. This game's design goal is to be capable of being configured to play like Diplomacy, with its minimalist rules, while at the same time capable of being configured to play like Stellaris, with its complex interacting systems, and everything in between. It is freely admitted that Abstract Strategy is thus a jack of all trades, and a master of none, while proudly asserting that it's still better than a master of one.

## Configuration Parameters

The following options can be configured:

### Players

- how many human players are there
- starting units for each human player
- how many AI players are there
- starting units for each AI player
- programmed attitude for each AI player

### The Map

- number of vertices
- number of edges per vertex
- layout of edges (are vertices clustered, if so, how many per cluster, are there bypasses, if so, how long and how common)

### Resources

- number of resources
- global prevalence of resources
- distribution of resources (are some geographically limited, and if so, how many deposits)

### Units

- cost of unit
- build time
- strength of unit
- speed of unit (number of edges traversable per turn; if its zero, the unit is a static fortification)
- vision range of unit
- local unit cap usage
- local per-unit cap usage
- global unit cap usage
- global per-unit cap usage

### Buildings

- cost of building
- build time
- prerequisite resource deposit(s) (must be present in the vertex where the building is being built)
- prerequisite undepleted resource deposit(s) (must be present in the vertex where the building is being built)
- prerequisite depleted resource deposit(s) (must be present in the vertex where the building is being built)
- consumed resource(s)
- produced resource(s)
- local building cap usage
- local per-building cap usage
- global building cap usage
- global per-building cap usage
- global unit cap contribution
- global per-unit cap contribution
- global building cap contribution
- global per-building cap contribution
- local unit cap contribution
- local per-unit cap contribution
- local building cap contribution
- local per-building cap contribution

### Game Rules

- do you need to set up supply routes and stockpiles, or do resources exist everywhere at once (per resource)
- how fast are supply routes (in resource units per edge turn)
- how many units of resources can you store in a node
- how infinite are resources; what fraction of a resource deposit's productivity remains after it's depleted (per resource)
- local starting unit cap
- local starting per-unit caps
- local starting building cap
- local starting per-building caps
- global starting unit cap
- global starting per-unit caps
- global starting building cap
- global starting per-building cap
- combat rule (lanchester law (with exponent parameter), strongest wins without losses)

#### Action Resolution Order

- when is the unit move and combat phase relative to everything else
- when is the ownership change phase relative to everything else
- when is the resource production phase relative to everything else
- when is the resource move phase relative to everything else
- when is the building, demolition, and disband phase relative to everything else

## Configurable Parameters

Despite the depth of customization possible, we stick to the following limitations:

- units must fight when they encounter other units, and units always fight to annihilation
- units can encounter other units within an edge
- units only move through edges - they don't stay in edges
- no units are slower than one edge/turn
- all edges are undirected
- vertices don't have any terrain effects
- you can't share a vertex with anyone; the player that last had a unit in a vertex owns that vertex
- units don't carry resources themselves
- units don't require upkeep
- combat is always local to the node
- action resolution phases cannot be added

### Justification

As an implementation limitation, units must fight when they encounter each other. There is only one survivor of any battle, and units can't be captured.

To prevent units from dodging past each other, units must fight if they collide in an edge.

There's no particular reason why units can't stay in an edge, but consider that a graph layout where units can stay in edges is equivalent to that same layout, but with one new empty vertex in between each original vertex with an edge. To simplify the game, units can't stay in an edge.

As an implementation limitation, units can't spend time moving through edges.

All edges are undirected since directed edges cause issues for player pathfinding, and often lead to unbalanced maps (not merely asymmetric, but unbalanced).

Vertices are all the same since it's just hard to generate a playable map when taking into account of any possible difference between vertices and their interaction with units. This is an implementation limitation.

You can't share a vertex since there's no good way to implement that alongside buildings, and buildings were judged to be more important.

Resources carrying units don't exist as an implementation limitation.

Upkeep requirements are judged as being too tedious to configure and play with to be worth it if global unit caps exist.

Combat is local to the node as an implementation limitation.

As another implementation limitation, action resolution phases are limited to those enumerated.

## Future Systems

In future, the following mechanisms might be added:

- research and technology trees
- units requiring factory buildings
- buildings requiring factory buildings
- salvage from destroyed buildings and units
- refunds for cancelling construction
- refunds from disbanding and demolishing
- collateral damage to buildings
- gradual destruction when caps exceeded/prerequisites not met
