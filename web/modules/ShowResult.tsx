import React from 'react';
import {
	Card,
	FormGroup,
	Switch,
	HTMLSelect,
	Label,
	Alignment,
	Button,
	EditableText
} from '@blueprintjs/core';
import Gyolets, { matrix2latexOption } from '../../src/main';
interface Options {
	latexOutput: boolean
	latexOutputStyle: matrix2latexOption
	resultOnly: boolean
}
interface ShowResultProps {
	matrix: number[][]
}
const ShowResult: React.FunctionComponent<ShowResultProps> = (props) => {
	const [options, setOptions] = React.useState<Options>({
		latexOutput: false,
		latexOutputStyle: "bmatrix",
		resultOnly: false
	});
	const [matrix, setMatrix] = React.useState<Gyolets>();
	const calcurateMatrix = (arr: number[][]): Gyolets => {
		const mat = new Gyolets(arr, {
			row: arr.length,
			column: arr[0].length
		});
		const reducedMat = mat.reduction({
			verbose: !options.resultOnly,
			latex: options.latexOutput ? options.latexOutputStyle : false
		});
		return reducedMat;
	}
	return (
		<React.Fragment>
			<FormGroup
				label={<h4>Settings</h4>}
				labelInfo="Configure settings as you like"
			>
				<Switch
					alignIndicator={Alignment.RIGHT}
					label="Result Only"
					checked={options.resultOnly}
					onChange={event => {
						let prevState = { ...options };
						prevState.resultOnly = event.currentTarget.checked;
						setOptions(prevState);
					}}
				/>
				<Switch
					alignIndicator={Alignment.RIGHT}
					label="LaTeX Output"
					checked={options.latexOutput}
					onChange={event => {
						let prevState = { ...options };
						prevState.latexOutput = event.currentTarget.checked;
						setOptions(prevState);
					}}
				/>
				<Label>
					LaTeX Matrix Style
					<HTMLSelect
						disabled={!options.latexOutput}
						onChange={event => {
							let state = { ...options };
							state.latexOutputStyle = event.currentTarget.value as matrix2latexOption
							setOptions(state);
						}}
						options={["matrix", "pmatrix", "bmatrix", "vmatrix", "Bmatrix", "Vmatrix"]}
					/>
				</Label>
			</FormGroup>
			<FormGroup
				label={<h4>Execute</h4>}
			>
				<Button
					icon="power"
					text="Calculate!"
					onClick={() => {
						setMatrix(calcurateMatrix(props.matrix));
					}}
					large={true}
					fill={true}
					intent="primary"
				/>
			</FormGroup>
			<EditableText
				multiline={true}
				minLines={1}
				maxLines={10}
				placeholder=""
				value={matrix?.toString()}
				disabled={true}
			/>
		</React.Fragment>
	)
}
export default ShowResult;