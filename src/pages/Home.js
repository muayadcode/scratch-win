import { Link } from "react-router-dom";


function Home() {
    return (

        <>
            <header>
                <p>Buy More Dollars</p>
            </header>
            <Link to="/form">Form</Link>
            <Link to="/success">Success</Link>
            <Link to="/contest">Contest</Link>
            <Link to="/legal" state={"/"}>Legal</Link>
            <Link to="/win">Win</Link>
            <Link to="/loss">Loss</Link>


            <main>
                <section className="hero">
                    <button className="playNow">Play Now</button>

                </section>

                <section>
                    <h1>Welcome to BuyMore Dollars</h1>
                    <h2>Your Gateway to Exciting Rewards!</h2>
                    <p>At BuyMore Dollars, we believe in turning your virtual wins into real-world experiences! Redeem your BuyMore Dollars at our partner stores and immerse yourself in a world of delightful offerings. Here's a glimpse of how you can use your BuyMore Dollars at each participating store:</p>
                </section>
                {/* <HomeSponsor title="Taco Superstore" description={"Indulge in the bold and savory flavors at Taco Superstore using your BuyMore Dollars. From mouthwatering tacos to flavorful burritos, let your taste buds savor the delicious creations available. Simply present your BuyMore Dollars, and enjoy a delectable meal that'll leave you coming back for more."} />
                <HomeSponsor title={"Glorbotronic Burgers"} description={"Craving a burger experience like no other? Head to Glorbotronic Burgers and use your BuyMore Dollars to savor their innovative and gourmet burger selections. Unleash your appetite and relish the combination of premium ingredients that make each bite a gastronomic delight."} />
                <HomeSponsor title="Fresh Kicks-o-matic Dispenso Booths" description={"Upgrade your style game at Fresh Kicks-o-matic Dispenso Booths! Your BuyMore Dollars allow you to explore a range of trendy footwear, sneakers, and accessories. Step into the world of fashion and express your unique style with the latest offerings from Fresh Kicks-o-matic."} />
                <HomeSponsor title="Raw-Cabbage-on-a-stick Hut" description={"Looking for a unique culinary adventure? Raw-Cabbage-on-a-stick Hut invites you to use your BuyMore Dollars to try their innovative cabbage-inspired dishes. From creative salads to unique cabbage-on-a-stick treats, your taste buds are in for a refreshing journey."} /> */}

                <p>Feel the thrill of turning your virtual wins into memorable experiences at these partner stores. Keep playing, keep winning, and let your BuyMore Dollars enhance your lifestyle! Stay tuned for more exciting updates and opportunities to earn and redeem your BuyMore Dollars. </p>

                <button className="playNow">Play Now</button>
            </main>
        </>
    )
}

function HomeSponsor(title, image, description) {
    return (
        <section className="flex">
            <h3 className="child100">{title}</h3>
            {/* <img src={image} alt={title} className="child30" /> */}
            <p className="child70">{description}</p>
        </section>

    )
}

export default Home;

