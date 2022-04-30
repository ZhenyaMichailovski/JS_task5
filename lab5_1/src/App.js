'use strict';
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: 0,
            screenSize: '',
            screenResolution: '',
            screenType : '',
            flashMemory : ''
        };
        this.create = this.create.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    create(e) {
        // add entity - POST
        e.preventDefault();
        // creates entity
        fetch('http://localhost:3005/api/ebooks', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                _screenSize: this.state.screenSize,
                _screenResolution: this.state.screenResolution,
                _screenType : this.state.screenType,
                _flashMemory : this.state.flashMemory
            })
        })
            .then(response => response.json())
            .then(response => {
                console.log(response)
            })
            .catch(err => {
                console.log(err);
            });
    }
    update(e) {
        // update entity - PUT
        e.preventDefault();
        // this will update entries with PUT
        fetch(`http://localhost:3005/api/ebook/${id}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                _id: this.state.id,
                _screenSize: this.state.screenSize,
                _screenResolution: this.state.screenResolution,
                _screenType : this.state.screenType,
                _flashMemory : this.state.flashMemory
            })
        })
            .then(response => response.json())
            .then(response => { console.log(response);
            })
            .catch(err => { console.log(err); });
    }
    delete(e) {
        // delete entity - DELETE
        e.preventDefault();
        // deletes entities
        fetch(`http://localhost:3005/api/ebooks/${id}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(response => {
                console.log(response);
            })
            .catch(err => {
                console.log(err);
            });
    }
    handleChange(changeObject) {
        this.setState(changeObject)
    }
    render() {
        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <form className="d-flex flex-column">
                            <legend className="text-center">Add-Update-Delete</legend>
                            <label htmlFor="_screenSize">
                                Screen size:
                                <input
                                    name="_screenSize"
                                    id="_screenSize"
                                    type="text"
                                    className="form-control"
                                    value={this.state.screenSize}
                                    onChange={(e) => this.handleChange({ name: e.target.value })}
                                    required
                                />
                            </label>
                            <label htmlFor="_screenResolution">
                                Screen resolution:
                                <input
                                    name="_screenResolution"
                                    id="_screenResolution"
                                    type="text"
                                    className="form-control"
                                    value={this.state.screenResolution}
                                    onChange={(e) => this.handleChange({ name: e.target.value })}
                                    required
                                />
                            </label>
                            <label htmlFor="_screenType">
                                Screen type:
                                <input
                                    name="_screenType"
                                    id="_screenType"
                                    type="text"
                                    className="form-control"
                                    value={this.state.screenType}
                                    onChange={(e) => this.handleChange({ name: e.target.value })}
                                    required
                                />
                            </label>
                            <label htmlFor="_flashMemory">
                                Flash memory:
                                <input
                                    name="_flashMemory"
                                    id="_flashMemory"
                                    type="text"
                                    className="form-control"
                                    value={this.state.flashMemory}
                                    onChange={(e) => this.handleChange({ name: e.target.value })}
                                    required
                                />
                            </label>
                            <button className="btn btn-primary" type='button' onClick={(e) => this.create(e)}>
                                Add
                            </button>
                            <button className="btn btn-info" type='button' onClick={(e) => this.update(e)}>
                                Update
                            </button>
                            <button className="btn btn-danger" type='button' onClick={(e) => this.delete(e)}>
                                Delete
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}
let domContainer = document.querySelector('#App');
ReactDOM.render(<App />, domContainer);