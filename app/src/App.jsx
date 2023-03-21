import React, { Component } from "react";
import { QrReader } from "react-qr-reader";

class App extends Component {
  render() {
    return <div>
      <button>CAmbiar camara</button>

      <div className="margin">
        <QrReader
          onResult={(result, error) => {
            if (!!result) {
              console.log(result.text);
            }
          }}
          constraints={{ facingMode: "environment" }}
        />
      </div>
    </div>
  }
}

export default App;
