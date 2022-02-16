import {useKeyPress, useSetState} from 'ahooks';
import Chance from 'chance';

const items = Array.from({length: 30}, () => ({
	id: new Chance().guid()
}));
const page = () =>
{
	const [state, setState] = useSetState({
		selectedIndex: 0,
		pressedIndex: null
	});

	useKeyPress(
		({key}) => ['ArrowUp', 'ArrowDown', 'Enter'].includes(key),
		({key}) =>
		{
			setState({pressedIndex: null});

			if (key === 'ArrowDown' && state.selectedIndex >= 0 && state.selectedIndex <= items.length - 2)
			{
				setState({selectedIndex: state.selectedIndex + 1});
			}

			if (key === 'ArrowUp' && state.selectedIndex >= 1 && state.selectedIndex <= items.length - 1)
			{
				setState({selectedIndex: state.selectedIndex - 1});
			}

			if (key === 'Enter')
			{
				setState({pressedIndex: state.selectedIndex});
			}
		});

	const isSelected = ndx => state.selectedIndex === ndx && 'nav-item-selected';
	const isPressed = ndx => state.pressedIndex === ndx && 'nav-item-pressed';

	return <div>
		<h3>ahooks/useKeyPress hook demonstration</h3>

		<div className={'demo-box'}>
			<ul className={'nav-panels'}>
				{items.map((el, key) => <li key={key}
											className={`nav-item ${isSelected(key)} ${isPressed(key)}`}>{el.id}</li>)}
			</ul>
		</div>
		<div className={'footer'}>
			Designed by <a href={'http://skitsanos.com'}>Skitsanos</a> | Source
			code: <a href={'https://github.com/skitsanos/ahooks-keypress'}>https://github.com/skitsanos/ahooks-keypress</a>
		</div>
	</div>;
};

export default page;