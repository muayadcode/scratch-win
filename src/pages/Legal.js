import './legal.css';
import { Link, useLocation } from "react-router-dom";

function Legal() {
    const location = useLocation();

    return (
        <main className='cardStyle legal'>
            <h1>Legal Information</h1>
            <section className="innerCard">
                <h2>
                    Usage of Data Collected on the Site:
                </h2>
                <p>
                    BuyMore Dollars Inc. values your privacy and is committed to protecting the information collected
                    during
                    your participation in the Virtual Scratch Off Contest. By engaging with the site, you consent to the
                    collection, processing, and use of your data for contest-related purposes only. Rest assured, your
                    information will be handled with the utmost care and in accordance with applicable data protection
                    laws.
                </p>
                <h2>
                    Minimum Age of Users:
                </h2>
                <p>
                    To participate in the Virtual Scratch Off Contest, users must be at least 16 years old. Users under
                    the
                    age of 16 are strictly prohibited from entering unless accompanied by a guardian's permission.
                    BuyMore
                    Dollars Inc. takes the protection of minors seriously and urges parents or guardians to supervise
                    and
                    approve their children's participation in the contest.
                </p>
                <h2>
                    Chance of Winning and Prize Distribution:
                </h2>
                <p>
                    Winners of the Virtual Scratch Off Contest will be determined through a random draw, ensuring a fair
                    and
                    unbiased selection process. Prize distribution will adhere to the specified tiers: a grand prize,
                    second
                    tier prizes, third tier prizes, and fourth tier prizes, as outlined in the contest details. By
                    participating, contestants acknowledge the unpredictability of winning and understand that the
                    majority
                    of plays may result in a default "Please Play Again."
                </p>
                <h2>
                    Opting Out of Communications:
                </h2>
                <p>
                    BuyMore Dollars Inc. may send communications related to contest updates, promotions, and
                    newsletters.
                    Contestants have the option to opt out of receiving such communications by updating their
                    preferences in
                    their account settings or following the provided opt-out instructions in the communications
                    received.
                    Please note that opting out may affect your receipt of important contest-related information.
                </p>
                <p>
                    By participating in the Virtual Scratch Off Contest, you agree to abide by these conditions. BuyMore
                    Dollars Inc. reserves the right to update these conditions as necessary, and any changes will be
                    reflected on this legal page. We appreciate your understanding and compliance with these terms. If
                    you
                    have any questions or concerns, please contact our support team for assistance.
                </p>
            </section>
            <button className="blueButton"><Link to={location.state}>Close</Link> </button>
        </main>
    )
}

export default Legal;