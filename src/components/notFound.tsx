import * as React from 'react';
import Style from '../styles';
interface INotFoundProps {
	keyWord?: any;
}
export default class extends React.Component<INotFoundProps, any> {
    render() {
        return <div >
                <div style={Style.notFound}>No stories matching <b style={Style.keyWordSpan}>{this.props.keyWord}</b></div>

        </div>;
    }

}