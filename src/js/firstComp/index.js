import React ,{Component} from "react";
import ReactDOM, { render } from 'react-dom';

class Layout extends Component {
    constructor(){
        super()
        this.state={
            name: 'Aaron'
        }
    }
    render () {
        return (
            <div className="home">
            <h3>This is my home page</h3>
        </div>
    )
}
}

const app = document.getElementById('app')
ReactDOM.render(<Layout />, app)