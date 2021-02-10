//import logo from './logo.svg';
import './App.css';
import React from "react";
import ipfsHttpClient from "ipfs-http-client";

const ipfs = ipfsHttpClient("http://localhost:5002");
console.log("ipfs:", ipfs);

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      imgHash: ""
    };
  }

  componentDidMount = () => {
    this.setState({ loading: false });
  }

  handleSubmit = (ev) => {
    ev.stopPropagation();
    ev.preventDefault();
    this.setState({ loading: true });

    const file = document.querySelector("#fileinput").files[0];
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(file);
    reader.onloadend = async () => {
      const fileBuffer = await Buffer.from(reader.result);
      const hash = await ipfs.add(fileBuffer, (err, ipfsHash) => {
        if (err) console.error(err);
        return ipfsHash;
      });
      console.log("hash:", hash);
      this.setState({
        loading: false,
        imgHash: hash.path
      });
      return fileBuffer;
    };
  };

  render = () => {
    return (
      <div className="App">
        <h2>Playing with IPFS</h2>
        <form onSubmit={this.handleSubmit}>
          Browse for file:
          <input id="fileinput" type="file" />
          <button type="submit">Upload</button>
        </form>
        <p></p>
        {(this.state.loading || !this.state.imgHash) ? "Nothing yet" : <>
          <img
            src={`https://ipfs.io/ipfs/${this.state.imgHash}`}
            height="200px"
          />
        </>}
      </div>
    );
  }
}

export default App;
