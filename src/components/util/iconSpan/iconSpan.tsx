import React, {Component} from 'react';

type Props = {
    "trueIcon": string,
    "falseIcon": string,
    "numbers" : number,
    "max": number
}

export default class IconSpan extends Component<Props, {}> {
    render() {

        let icon = "";

        for (let i = 0; i < this.props.max; i++) {
            if(i < this.props.numbers) {
                icon += this.props.trueIcon;
            } else {
                icon += this.props.falseIcon;
            }
        }

        return <span>{icon}</span>
    }
}
