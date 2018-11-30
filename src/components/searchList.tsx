import * as React from 'react';
import Style from '../styles';
import ListItem from './listItem';
interface ISearchListProps {
	highlightedItemList?: any;
}
export default class extends React.Component<ISearchListProps, any> {
    render() {
        const { highlightedItemList } = this.props;
        return <div >
            <ul style={Style.ul}>
                {highlightedItemList.map((item, index) => (
                    <li key={index}>
                        <ListItem
                            item={item}
                        />
                    </li>
                ))}
            </ul>
        </div>;
    }

}