import React, { Component } from 'react';
import Cell from './Cell';
import { rndBoolean } from './helpers';
import './Board.css';

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - hasWon: boolean, true when board is all off
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

class Board extends Component {
	static defaultProps = { nrows: 5, ncols: 5, key: 'board' };

	constructor(props) {
		super(props);
		this.state = { hasWon: false, board: this.createBoard(), clicks: 0 };
		// TODO: set initial state
		this.flipCellsAround = this.flipCellsAround.bind(this);
	}

	/** create a board nrows high/ncols wide, each cell randomly lit or unlit */

	createBoard() {
		let board = [];
		// TODO: create array-of-arrays of true/false values
		for (let i = 0; i < this.props.nrows; i++) {
			let newRow = Array.from({ length: this.props.ncols });
			for (let j = 0; j < newRow.length; j++) {
				newRow[j] = rndBoolean();
			}
			board.push(newRow);
		}
		return board;
	}

	/** handle changing a cell: update board & determine if winner */

	flipCellsAround(coord) {
		let { ncols, nrows } = this.props;
		let board = this.state.board;
		let [y, x] = coord.split('-').map(Number);

		function flipCell(y, x) {
			// if this coord is actually on board, flip it

			if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
				board[y][x] = !board[y][x];
			}
		}

		flipCell(y, x);
		flipCell(y - 1, x);
		flipCell(y + 1, x);
		flipCell(y, x + 1);
		flipCell(y, x - 1);

		// TODO: flip this cell and the cells around it
		let hasWon = false;
		let containsTrue = 0;

		for (const arr of board) {
			if (arr.includes(true) === true) {
				containsTrue += 1;
			}
		}

		if (containsTrue > 0) {
			hasWon = false;
		} else {
			hasWon = true;
		}
		// console.log(hasWon)
		// win when every cell is turned off
		// TODO: determine is the game has been won

		this.setState(curState => ({ board, hasWon, clicks: curState.clicks + 1 }));
	}

	renderTable(e) {
		if (this.state.hasWon === false) {
			return (
				<table className='Board-cellWrap'>
					<tbody>
						{this.state.board.map((row, indx) => (
							<tr key={`row-${indx}`}>
								{row.map((cell, i) => (
									<Cell
										isLit={cell === true ? true : false}
										flipCellsAroundMe={this.flipCellsAround}
										key={`${indx}-${i}`}
										coord={`${indx}-${i}`}
									/>
								))}
							</tr>
						))}
					</tbody>
				</table>
			);
		} else {
			return <h2>You Won!</h2>;
		}
	}

	/** Render game board or winning message. */

	render() {
		// if the game is won, just show a winning msg & render nothing else

		// TODO

		// make table board

		// TODO

		return (
			<div className='Board'>
				<h1 className='Board-title'>
					<span className='blink_me'>Lights</span>-Out
				</h1>
				{this.renderTable()}
				<p className='Board-data'>Click Counter: {this.state.clicks}</p>
			</div>
		);
	}
}

export default Board;
