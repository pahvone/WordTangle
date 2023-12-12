const Hangman = ({back}) => {
    const backButton = () => {
        return (<button
            className="btn choice-button w-100 text-center"
            onClick={(e) => {

              if(window.confirm("Are you sure you want to go back to lessons?")) back(e);
            }}
          >
            Back to lessons
          </button>)
    }

    return (<>
        {backButton()}

        </>
    )
}

export default Hangman