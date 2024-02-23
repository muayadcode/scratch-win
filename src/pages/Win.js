import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
const Question = () => {
	function handleSubmit(e) {
		e.preventDefault();
		console.log(e.target.elements.question.value);
	}

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<label htmlFor='question'>What is 2 + 2?</label>
				<input id='question' type='text' />
				<button type='submit' className=''>
					Submit
				</button>
			</form>
		</div>
	);
};

const Win = ({ prize }) => {
	return (
		<main className='cardStyle yellowCard'>
			<h1>Congratulations, You're a Winner!</h1>
			<p>You've won {prize} BuyMore Dollars!</p>
			<p>
				Great news! You've <strong>WON</strong> in the BuyMore Dollars Virtual
				Scratch Off Contest. Before you celebrate, we have a fun and straightforward
				skill testing question for you. Answer this simple math question correctly,
				and your BuyMore Dollars will be on their way!
			</p>

			<Question />
			<h2>Prize Award Information:</h2>
			<p>
				If you answered the question correctly, congratulations! Your BuyMore
				Dollars prize will be added to the account associated with your name. Please
				allow between 6 to 8 weeks from the time of your win for the prize to be
				processed and credited.
			</p>
			<p>
				{" "}
				We want to express our sincere congratulations on your victory! Your
				participation has added an extra layer of excitement to the contest. Keep an
				eye on your account for the upcoming BuyMore Dollars, and thank you for
				being a part of the excitement!
			</p>
			<p>
				{" "}
				Stay tuned for more opportunities to win and enjoy the perks of being a
				BuyMore Dollars winner!
			</p>
			<button className='blueButton'>
				<Link to='/'>Done</Link>
			</button>
		</main>
	);
};

export default Win;
