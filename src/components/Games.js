const Games = (props) => {

    return (
        <div className="boxcontainer">
        <div className="greycontainer">
          <div className="title">Hangman</div>
          <div className="dashline" />
          <div><img src={require("../img/hangman.jpg")}/></div>
          <div className="games-desc">Figure out the word before it's too late!</div>

          <div><button className="btn styled-button" onClick={() => props.onSetGame("hangman")}>Start game</button></div>

        </div>
      </div>
    )
};

export default Games;