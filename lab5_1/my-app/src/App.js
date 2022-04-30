import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

function App() {
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

export default App;
