import React from "react";

import "./home.styles.scss";
import Axios from "axios";

class HomePage extends React.Component {
  constructor() {
    super();
    this.state = {
      questions: [],
      index: 0,
      disable: true,
      score: 0,
      message: ""
    };
  }
  componentDidMount() {
    Axios.get("http://localhost:5000/app-question/us-central1/getQuestionResult").then(res => {
      console.log(res);
      this.setState({ questions: res.data })
    })
  }
  CheckResult = async (response, _doc) => {
    this.setState({ disable: false });
    const res = await Axios.post(
      'http://localhost:5000/app-question/us-central1/getCorrectResponse',
      { response, _doc },
      { headers: { 'Content-Type': 'application/json' } }
    );
    if (res.data.success) {
      this.setState({ message: "Bon Choix", score: this.state.score + 1 })
    } else {
      this.setState({ message: "Zut !" })
    }
    if (this.state.questions.length - 1 == this.state.index) {
      alert('Vous avez termine ;)')
    } else {
      this.setState({
        index: this.state.index + 1,
      })
      this.setState({ disable: true });
    }
    setTimeout(() => { this.setState({ message: "" }) }, 2000);

  }
  render() {
    let userDetails = (
      <div>
        <div className="question">
          {this.state.questions[this.state.index] && <p>{this.state.questions[this.state.index].question}</p>}
        </div>
        <br />
        <div className="row">
          <div className="col-6 text-center">
            {this.state.questions[this.state.index] && <button disabled={!this.state.disable} onClick={() => this.CheckResult(this.state.questions[this.state.index].response1, this.state.questions[this.state.index].id)} type="button" className="btn btn-light">{this.state.questions[this.state.index].response1}</button>}
          </div>
          <div className="col-6 text-center">
            {this.state.questions[this.state.index] && <button disabled={!this.state.disable} onClick={() => this.CheckResult(this.state.questions[this.state.index].response2, this.state.questions[this.state.index].id)} type="button" className="btn btn-light">{this.state.questions[this.state.index].response2}</button>}
          </div>
        </div>

      </div>
    );


    return (

      <div className="homepage">
        <img src="https://ffplum.fr/images/BSV/58/quizz.png" />
        <br />
        {userDetails}
        <br />
        {this.state.message}
        <br />
        Score : {this.state.score}
      </div>
    );
  }
}

export default HomePage;