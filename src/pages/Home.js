import { Link } from "react-router-dom";
import "./home.css";
import { useState, useEffect } from "react";
import hero from "../images/slider.png";
import { signOut } from "../firebase-functions";

import taco from "../images/taco.jpg";
import burger from "../images/burger.jpg";
import shoes from "../images/freshKicks.jpg";
import cabbage from "../images/rawCabbage.jpg";

const HomeSponsor = ({ title, image, description, index }) => {
	return (
		<section className='sponsor'>
			<h3>{title}</h3>
			<span className='flexWrapCenter '>
				<img
					src={image}
					alt={title}
					className={`child40 ${index % 2 == 0 ? `flip` : ``}`}
				/>
				<p className='child60'>{description}</p>
			</span>
		</section>
	);
};

function Home() {
	const [isSignedin, setIsSignedin] = useState(false);

	useEffect(() => {
		const user = localStorage.getItem("formData");
		if (user) {
			setIsSignedin(true);
		}
	}, []);
	function handleSignOut() {
		signOut();
		setIsSignedin(false);
	}

	const sponsors = [
		{
			title: "Taco Superstore",
			image: taco,
			description:
				"Indulge in the bold and savory flavors at Taco Superstore using your BuyMore Dollars. From mouthwatering tacos to flavorful burritos, let your taste buds savor the delicious creations available. Simply present your BuyMore Dollars, and enjoy a delectable meal that'll leave you coming back for more.",
		},
		{
			title: "Glorbotronic Burgers",
			image: burger,
			description:
				"Craving a burger experience like no other? Head to Glorbotronic Burgers and use your BuyMore Dollars to savor their innovative and gourmet burger selections. Unleash your appetite and relish the combination of premium ingredients that make each bite a gastronomic delight.",
		},
		{
			title: "Fresh Kicks-o-matic Dispenso Booths",
			image: shoes,
			description:
				"Upgrade your style game at Fresh Kicks-o-matic Dispenso Booths! Your BuyMore Dollars allow you to explore a range of trendy footwear, sneakers, and accessories. Step into the world of fashion and express your unique style with the latest offerings from Fresh Kicks-o-matic.",
		},
		{
			title: "Raw-Cabbage-on-a-stick Hut",
			image: cabbage,
			description:
				"Looking for a unique culinary adventure? Raw-Cabbage-on-a-stick Hut invites you to use your BuyMore Dollars to try their innovative cabbage-inspired dishes. From creative salads to unique cabbage-on-a-stick treats, your taste buds are in for a refreshing journey.",
		},
	];
	return (
		<>
			<main>
				<header>
					<span className=''>
						<img src='./logo.png' alt='BuyMore Dollars' />
						<p>Buy More Dollars</p>
					</span>
					{!isSignedin ? (
						<Link to='/signin'>Sign In</Link>
					) : (
						<button onClick={handleSignOut}>Sign Out</button>
					)}
				</header>
				<section className='hero'>
					<img src={hero} alt='hero' />
					<button className='greenButton'>
						<Link to='/form'>Play Now</Link>
					</button>
				</section>

				<section className='home'>
					<h1>Welcome to BuyMore Dollars</h1>
					<h2>Your Gateway to Exciting Rewards!</h2>
					<div className='lightLine'></div>
					<p>
						At BuyMore Dollars, we believe in turning your virtual wins into
						real-world experiences! Redeem your BuyMore Dollars at our partner stores
						and immerse yourself in a world of delightful offerings.
					</p>
					<p>
						Here's a glimpse of how you can use your BuyMore Dollars at each
						participating store:
					</p>

					{sponsors.map((sponsor, index) => {
						return (
							<HomeSponsor
								key={index}
								index={index}
								title={sponsor.title}
								description={sponsor.description}
								image={sponsor.image}
							/>
						);
					})}

					<p>
						Feel the thrill of turning your virtual wins into memorable experiences at
						these partner stores. Keep playing, keep winning, and let your BuyMore
						Dollars enhance your lifestyle! Stay tuned for more exciting updates and
						opportunities to earn and redeem your BuyMore Dollars.{" "}
					</p>

					<button className='greenButton'>
						<Link to='/form'>Play Now</Link>
					</button>
				</section>
				<footer>
					<p>&copy; 2024 BuyMore Dollars | All rights reserved.</p>
					<Link to='/legal' state={"/"}>
						Terms and Conditions
					</Link>
				</footer>
			</main>
		</>
	);
}

export default Home;
