import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { removePrize } from "../firebase-functions";
import win from "../images/winningPage.png";

const Question = ({ setQuestionAnswered, setIsCorrect, prize }) => {
	function handleSubmit(e) {
		e.preventDefault();
		console.log(e.target.elements.question.value);
		if (e.target.elements.question.value != null) {
			if (e.target.elements.question.value == "4") {
				setIsCorrect(true);
				removePrize(prize);
			} else {
				setIsCorrect(false);
			}
			setQuestionAnswered(true);
		}
	}

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<label htmlFor='question'>What is 2 + 2?</label>
				<span>
					<input id='question' type='text' />

					<button type='submit' className='blueButton'>
						Submit
					</button>
				</span>
			</form>
		</div>
	);
};

const Win = ({ prize }) => {
	const [questionAnswered, setQuestionAnswered] = useState(false);
	const [isCorrect, setIsCorrect] = useState(false);
	return (
		<main className='cardStyle yellowCard flexCol gap1'>
			{(questionAnswered && isCorrect) || !questionAnswered ? (
				<>
					<img src={win} alt='winner' className='' />
					<p>
						Great news! You've <strong>WON</strong> {prize.value} BuyMore Dollars in
						the BuyMore Dollars Virtual Scratch Off Contest.
					</p>
				</>
			) : null}

			{!questionAnswered ? (
				<>
					<p>
						Before you celebrate, we have a fun and straightforward skill testing
						question for you. Answer this simple math question correctly, and your
						BuyMore Dollars will be on their way!
					</p>
					<Question
						setQuestionAnswered={setQuestionAnswered}
						setIsCorrect={setIsCorrect}
						prize={prize}
					/>
				</>
			) : null}

			{questionAnswered && isCorrect ? (
				<>
					<h2 className='textLeft'>Prize Award Information:</h2>
					<p className='textLeft'>
						Congratulations! Your BuyMore Dollars prize will be added to the account
						associated with your name. Please allow between 6 to 8 weeks from the time
						of your win for the prize to be processed and credited.
					</p>
					<p className='textLeft'>
						We want to express our sincere congratulations on your victory! Your
						participation has added an extra layer of excitement to the contest. Keep
						an eye on your account for the upcoming BuyMore Dollars, and thank you for
						being a part of the excitement!
					</p>
					<p className='textLeft'>
						Stay tuned for more opportunities to win and enjoy the perks of being a
						BuyMore Dollars winner!
					</p>
					<Link to='/'>
						<button className='blueButton'>Done </button>
					</Link>
				</>
			) : null}
			{questionAnswered && !isCorrect ? (
				<>
					<h2 className='textLeft'>Prize Award Information:</h2>
					<p className='textLeft'>
						Unfortunately, your answer was incorrect. We appreciate your participation
						and hope you'll try again in the future. Thank you for being a part of the
						excitement!
					</p>

					<Link to='/'>
						<button className='blueButton'>Done </button>
					</Link>
				</>
			) : null}
		</main>
	);
};

export default Win;
