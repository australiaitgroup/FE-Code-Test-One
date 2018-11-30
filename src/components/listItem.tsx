import * as React from 'react';
import Style from '../styles';
import * as moment from 'moment';
interface IListItemProps {
	item?: any;
}
export default class extends React.Component<IListItemProps, any> {
    render() {

        const { item } = this.props;
        return <div>
            <div id='title'> <a href={item.rawUrl} style={Style.title}>{item.title}</a> </div>
            <div style={Style.subTitleLayout}>
                {item.points && <div id='points' style={Style.subTitle}> <a >{item.points}</a> points </div>}
                {item.author && <div id='author' style={Style.subTitle}> | author: <a>{item.author}</a></div>}
                {item.created_at && <div id='created_at' style={Style.subTitle}> | <a >{moment(item.created_at).fromNow()}</a> </div>}
                {item.url && <div id='url' style={Style.subTitle}> |(<a href={item.rawUrl} style={Style.subTitle} className='alink'>{item.url}</a>) </div>}
            </div>
            <div style={Style.storyText}> {item.story_text} </div>
            <hr />
        </div>;
    }
}