import { Link } from "react-router-dom";

import lose from "../images/losing.png";
import coupon from "../images/rawCabbageCoupon.png";

function Lose() {
	return (
		<main className='cardStyle yellowCard flexCol gap1'>
			<img src={lose} alt='Losing Card' />
			<p>
				We understand that not every scratch yields a win, but don't let that dampen
				your spirits! We appreciate your participation in the BuyMore Dollars
				Virtual Scratch Off Contest. Remember, every attempt brings you one step
				closer to that elusive grand prize!
			</p>
			<strong>
				As a token of our gratitude, here's a little something to brighten your day:
			</strong>

			<img src={coupon} alt='Raw Cabbage Coupon' />
			{/* <h2 className='textLeft'>Coupon for $2.00 Off.</h2> */}
			<p className='textLeft'>
				Enjoy a special coupon for $2.00 off any purchase over $50 from
				Raw-Cabbage-on-a-stick Hut. Treat yourself to a delicious meal or snack on
				us! Simply present this coupon during your next visit to savor the flavors
				and make your day a little brighter.
			</p>
			<p className='textLeft'>
				Thank you for being a part of the excitement, and we hope your next scratch
				brings you closer to a fabulous win! Stay tuned for more opportunities to
				try your luck and win big with BuyMore Dollars.
			</p>

			<Link to='/'>
				<button className='blueButton'>Done</button>
			</Link>
		</main>
	);
}

export default Lose;
