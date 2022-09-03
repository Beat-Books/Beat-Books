import React from "react";
//import { useNavigate } from 'react-router-dom';

class SearchComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bookName: "",
            author: "",
        }
        // const navigate = useNavigate();

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange({ target }) {
        console.log("author, book -->", this.state.author, this.state.bookName);
        this.setState({ [target.name]: target.value })
        console.log("checking state", this.state);
    };

    handleSubmit() {
        console.log('hi');
    };

    // once the user hits the submit button, we want to navigate them to the loading page
    // navigateToLoading() {
    //     navigate('/LoadingComponent', { replace: true });
    // }

    render() {
        return (
            <React.Fragment>
                <form>
                    <div>
                        <b><label> Book Name: </label></b>
                        <input type="text" name="bookName" value={this.state.bookName} onChange={this.handleChange} />
                    </div>
                    <div>
                        <b><label> Author: </label></b>
                        <input type="text" name="author" value={this.state.author} onChange={this.handleChange} />
                    </div>
                    <button type="button"
                    // onClick={this.navigateToLoading}
                    >
                        Submit
                    </button>
                </form>
            </React.Fragment>
        )
    }
}

export default SearchComponent;